import { useEffect, useState, type ReactNode } from "react";
import type { UserInfo } from "../types/responsesTypes";
import { fetchData } from "../util/fetch";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { HOME_ROUTE } from "../router/routerTypes";
import { Loader2 } from "lucide-react";

const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME as string;

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const checkUser = userStore(state => state.checkUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            await onMount(navigate, checkUser);
            setLoading(false);
        };
        run();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin w-10 h-10 text-secundary" />
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthWrapper;

const onMount = async (
    navigate: NavigateFunction,
    checkUser: (user: UserInfo) => void
) => {
    const checkedUser = await fetchData<UserInfo>({
        apiName: "login",
        method: "GET",
        url: "/api/v1/check",
        auth: { tokenName: TOKEN_NAME }
    });
    if (checkedUser.status == 200) {
        checkUser(checkedUser.data);
        navigate(HOME_ROUTE);
    } else {
        localStorage.removeItem(TOKEN_NAME);
        navigate("/login");
    }
};