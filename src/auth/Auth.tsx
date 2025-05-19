import { Outlet, useNavigate } from "react-router-dom"
import { userStore } from "../stores/userStore"
import { useEffect } from "react"


const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME as string
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
export const NAuth = <Outlet />
export const PlainAuth = <PAuth />

// export const RBACAuth = ({ roles }: { roles: string[] }) => {
//     let role = localStorage.getItem("role")
//     if (role && roles.includes(role)) {
//         return <Outlet />
//     }
//     return <Navigate to="/unauthorized" replace />

// }