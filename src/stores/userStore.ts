
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TOKEN_NAME } from '../auth/Auth';
import type { EditAccountResponse, UserInfo } from '../types/responsesTypes';
import { UserInfoInitialState } from './initialState';

export type UserProps = {
    isAuthenticated: boolean;
    hasConexion: boolean;
    userInfo: UserInfo;
}
export interface UserState {
    user: UserProps;
    login: (token: string, userInfo: UserInfo) => void;
    logout: () => void;
    checkUser: (userInfo: UserInfo) => void;
    setConexion: (hasConexion: boolean) => void;
    editAccount: (editAccount: EditAccountResponse) => void
}

export const userStore = create<UserState>()(
    devtools((set) => ({
        user: {
            isAuthenticated: false,
            hasConexion: true,
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
                    userInfo: UserInfoInitialState,
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
        }, undefined, 'checkUser'),
        setConexion: (hasConexion) => set((state) => ({
            user: {
                ...state.user,
                hasConexion: hasConexion
            }
        }), undefined, 'setConexion'),
        editAccount: (editAccount) => set((state) => ({
            user: {
                ...state.user,
                userInfo: {
                    ...state.user.userInfo,
                    Name: editAccount.Name,
                    Email: editAccount.Email,
                }

            }
        }), undefined, 'setConexion')



    })),
)