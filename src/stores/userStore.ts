import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TOKEN_NAME } from '../auth/Auth';
import type { AddFacilityResponse, EditAccountResponse, UserInfo } from '../types/responsesTypes';
import { UserInfoInitialState } from './initialState';
import type { EditFacility } from '../types/fetchTypes';

export interface UserProps {
    isAuthenticated: boolean;
    hasConexion: boolean;
    userInfo: UserInfo;
}

export interface FacilityActions {
    addFacility: (facility: AddFacilityResponse) => void;
    deleteFacility: (facilityId: number) => void;
    editFacility: (facility: EditFacility) => void;
    toggleShowQrOnQuestions: (facilityId: number) => void;
    toggleHideGoogleOnBadRating: (facilityId: number) => void;
    editDesireDailyClicks: (facilityId: number, clicks: number) => void;
}

export interface UserActions {
    login: (token: string, userInfo: UserInfo) => void;
    logout: () => void;
    checkUser: (userInfo: UserInfo) => void;
    setConexion: (hasConexion: boolean) => void;
    editAccount: (editAccount: EditAccountResponse) => void;
}

export interface AppState {
    user: UserProps;
    userActions: UserActions;
    facilityActions: FacilityActions;
}
export const userStore = create<AppState>()(
    devtools((set) => ({
        user: {
            isAuthenticated: false,
            hasConexion: true,
            userInfo: UserInfoInitialState,
        },
        userActions: {
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
        },

        facilityActions: {
            addFacility: (facility) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            Facilities: [
                                {
                                    Id: facility.Id,
                                    Name: facility.Name,
                                    GoogleLink: facility.GoogleLink,
                                    PhoneNumber: facility.PhoneNumber,
                                    DesireDailyClicks: 100,
                                    HideGoogleOnBadRating: false,
                                    ShowQrOnQuestions: false,
                                    Devices: facility.Devices
                                },
                                ...(state.user.userInfo.Facilities || []),
                            ]
                        }
                    }
                }), false, 'facility/addFacility'),

            deleteFacility: (facilityId) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            Facilities: (state.user.userInfo.Facilities || []).filter(f => f.Id !== facilityId),
                        }
                    }
                }), false, 'facility/deleteFacility'),

            editFacility: (facility) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            Facilities: state.user.userInfo.Facilities.map(f =>
                                f.Id === facility.Id
                                    ? { ...f, ...facility }
                                    : f
                            ),
                        }
                    }
                }), false, 'facility/editFacility'),

            toggleShowQrOnQuestions: (facilityId) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            Facilities: state.user.userInfo.Facilities.map(f =>
                                f.Id === facilityId
                                    ? { ...f, ShowQrOnQuestions: !f.ShowQrOnQuestions }
                                    : f
                            ),
                        }
                    }
                }), false, 'facility/toggleShowQrOnQuestions'),

            toggleHideGoogleOnBadRating: (facilityId) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            Facilities: state.user.userInfo.Facilities.map(f =>
                                f.Id === facilityId
                                    ? { ...f, HideGoogleOnBadRating: !f.HideGoogleOnBadRating }
                                    : f
                            ),
                        }
                    }
                }), false, 'facility/toggleHideGoogleOnBadRating'),

            editDesireDailyClicks: (facilityId, clicks) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            Facilities: state.user.userInfo.Facilities.map(f =>
                                f.Id === facilityId
                                    ? { ...f, DesireDailyClicks: clicks }
                                    : f
                            ),
                        }
                    }
                }), false, 'facility/editDesireDailyClicks'),
        }
    }))
);
export default userStore;