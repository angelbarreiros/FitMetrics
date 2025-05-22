import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { userStore } from "../../stores/userStore";

type PagesHeaderProps = {
    title: string;
    icon: LucideIcon;
    accountName?: boolean
    beforeChildren?: ReactNode
    children?: ReactNode;
};

export const PagesHeader = ({ title, icon: Icon, accountName = true, beforeChildren, children }: PagesHeaderProps) => {
    const { Name } = userStore((state) => state.user.userInfo);
    return (
        <header className="sticky top-0 z-50 flex items-center justify-center border-b-[1.2px] border-borderLine bg-secundary h-default md:justify-between">
            <div className="ml-4 flex items-center gap-2 text-text">
                {beforeChildren}
                <Icon className="w-6 h-6 text-primary" />
                <h1 className="text-xl">
                    {title}
                    {accountName && < b className="text-primary">{" "}{Name}</b>}
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
