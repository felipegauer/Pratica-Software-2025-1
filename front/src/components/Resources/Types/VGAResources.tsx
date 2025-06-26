import Item from "../Item";
import Resource from "../Resource";
import LogoKitsVGA from "../../../assets/LogoKitsVGA.png";

interface ResourcesProps {
  resources?: {
    resourceName: string;
    professor?: string;
    date?: string;
    time?: string;
    reservado: boolean;
  }[];
}

export default function VGAResources({ resources }: ResourcesProps) {
  return (
    resources &&
    resources.length > 0 && (
      <div className="flex gap-16">
        <Item
          resourceName="Kits VGA"
          colorBg="bg-[#F4C16F]"
          logo={LogoKitsVGA}
        />

        <div className="grid gap-5 grid-cols-4 xl:grid-cols-6 self-center">
          {resources.map((resource) => (
            <Resource
              key={resource.resourceName}
              resourceName={resource.resourceName}
              professor={resource.professor}
              colorBg={resource.reservado ? "bg-[#C00F0C]" : "bg-[#F4C16F]"}
              date={resource.date}
              time={resource.time}
            />
          ))}
        </div>
      </div>
    )
  );
}
