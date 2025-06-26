import Item from "./Item";
import LogoSalas from "../../assets/LogoSalas.png";

export default function GridResource() {
  return (
    <div className="flex gap-16">
      <Item
        resourceName="Laboratório"
        colorBg="bg-[#9AF3BC]"
        logo={LogoSalas}
      />

      <div className="grid gap-5 grid-cols-4 xl:grid-cols-5 self-center"></div>
    </div>
  );
}
