import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { userStore } from "../../stores/userStore";

type PagesHeaderProps = {
    title: string;
    icon: LucideIcon;
    children?: ReactNode;
};

export const PagesHeader = ({ title, icon: Icon, children }: PagesHeaderProps) => {
    const { Name } = userStore((state) => state.user.userInfo);
    return (
        <header className="sticky top-0 z-50 flex items-center justify-center border-b-[1.2px] border-borderLine bg-secundary h-default md:justify-between">
            <div className="ml-4 flex items-center gap-2 text-text">
                <Icon className="w-6 h-6 text-primary" />
                <h1 className="text-xl">
                    {title}
                    <b className="text-primary">{" "}{Name}</b>
                </h1>
            </div>
            <div>
                <div className="hidden md:flex">
                    {children}
                </div>
                <div className="flex md:hidden">
                    {/* Mobile layout coming soon */}
                </div>
            </div>
        </header>
    );
};

export default PagesHeader;
