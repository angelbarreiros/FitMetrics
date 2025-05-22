import { TOKEN_NAME } from "../../auth/Auth";
import type { UserInfo, EditAccountResponse } from "../../types/responsesTypes";
import { UserInfoInitialState } from "../initialState";
import type { AppState } from "../userStore";

export interface UserActions {
    login: (token: string, userInfo: UserInfo) => void;
    logout: () => void;
    checkUser: (userInfo: UserInfo) => void;
    setConexion: (hasConexion: boolean) => void;
    editAccount: (editAccount: EditAccountResponse) => void;
}
export function createUserActions(
    set: (fn: (state: AppState) => Partial<AppState>, replace?: false | undefined, actionName?: string) => void
): UserActions {
    return {
        login: (token, userInfo) =>
            set((state) => {
                localStorage.setItem(TOKEN_NAME, token);
                return {
                    user: {
                        ...state.user,
                        isAuthenticated: true,
                        userInfo
                    }
                };
            }, false, 'user/login'),

        logout: () =>
            set((state) => {
                localStorage.removeItem(TOKEN_NAME);
                return {
                    user: {
                        ...state.user,
                        userInfo: UserInfoInitialState,
                        isAuthenticated: false,
                    }
                };
            }, false, 'user/logout'),

        checkUser: (userInfo) =>
            set((state) => ({
                user: {
                    ...state.user,
                    isAuthenticated: true,
                    userInfo,
                }
            }), false, 'user/checkUser'),

        setConexion: (hasConexion) =>
            set((state) => ({
                user: {
                    ...state.user,
                    hasConexion,
                }
            }), false, 'user/setConexion'),

        editAccount: (editAccount) =>
            set((state) => ({
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        Name: editAccount.Name,
                        Email: editAccount.Email,
                    }
                }
            }), false, 'user/editAccount'),
    }
}