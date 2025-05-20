import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { HOME_ROUTE } from "../router/routerTypes"
import { userStore } from "../stores/userStore"


export const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME as string
const PAuth = () => {
    const hasToken = localStorage.getItem(TOKEN_NAME)
    const isAuthenticated = userStore(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])
    if (!hasToken) {
        return null
    }
    if (!isAuthenticated) {
        return null
    }
    return <Outlet />
}

const UnProtectedRoutes = () => {
    const isAuthenticated = userStore(state => state.user.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(HOME_ROUTE);
        }
    }, [isAuthenticated, navigate]);

    return !isAuthenticated ? <Outlet /> : null;
};

export const NAuth = <UnProtectedRoutes />
export const PlainAuth = <PAuth />

// export const RBACAuth = ({ roles }: { roles: string[] }) => {
//     let role = localStorage.getItem("role")
//     if (role && roles.includes(role)) {
//         return <Outlet />
//     }
//     return <Navigate to="/unauthorized" replace />

// }