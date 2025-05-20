import { Loader2 } from "lucide-react";

export const FullScreenLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="animate-spin w-10 h-10 text-secundary" />
        </div>
    );
}