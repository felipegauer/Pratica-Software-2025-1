interface ItemProps {
    resourceName: string;
    colorBg?: string;
    logo?: string;
}

function Item(item: ItemProps) {
    return (
        <div className={`flex flex-col items-center h-36 w-46 justify-center rounded-lg shadow-md text-black ${item.colorBg? item.colorBg : 'bg-gray-100 '}`}>
        <div className="gap-2 flex flex-col items-center justify-center">
            <h1 className="text-center font-bold text-xl mb-1">
            {item.resourceName}
            </h1>
            <img src={item.logo} alt="Logo das Salas" title="Logo das Salas" />
        </div>
        </div>
    );
}


export default Item;