import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";


type PagesHeaderProps = {
    title: string;
    icon: LucideIcon;
    children?: ReactNode;
};

export const PagesHeader = ({ title, icon: Icon, children }: PagesHeaderProps) => {
    return (
        <header className="flex items-center justify-between bg-secundary h-default md:border-l-1 md:border-white">
            <div className="ml-4 flex items-center gap-2 text-text">
                <Icon className="w-6 h-6" />
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            <div>
                <div className="hidden md:flex">
                    {children}
                </div>
                <div>
                    <div className="flex md:hidden">
                        {/* Revisas como hacer con la forma de movil */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PagesHeader;