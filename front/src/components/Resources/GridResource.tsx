import Item from "./Item";
import Resource from "./Resource";
import LogoSalas from "../../assets/LogoSalas.png";

export default function GridResource() {
  return (
    <div className="flex gap-16">
      <Item
        resourceName="Laboratório"
        colorBg="bg-[#9AF3BC]"
        logo={LogoSalas}
      />

      <div className="grid gap-5 grid-cols-4 xl:grid-cols-5 self-center">
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
        <Resource
          resourceName="209"
          professor="Wesley"
          colorBg="bg-[#C00F0C]"
          date="10/10"
          time="10:19"
        />
        <Resource resourceName="210" professor="" colorBg="bg-[#9AF3BC]" />
        <Resource
          resourceName="209"
          professor="Wesley"
          colorBg="bg-[#C00F0C]"
          date="10/10"
          time="10:19"
        />
        <Resource resourceName="210" professor="" colorBg="bg-[#9AF3BC]" />
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
  );
}
