
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
export type UserProps = {
    isAuthenticated: boolean;
    organizationId: number;
    language: string
}
export interface UserState {
    user: UserProps;
    login: (token: string) => void;
    logout: () => void;
}

export const userStore = create<UserState>()(
    devtools((set) => ({
        user: {
            isAuthenticated: false,
            organizationId: 0,
            language: 'en',
        },
        login: (token) => set((state) => {
            localStorage.setItem('token', token)
            return {
                user: {
                    ...state.user,
                    isAuthenticated: true,
                }
            }
        }, undefined, 'login'),
        logout: () => set((state) => {
            localStorage.removeItem('token')
            return {
                user: {
                    ...state.user,
                    isAuthenticated: false,
                }
            }
        }, undefined, 'logout'),


    })),
)