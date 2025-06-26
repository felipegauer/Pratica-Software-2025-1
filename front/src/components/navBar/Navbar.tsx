import { useEffect, useRef, useState } from "react";
// import Modal from "../modal/Modal";
import { FaceDetection } from "../OpenCV/FaceDetector";

function Navbar() {
  const [open, setOpen] = useState(true);
  const loopDestroyerRef = useRef<boolean>(false);

  useEffect(() => {
    if (!open && !loopDestroyerRef.current) {
      loopDestroyerRef.current = true; // Prevent further state changes
      const timer = setTimeout(() => {
        setOpen(true);
      }, 15000); // Reopen the modal after 15 second

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    } else if (open) {
      loopDestroyerRef.current = false; // Reset the flag when modal is open
    }
  }, [open]);

  return (
    <div className="flex justify-center items-center gap-20 mb-8 mt-4 text-gray-500">
      <div className="flex flex-row gap-1 items-center">
        <label className="text-lg font-semibold">Aula:</label>
        <input
          type="text"
          placeholder="Digite a aula"
          className="rounded-sm border-2 border-gray-500 bg-white p-1"
        />
      </div>

      <div className="flex flex-row gap-1 items-center">
        <label className="text-lg font-semibold">Recurso:</label>
        <input
          type="text"
          placeholder="Digite o recurso"
          className="rounded-sm border-2 border-gray-500 bg-white p-1"
        />
      </div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-[#007AFF] text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-[#005BB5] transition-colors duration-150"
      >
        Toggle FaceScan
      </button>

      <div className="absolute top-2 rounded-xl text-white flex justify-center items-center bg-black right-2 w-70 h-38 ">
        {open ? (
          <FaceDetection />
        ) : (
          <div className="bg-black w-70 flex items-center justify-center rounded-xl h-38 p-2">
            Face Scan Closed
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
