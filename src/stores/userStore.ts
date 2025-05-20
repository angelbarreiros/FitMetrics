
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import type { UserInfo } from '../types/responsesTypes';
import { TOKEN_NAME } from '../auth/Auth';

export type UserProps = {
    isAuthenticated: boolean;
    userInfo: UserInfo | null;
}
export interface UserState {
    user: UserProps;
    login: (token: string, userInfo: UserInfo) => void;
    logout: () => void;
    checkUser: (userInfo: UserInfo) => void;
}

export const userStore = create<UserState>()(
    devtools((set) => ({
        user: {
            isAuthenticated: false,

            userInfo: null
        },
        login: (token, useInfo) => set((state) => {
            localStorage.setItem(TOKEN_NAME, token)
            return {
                user: {
                    ...state.user,
                    isAuthenticated: true,
                    userInfo: useInfo
                }
            }
        }, undefined, 'login'),
        logout: () => set((state) => {
            localStorage.removeItem(TOKEN_NAME)
            return {
                user: {
                    ...state.user,
                    userInfo: null,
                    isAuthenticated: false,

                }
            }
        }, undefined, 'logout'),
        checkUser: (userInfo) => set((state) => {
            return {
                user: {
                    ...state.user,
                    userInfo: userInfo,
                    isAuthenticated: true,

                }
            }
        }, undefined, 'checkUser')


    })),
)