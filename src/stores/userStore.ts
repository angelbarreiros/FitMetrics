import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TOKEN_NAME } from '../auth/Auth';
import type { AddFacilityResponse, EditAccountResponse, UserInfo } from '../types/responsesTypes';
import { UserInfoInitialState } from './initialState';
import type { EditFacility } from '../types/fetchTypes';

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
    addFacility: (facility: AddFacilityResponse) => void
    deleteFacility: (facilityId: number) => void
    editFacility: (facility: EditFacility) => void
    toggleShowQrOnQuestions: (facilityId: number) => void
    toggleHideGoogleOnBadRating: (facilityId: number) => void
    editDesireDailyClicks: (facilityId: number, clicks: number) => void
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
        }), undefined, 'setConexion'),
        addFacility: (facility) => set((state) => ({
            user: {
                ...state.user,
                userInfo: {
                    ...state.user.userInfo,
                    Facilities: [
                        ...((state.user.userInfo?.Facilities) || []),
                        {
                            Id: facility.Id,
                            Name: facility.Name,
                            GoogleLink: facility.GoogleLink,
                            PhoneNumber: facility.PhoneNumber,
                            DesireDailyClicks: 100,
                            HideGoogleOnBadRating: false,
                            ShowQrOnQuestions: false,
                            Devices: facility.Devices
                        }
                    ]
                }
            }
        }), undefined, 'addFacility'),
        deleteFacility: (facilityId: number) => set((state) => ({
            user: {
                ...state.user,
                userInfo: {
                    ...state.user.userInfo,
                    Facilities: (state.user.userInfo?.Facilities || []).filter(facility => facility.Id !== facilityId)
                }
            }
        }), undefined, 'deleteFacility'),
        editFacility: (facility) => set((state) => ({
            user: {
                ...state.user,
                userInfo: {
                    ...state.user.userInfo,
                    Facilities: (state.user.userInfo?.Facilities || []).map(f =>
                        f.Id === facility.Id
                            ? {
                                ...f,
                                Name: facility.Name,
                                GoogleLink: facility.GoogleLink,
                                PhoneNumber: facility.PhoneNumber
                            }
                            : f
                    )
                }
            }
        }), undefined, 'editFacility'),
        toggleShowQrOnQuestions: (facilityId: number) => set((state) => ({
            user: {
                ...state.user,
                userInfo: {
                    ...state.user.userInfo,
                    Facilities: (state.user.userInfo?.Facilities || []).map(f =>
                        f.Id === facilityId
                            ? { ...f, ShowQrOnQuestions: !f.ShowQrOnQuestions }
                            : f
                    )
                }
            }
        }), undefined, 'toggleShowQrOnQuestions'),

        toggleHideGoogleOnBadRating: (facilityId: number) => set((state) => ({
            user: {
                ...state.user,
                userInfo: {
                    ...state.user.userInfo,
                    Facilities: (state.user.userInfo?.Facilities || []).map(f =>
                        f.Id === facilityId
                            ? { ...f, HideGoogleOnBadRating: !f.HideGoogleOnBadRating }
                            : f
                    )
                }
            }
        }), undefined, 'toggleHideGoogleOnBadRating'),
        editDesireDailyClicks: (facilityId: number, clicks: number) => set((state) => ({
            user: {
                ...state.user,
                userInfo: {
                    ...state.user.userInfo,
                    Facilities: (state.user.userInfo?.Facilities || []).map(f =>
                        f.Id === facilityId
                            ? { ...f, DesireDailyClicks: clicks }
                            : f
                    )
                }
            }
        }), undefined, 'editDesireDailyClicks'),
    })),
)
