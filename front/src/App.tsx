import Item from "./components/Resources/Item";
import Resource from "./components/Resources/Resource";

import LogoNotebooks from "./assets/LogoNotebooks.png";
import LogoKitsHDMI from "./assets/LogoKitsHDMI.png";
import LogoKitsVGA from "./assets/LogoKitsVGA.png";
import Logo from "./assets/Logo.png";
import Navbar from "./components/navBar/Navbar";
import GridResource from "./components/Resources/GridResource";
import { useProfessor } from "./context/ProfessorContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const { professorId } = useProfessor();
  const [currentProfessor, setCurrentProfessor] = useState<string>(professorId);
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
          console.log("Recursos do professor:", response.data);
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

  return (
    <div className="">
      <div className="lg:container mx-auto p-4">
        <Navbar />

        <div className="flex flex-col gap-8 items-start justify-start ">
          {/* Salas */}
          <GridResource />
          {/* Notebooks */}
          <div className="flex gap-16">
            <Item
              resourceName="Notebooks"
              colorBg="bg-[#59A5F8]"
              logo={LogoNotebooks}
            />

            <div className="grid gap-5 grid-cols-4 xl:grid-cols-6 self-center">
              <Resource
                resourceName="207"
                professor="Mangan"
                colorBg="bg-[#59A5F8]"
              />
              <Resource
                resourceName="208"
                professor="Mangan"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
              <Resource
                resourceName="209"
                professor="Wesley"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
              <Resource
                resourceName="210"
                professor=""
                colorBg="bg-[#59A5F8]"
              />
              <Resource
                resourceName="211"
                professor="Mangan"
                colorBg="bg-[#59A5F8]"
              />
              <Resource
                resourceName="212"
                professor="Mangan"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
            </div>
          </div>

          {/* Kits HDMI */}
          <div className="flex gap-16">
            <Item
              resourceName="Kits HDMI"
              colorBg="bg-[#E9F26E]"
              logo={LogoKitsHDMI}
            />

            <div className="grid gap-5 grid-cols-4 xl:grid-cols-6 self-center">
              <Resource
                resourceName="207"
                professor="Mangan"
                colorBg="bg-[#E9F26E]"
              />
              <Resource
                resourceName="208"
                professor="Mangan"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
              <Resource
                resourceName="209"
                professor="Wesley"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
              <Resource
                resourceName="210"
                professor=""
                colorBg="bg-[#E9F26E]"
              />
            </div>
          </div>

          {/* Kits VGA */}
          <div className="flex gap-16">
            <Item
              resourceName="Kits VGA"
              colorBg="bg-[#F4C16F]"
              logo={LogoKitsVGA}
            />

            <div className="grid gap-5 grid-cols-4 xl:grid-cols-6 self-center">
              <Resource
                resourceName="207"
                professor="Mangan"
                colorBg="bg-[#F4C16F]"
              />
              <Resource
                resourceName="208"
                professor="Mangan"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
              <Resource
                resourceName="209"
                professor="Wesley"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
              <Resource
                resourceName="210"
                professor=""
                colorBg="bg-[#F4C16F]"
              />
            </div>
          </div>

          {/* Kits VGA */}
          <div className="flex gap-16">
            <Item
              resourceName="Sala de Aula"
              colorBg="bg-[#F46F95]"
              logo={Logo}
            />

            <div className="grid gap-5 grid-cols-4 xl:grid-cols-6 self-center">
              <Resource
                resourceName="207"
                professor="Mangan"
                colorBg="bg-[#F46F95]"
              />
              <Resource
                resourceName="208"
                professor="Mangan"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
              <Resource
                resourceName="209"
                professor="Wesley"
                colorBg="bg-[#C00F0C]"
                date="10/10"
                time="10:19"
              />
              <Resource
                resourceName="210"
                professor=""
                colorBg="bg-[#F46F95]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
