import Item from "./components/Resources/Item";
import Resource from "./components/Resources/Resource";
import LogoSalas from "./assets/LogoSalas.png";
import LogoNotebooks from "./assets/LogoNotebooks.png";
import LogoKitsHDMI from "./assets/LogoKitsHDMI.png";
import LogoKitsVGA from "./assets/LogoKitsVGA.png";
import Logo from "./assets/Logo.png";

function App() {
  return (
    <>
      <div className="flex flex-col gap-8 items-center justify-start h-screen ">
        {/* Salas */}
        <div className="flex gap-16">
          <Item
            resourceName="Laboratório"
            colorBg="bg-[#9AF3BC]"
            logo={LogoSalas}
          />

          <div className="flex justify-center gap-4 self-center">
            <Resource
              resourceName="207"
              professor="Mangan"
              colorBg="bg-[#9AF3BC]"
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
            <Resource resourceName="210" professor="" colorBg="bg-[#9AF3BC]" />
          </div>
        </div>

        {/* Notebooks */}
        <div className="flex gap-16">
          <Item
            resourceName="Notebooks"
            colorBg="bg-[#59A5F8]"
            logo={LogoNotebooks}
          />

          <div className=" flex justify-center gap-4 self-center">
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
            <Resource resourceName="210" professor="" colorBg="bg-[#59A5F8]" />
          </div>
        </div>

        {/* Kits HDMI */}
        <div className="flex gap-16">
          <Item
            resourceName="Kits HDMI"
            colorBg="bg-[#E9F26E]"
            logo={LogoKitsHDMI}
          />

          <div className="flex justify-center gap-4 self-center">
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
            <Resource resourceName="210" professor="" colorBg="bg-[#E9F26E]" />
          </div>
        </div>

        {/* Kits VGA */}
        <div className="flex gap-16">
          <Item
            resourceName="Kits VGA"
            colorBg="bg-[#F4C16F]"
            logo={LogoKitsVGA}
          />

          <div className="flex justify-center gap-4 self-center">
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
            <Resource resourceName="210" professor="" colorBg="bg-[#F4C16F]" />
          </div>
        </div>

        {/* Kits VGA */}
        <div className="flex gap-16">
          <Item resourceName="Sala de Aula" colorBg="bg-[#F46F95]" logo={Logo} />

          <div className="flex justify-center gap-4 self-center">
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
            <Resource resourceName="210" professor="" colorBg="bg-[#F46F95]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
