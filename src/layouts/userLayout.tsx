import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return <div className="bg-green-700">
        <Outlet />
    </div>;
};
export const ULayout = <UserLayout />
