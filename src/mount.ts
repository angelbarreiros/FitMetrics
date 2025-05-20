import { TOKEN_NAME } from "./auth/Auth";
import type { UserInfo } from "./types/responsesTypes";
import { fetchData } from "./util/fetch";

export const onMount = async (checkUser: (user: UserInfo) => void, logout: () => void) => {
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
            onServerError: () => { logout(); },
            onUnexpectedError: () => { logout(); },
            onUserError: () => { logout(); }
        }
    );

};