import { Outlet, useNavigate } from "react-router-dom"
import { userStore } from "../stores/userStore"
import { useEffect } from "react"



const PlainAuth = () => {
    const isAuthenticated = userStore(state => state.user.isAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    if (!isAuthenticated) {
        return null
    }
    return <Outlet />
}
export const NAuth = <Outlet />
export const PAuth = <PlainAuth />

// export const RBACAuth = ({ roles }: { roles: string[] }) => {
//     let role = localStorage.getItem("role")
//     if (role && roles.includes(role)) {
//         return <Outlet />
//     }
//     return <Navigate to="/unauthorized" replace />

// }