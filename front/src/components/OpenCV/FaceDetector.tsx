import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import * as faceapi from "face-api.js";
import { getAssetPath } from "../../core/assets";
import {
  CameraFacing,
  HIGH_RES_VIDEO_CONSTRAINTS,
} from "../../core/camera/consts";
import {
  AUTO_CAPTURE_DELAY,
  CAPTURE_CONFIRMATION_DELAY,
  CaptureStatus,
  FACE_DETECTION_INTERVAL,
  MANUAL_CAPTURE_GLOBAL_TIMEOUT,
  MANUAL_CAPTURE_TIMEOUT,
} from "../../core/consts";
import { fetchAsset } from "../../core/fetcher";
import { logError, logInfo } from "../../core/logger";
import { FaceDetectionStatus } from "../../core/opencv/detector/types";
import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";
import { OutputCanvas, OutputVideo } from "../Output";
import axios from "axios";

// import "./styles.css";

export function FaceDetection() {
  const [selfieCaptured, setSelfieCaptured] = useState<boolean>(false);
  const [showManualCapture, setShowManualCapture] = useState<boolean>(false);
  const [firstFaceDetection, setFirstFaceDetection] = useState<boolean>(false);
  const [status, setStatus] = useState(CaptureStatus.Idle);
  const [toDetect, setToDetect] = useState<ImageData>();
  const [faceVector, setFaceVector] = useState<Float32Array>();

  type Professor = { nome: string; [key: string]: any };
  const [professor, setProfessor] = useState<Professor | null>(null);

  const videoRef = useRef<HTMLVideoElement>(
    null
  ) as React.RefObject<HTMLVideoElement>;
  const debugOverlayRef = useRef<HTMLCanvasElement>(
    null
  ) as React.RefObject<HTMLCanvasElement>;
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  const loopDestroyerRef = useRef<boolean>(false);

  const { camera, pauseMediaStream, resumeMediaStream, getScreenshot } =
    useCamera({
      videoRef,
      facing: CameraFacing.FrontCamera,
      videoConstraints: HIGH_RES_VIDEO_CONSTRAINTS,
      onError: () => logError({ message: "useCamera error" }),
    });

  const readyToShoot = camera?.stream?.active;

  const { init, initialized, initializing, detectFaces, validateFaces } =
    useFaceDetection({
      logInfo,
      logError,
      getAssetPath,
      fetchAsset,
    });

  const captureSelfie = useCallback(
    (data: ImageData, canvas: HTMLCanvasElement) => {
      if (data && data.width && data.height && canvas) {
        canvas.width = data.width;
        canvas.height = data.height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          setToDetect(data);
          ctx.putImageData(data, 0, 0);
        }

        setSelfieCaptured(true);
      }
    },
    []
  );

  const proceedToConfirmation = useCallback(() => {
    setStatus(CaptureStatus.Confirmation);
    pauseMediaStream();
  }, [pauseMediaStream]);

  const handleManualCapture = useCallback(() => {
    loopDestroyerRef.current = true;

    const data = getScreenshot();

    if (!data || !outputCanvasRef.current) return;

    captureSelfie(data, outputCanvasRef.current);
    proceedToConfirmation();
  }, [captureSelfie, getScreenshot, proceedToConfirmation]);

  const handleReset = useCallback(() => {
    setProfessor(null);
    setFaceVector(undefined);
    loopDestroyerRef.current = false;

    setSelfieCaptured(false);
    setShowManualCapture(true);
    setStatus(CaptureStatus.Idle);

    resumeMediaStream();
  }, [resumeMediaStream]);

  const showManualCaptureBtn = useMemo(
    () => readyToShoot && showManualCapture && !selfieCaptured,
    [readyToShoot, selfieCaptured, showManualCapture]
  );

  const showConfirmation = useMemo(
    () =>
      readyToShoot && selfieCaptured && status === CaptureStatus.Confirmation,
    [readyToShoot, selfieCaptured, status]
  );

  const processScreenshot = useCallback(
    (data: ImageData): FaceDetectionStatus => {
      const ctx = debugOverlayRef.current?.getContext("2d");

      const faces = detectFaces(data, ctx);
      const validationResult = validateFaces(faces);
      console.log("Face detection result:", validationResult);

      return validationResult;
    },
    [detectFaces, validateFaces]
  );

  useEffect(() => {
    const loadModels = async () => {
      console.log("Loading Face API models...");
      try {
        const MODEL_URL = "/models";
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL); // ou TinyFaceDetector se preferir
        console.log("Face API models loaded successfully");
      } catch (error) {
        console.log("Error loading Face API models:", error);
      }
    };
    loadModels();
  }, []);

  // initialize face detector
  useEffect(() => {
    if (camera?.stream && !initializing && !initialized) {
      init()
        .then(() => {
          console.info("Face detector initialized");
        })
        .catch((e) => {
          console.error("Face detector initialization failed", e);
        });
    }
  }, [init, initialized, initializing, camera]);

  // run face detection loop
  useEffect(() => {
    if (
      !initialized ||
      !readyToShoot ||
      selfieCaptured ||
      status === CaptureStatus.Ready ||
      status === CaptureStatus.Done ||
      status === CaptureStatus.Confirmation
    )
      return;

    let timeout: ReturnType<typeof setTimeout>;
    let result!: FaceDetectionStatus;

    const processVideo = () => {
      // it is a way to exit from the loop
      // when manual capture destroys effect and clears timeout but function has already started
      if (!!loopDestroyerRef.current) return;

      const begin = performance.now();

      const data = getScreenshot();
      if (data) {
        result = processScreenshot(data);
      }

      if (result !== FaceDetectionStatus.FaceNotFound && !firstFaceDetection) {
        setFirstFaceDetection(true);
      }

      let nextStatus: CaptureStatus;

      if (result === FaceDetectionStatus.Success) {
        nextStatus = CaptureStatus.Ready;
      } else if (result === FaceDetectionStatus.FaceNotFound) {
        nextStatus = CaptureStatus.FaceNotFound;
      } else {
        nextStatus = CaptureStatus.Pending;
      }

      setStatus(nextStatus);

      if (result !== FaceDetectionStatus.Success) {
        const delay = FACE_DETECTION_INTERVAL - (performance.now() - begin);
        timeout = setTimeout(processVideo, delay);
      }
    };

    if (result !== FaceDetectionStatus.Success) {
      processVideo();
    }

    return () => clearTimeout(timeout);
  }, [
    processScreenshot,
    getScreenshot,
    initialized,
    readyToShoot,
    selfieCaptured,
    status,
    firstFaceDetection,
  ]);

  // set delay for the final capture
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (status === CaptureStatus.Ready) {
      timeout = setTimeout(() => {
        const data = getScreenshot();

        if (!data || !outputCanvasRef.current) return CaptureStatus.Pending;

        const result = processScreenshot(data);

        if (result === FaceDetectionStatus.Success) {
          captureSelfie(data, outputCanvasRef.current);
          setStatus(CaptureStatus.Done);
        } else {
          setStatus(
            result === FaceDetectionStatus.FaceNotFound
              ? CaptureStatus.FaceNotFound
              : CaptureStatus.Pending
          );
        }
      }, AUTO_CAPTURE_DELAY);
    }

    return () => clearTimeout(timeout);
  }, [captureSelfie, processScreenshot, getScreenshot, status]);

  // set delay for confirmation screen
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (status === CaptureStatus.Done) {
      timeout = setTimeout(proceedToConfirmation, CAPTURE_CONFIRMATION_DELAY);
    }

    return () => clearTimeout(timeout);
  }, [proceedToConfirmation, status]);

  // show button for manual capture after global timeout
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (readyToShoot) {
      timeout = setTimeout(
        () => setShowManualCapture(true),
        MANUAL_CAPTURE_GLOBAL_TIMEOUT
      );
    }

    return () => clearTimeout(timeout);
  }, [readyToShoot]);

  // show button for manual capture after timeout after the first face detection
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (firstFaceDetection) {
      timeout = setTimeout(
        () => setShowManualCapture(true),
        MANUAL_CAPTURE_TIMEOUT
      );
    }

    return () => clearTimeout(timeout);
  }, [firstFaceDetection]);

  useEffect(() => {
    const runFaceApiDetection = async () => {
      if (!selfieCaptured || !toDetect) return;

      const canvas = document.createElement("canvas");
      canvas.width = toDetect.width;
      canvas.height = toDetect.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.putImageData(toDetect, 0, 0);

      const detection = await faceapi
        .detectSingleFace(canvas)
        .withFaceLandmarks(true)
        .withFaceDescriptor();

      if (!detection) {
        console.warn("No face detected.");
        return;
      }

      const descriptor = detection.descriptor; // Float32Array(128)
      setFaceVector(descriptor);
    };

    runFaceApiDetection();
  }, [selfieCaptured, toDetect]);

  useEffect(() => {
    if (!faceVector) return;
    axios
      .post("/api/professor/find-match", {
        faceVector: Array.from(faceVector || []), // Convert Float32Array to regular array
      })
      .then((response) => {
        setProfessor(response.data);
      })
      .catch((error) => {
        console.error("Error finding face match:", error);
      });
  }, [faceVector]);

  return (
    <div className="flex flex-col items-center relative justify-center gap-2">
      {professor && (
        <div className="text-2xl absolute top-2 z-10 bg-white rounded px-2 py-1 font-bold text-black">
          <h1>{professor.name}</h1>
        </div>
      )}

      <div className="video-box">
        <OutputVideo videoRef={videoRef} debugOverlayRef={debugOverlayRef} />
        <OutputCanvas ref={outputCanvasRef} hidden={!showConfirmation} />
      </div>

      {showManualCaptureBtn && (
        <button disabled={initializing} onClick={handleManualCapture}>
          Take selfie
        </button>
      )}

      {showConfirmation && (
        <div>
          <button
            className="bg-red-500 text-lg px-4 py-1 rounded-sm cursor-pointer"
            onClick={handleReset}
          >
            Retake
          </button>
        </div>
      )}
    </div>
  );
}
