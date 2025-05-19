import CustomLink from "./CustomLink";

type NavItemProps = {
    to: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    isActive?: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    isSidebarOpen: boolean;
    rbac?: string[];
};
export const NavBarButton = ({ to, Icon, label, isActive, onClick, isSidebarOpen }: NavItemProps) => {
    return (
        <CustomLink
            to={to}
            onClick={onClick}
            RBAC={[]}
            isDisabled={false}



            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-default transition-all duration-200 ${isActive
                ? "bg-primary text-text"
                : "text-text hover:bg-primary/50 "
                }`}

            title={!isSidebarOpen ? label : undefined}>

            <div className="flex items-center">
                <div className={`flex items-center justify-center w-7 h-7 flex-shrink-0 ${isSidebarOpen ? "mr-3" : ""}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {isSidebarOpen && (
                    <span className="truncate transition-opacity duration-300">
                        {label}
                    </span>
                )}
            </div>
        </CustomLink>
    );
};

export default NavBarButton;