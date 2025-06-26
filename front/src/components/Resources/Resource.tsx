interface ResourceProps {
  resourceName: string;
  professor?: string;
  date?: string;
  time?: string;
  colorBg?: string;
}

function Resource(resource: ResourceProps) {
  return (
    <div
      className={`hover:scale-105 cursor-pointer  h-30 w-44 transition-all delay-150 ease-in-out flex flex-col items-center justify-center rounded-lg shadow-md text-black ${
        resource.colorBg ? resource.colorBg : "bg-gray-100 "
      }`}
    >
      <div className="p-4">
        <h1 className="text-center font-bold text-lg mb-2">
          {resource.resourceName}
        </h1>
        <div className="flex flex-col items-center">
          <div className="text-base font-semibold">
            {resource.professor ? resource.professor : "Recurso Livre"}
          </div>
          <div className="flex flex-rol justify-around w-full gap-2">
            {resource.date && resource.time ? (
              <>
                <div className="text-base">{resource.date}</div>
                <div className="text-base">{resource.time}</div>
              </>
            ) : (
              <div className="text-lg">A retirar</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resource;
