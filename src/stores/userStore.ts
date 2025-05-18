
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import type { UserInfo } from '../types/responsesTypes';
export type UserProps = {
    isAuthenticated: boolean;
    userInfo: UserInfo | null;
}
export interface UserState {
    user: UserProps;
    login: (token: string, userInfo: UserInfo) => void;
    logout: () => void;
}

export const userStore = create<UserState>()(
    devtools((set) => ({
        user: {
            isAuthenticated: false,
            userInfo: null
        },
        login: (token, useInfo) => set((state) => {
            localStorage.setItem('token', token)
            return {
                user: {
                    ...state.user,
                    isAuthenticated: true,
                    userInfo: useInfo
                }
            }
        }, undefined, 'login'),
        logout: () => set((state) => {
            localStorage.removeItem('token')
            return {
                user: {
                    ...state.user,
                    userInfo: null,
                    isAuthenticated: false,

                }
            }
        }, undefined, 'logout'),


    })),
)