import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NavBarButton } from "../../components/shared/NavBarButton";
import { userStore } from "../../stores/userStore";
import { getFooterNavItems } from "./footerIcons";
import { getNavItems } from "./sideIcons";

export const PcAppLayoutComponent = () => {
    const logout = userStore((state) => state.userActions.logout);
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [_, setIsMoreMenuOpen] = useState(false);
    const hasNotifications = true;

    const markAsRead = async () => {
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleLogout = () => {
        setIsMoreMenuOpen(false);
        logout();

    };

    return (
        <main className="flex overflow-hidden">
            <aside
                className={`hidden md:flex flex-col bg-secundary border-r border-borderLine  transition-all duration-300 ease-in-out overflow-hidden ${isSidebarOpen ? "w-open" : "w-20"
                    }`}
                style={{ height: "100vh" }}
            >
                <div
                    className={` h-default border-b border-borderLine text-text flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
                    {isSidebarOpen && (
                        <Link
                            to="/facilities"
                            className=" mx-4 text-2xl font-bold w-full hover:text-text/90 transition-colors truncate flex items-center max-w-[160px] min-w-0"
                            style={{ overflow: "hidden" }}
                        >
                            <h1>FitMetrics</h1>
                            <img
                                src="logo.png"
                                alt="fitmetrics"
                                className=" max-h-default max-w-full object-contain block"

                            />
                        </Link>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="mx-1 text-white focus:outline-none p-2 rounded-default hover:bg-primary transition-colors flex-shrink-0 cursor-pointer"
                        aria-label={isSidebarOpen ? "Contraer barra lateral" : "Expandir barra lateral"}
                    >
                        {isSidebarOpen ? (
                            <ChevronLeft className="w-6 h-6 text-text" />
                        ) : (
                            <ChevronRight className="w-6 h-6 text-text" />
                        )}
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
                    {getNavItems({ hasNotifications, markAsRead }).map((item) => (
                        <NavBarButton
                            key={item.path}
                            to={item.path}
                            Icon={item.icon}
                            label={item.label}
                            isActive={location.pathname === item.path}
                            onClick={item.onClick}
                            isSidebarOpen={isSidebarOpen}
                            rbac={item.rbac}
                        />
                    ))}
                </nav>
                <div className="border-t border-borderLine" />
                <div className="px-3 py-4 space-y-2">
                    {getFooterNavItems({ logout: handleLogout }).map((item) => (
                        <NavBarButton
                            key={item.path}
                            to={item.path}
                            Icon={item.icon}
                            label={item.label}
                            isActive={location.pathname === item.path}
                            onClick={item.onClick}
                            isSidebarOpen={isSidebarOpen}
                            rbac={item.rbac}
                        />
                    ))}
                </div>
            </aside>
            <div className="flex-1 overflow-auto h-screen bg-third">
                <Outlet />
            </div>
        </main>
    );
};

export default PcAppLayoutComponent;
export const AppLayout = <PcAppLayoutComponent />;
