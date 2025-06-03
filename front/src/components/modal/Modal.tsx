"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import FaceID from "../../assets/Face ID.svg";
import { useState } from "react";
import Webcam from "react-webcam";
import { FaceDetection } from "../OpenCV/FaceDetector";

export default function Modal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [webCam, setWebCam] = useState(false);
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            {!webCam ? (
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
                    <img src={FaceID} alt="" />
                  </div>
                  <div className="text-left sm:ml-4">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >
                      Scanear Face
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-base text-gray-500">
                        Para continuar, escaneie seu rosto. Essa é uma maneira
                        mais rápida, segura e simples de retirar seus recursos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <FaceDetection/>
            )}

            <div className="px-6 py-3 flex flex-row gap-2 justify-center">
              {!webCam ? (
                <button
                  type="button"
                  onClick={() => setWebCam((prev) => !prev)}
                  className="inline-flex w-full justify-center rounded-md bg-[#007AFF] cursor-pointer px-3 py-2 text-base font-semibold text-white shadow-xs hover:bg-[#005BB5] sm:ml-3 sm:w-auto"
                >
                  Ligar Camera
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setWebCam((prev) => !prev)}
                  className="inline-flex w-full justify-center rounded-md bg-red-500 cursor-pointer px-3 py-2 text-base font-semibold text-white shadow-xs hover:bg-red-700 sm:ml-3 sm:w-auto"
                >
                  Desligar Camera
                </button>
              )}
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-base cursor-pointer font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 w-auto"
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
