import Navbar from "./components/navBar/Navbar";
import { useProfessor } from "./context/ProfessorContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import NotebookResources from "./components/Resources/Types/NotebookResources";
import HDMIResources from "./components/Resources/Types/HDMIResource";
import VGAResources from "./components/Resources/Types/VGAResources";
import ResourceInterface from "./interfaces/ResourceInterface";
import LabResources from "./components/Resources/Types/LabResource";

function App() {
  const { professorId } = useProfessor();
  const [currentProfessor, setCurrentProfessor] = useState<string>(professorId);
  const [resources, setResources] = useState<ResourceInterface>();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (professorId !== currentProfessor) {
      setCurrentProfessor(professorId);
    }
  }, [professorId]);

  useEffect(() => {
    if (!currentProfessor || currentProfessor === "") return;

    axios
      .get(`/api/professor/recursos?id=${currentProfessor}`)
      .then((response) => {
        if (response.data) {
          setResources({
            reservas: response.data.reservas,
            professor: response.data.nome,
          });
        } else {
          console.error("Nenhum recurso encontrado para o professor.");
        }
      })
      .catch((error) => {
        console.log("Erro ao buscar recursos do professor:", error);
      });
  }, [currentProfessor]);

  useEffect(() => {
    if (professorId === "") return;
    if (professorId === currentProfessor) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setCurrentProfessor("");
      }, 15000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [professorId, currentProfessor]);

  useEffect(() => {
    console.log(resources);
  }, [resources]);

  return (
    <div className="">
      <div className="lg:container mx-auto p-4">
        <Navbar />

        <div className="flex flex-col gap-8 items-start justify-start ">
          {/* Salas */}
          <LabResources
            resources={resources?.reservas
              .filter((res) => res.recursoType === "LABORATORIO")
              .map((res) => ({
                resourceName: res.recursoId.toString(),
                professor: resources.professor,
                reservado: res.reservado,
              }))}
          />
          {/* Notebooks */}
          <NotebookResources
            resources={resources?.reservas
              .filter((res) => res.recursoType === "NOTEBOOK")
              .map((res) => ({
                resourceName: res.recursoId.toString(),
                professor: resources.professor,
                reservado: res.reservado,
              }))}
          />
          {/* Kits HDMI */}
          <HDMIResources
            resources={resources?.reservas
              .filter((res) => res.recursoType === "HDMI")
              .map((res) => ({
                resourceName: res.recursoId.toString(),
                professor: resources.professor,
                reservado: res.reservado,
              }))}
          />
          {/* Kits VGA */}
          <VGAResources
            resources={resources?.reservas
              .filter((res) => res.recursoType === "VGA")
              .map((res) => ({
                resourceName: res.recursoId.toString(),
                professor: resources.professor,
                reservado: res.reservado,
              }))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
