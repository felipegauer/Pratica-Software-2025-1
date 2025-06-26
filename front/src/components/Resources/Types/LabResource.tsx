import Item from "../Item";
import Resource from "../Resource";
import LogoSalas from "../../../assets/LogoSalas.png";

interface ResourcesProps {
  resources?: {
    resourceName: string;
    professor?: string;
    date?: string;
    time?: string;
    reservado: boolean;
  }[];
}

export default function LabResources({ resources }: ResourcesProps) {
  return (
    resources &&
    resources.length > 0 && (
      <div className="flex gap-16">
        <Item
          resourceName="Laboratório"
          colorBg="bg-[#9AF3BC]"
          logo={LogoSalas}
        />

        <div className="grid gap-5 grid-cols-4 xl:grid-cols-6 self-center">
          {resources.map((resource) => (
            <Resource
              key={resource.resourceName}
              resourceName={resource.resourceName}
              professor={resource.professor}
              colorBg={resource.reservado ? "bg-[#C00F0C]" : "bg-[#9AF3BC]"}
              date={resource.date}
              time={resource.time}
            />
          ))}
        </div>
      </div>
    )
  );
}
