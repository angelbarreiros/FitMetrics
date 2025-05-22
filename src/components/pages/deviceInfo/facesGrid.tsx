import { memo } from "react";
import { Link } from "react-router-dom";

type FacesGridProps = {
    deviceId: string;
    Name: string;
    UuidName: string;
    R1Id?: number;
    R2Id?: number;
    R3Id?: number;
    R4Id?: number;
};

const facesGrid = ({ deviceId, R1Id, R2Id, R3Id, R4Id, }: FacesGridProps) => {
    const faces = [
        {
            id: R1Id || "unique-id-1",
            emotion: "Really Sad",
            img: "/1.png",
        },
        {
            id: R2Id || "unique-id-2",
            emotion: "Sad",
            img: "/2.png",
        },
        {
            id: R3Id || "unique-id-3",
            emotion: "Happy",
            img: "/3.png",
        },
        {
            id: R4Id || "unique-id-4",
            emotion: "Really Happy",
            img: "/4.png",
        },
    ];

    return (




        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3 p-6 bg-secundary/50">
            {faces.map((face) => (
                <Link
                    key={face.id}
                    to={`/devices/deviceInfo/${deviceId}/questions/${face.id}`}
                    className="relative flex items-center justify-center bg-white border border-gray-300 hover:shadow-md rounded-default transition-all w-full h-full"
                >
                    <img
                        title={face.emotion}
                        src={face.img}
                        className="w-3/4 h-3/4 max-w-[300px] max-h-[300px] object-contain"
                        alt={face.emotion}
                    />
                    <div className="absolute bottom-4 bg-black text-white text-xs px-2 py-1 rounded-default opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-10">
                        {face.emotion}
                    </div>
                </Link>
            ))}
        </div>


    );
};

export default memo(facesGrid);
