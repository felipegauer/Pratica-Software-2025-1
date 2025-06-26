import Item from "../Item";
import Resource from "../Resource";
import LogoKitsHDMI from "../../../assets/LogoKitsHDMI.png";

interface ResourcesProps {
  resources?: {
    resourceName: string;
    professor: string;
    date?: string;
    time?: string;
    reservado: boolean;
  }[];
}

export default function HDMIResources({ resources }: ResourcesProps) {
  return (
    resources &&
    resources.length > 0 && (
      <div className="flex gap-16">
        <Item
          resourceName="Kits HDMI"
          colorBg="bg-[#E9F26E]"
          logo={LogoKitsHDMI}
        />

        <div className="grid gap-5 grid-cols-4 xl:grid-cols-6 self-center">
          {resources && resources.length > 0 ? (
            resources.map((resource) => (
              <Resource
                key={resource.resourceName}
                resourceName={resource.resourceName}
                professor={resource.professor}
                colorBg={resource.reservado ? "bg-[#C00F0C]" : "bg-[#E9F26E]"}
                date={resource.date}
                time={resource.time}
              />
            ))
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    )
  );
}
