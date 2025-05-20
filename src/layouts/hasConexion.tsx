import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
export const HasConexionWrapper = ({ children }: { children: React.ReactNode }) => {
    const hasConexion = userStore(state => state.user.hasConexion);
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasConexion) {
            navigate("/noConexion");
        }
    }, [hasConexion, navigate]);

    return children
};
