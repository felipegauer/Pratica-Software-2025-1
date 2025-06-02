import { useState } from "react";
import Modal from "../modal/Modal";

function Navbar() {
  const [open, setOpen] = useState(false);
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
      onClick={() => setOpen(prev=> !prev)}
       className="bg-[#007AFF] text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-[#005BB5] transition-colors duration-150">
        Face Scan
      </button>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
}
export default Navbar;
