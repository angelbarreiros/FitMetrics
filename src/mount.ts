import { TOKEN_NAME } from "./auth/Auth";
import type { UserInfo } from "./types/responsesTypes";
import { fetchData } from "./util/fetch";

export type OnMountParams = {
    checkUser: (user: UserInfo) => void;
    logout: () => void;
    setConexion: (c: boolean) => void;
};

export const onMount = async ({ checkUser, logout, setConexion }: OnMountParams) => {
    await fetchData<UserInfo>(
        {
            apiName: "login",
            method: "GET",
            url: "/api/v1/check",
            auth: { tokenName: TOKEN_NAME }
        },
        {
            onSuccess: (response) => { checkUser(response); },
            onForbiddenError: () => { logout(); },
            onNotFoundError: () => { logout(); },
            onServerError: () => { setConexion(false) },
            onUnexpectedError: () => { logout(); },
            onUserError: () => { logout(); }
        }
    );
};