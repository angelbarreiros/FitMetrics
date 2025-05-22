import type { EditFacility } from "../../types/fetchTypes";
import type { AddFacilityResponse } from "../../types/responsesTypes";
import type { AppState } from "../userStore";


export interface FacilityActions {
    addFacility: (facility: AddFacilityResponse) => void;
    deleteFacility: (facilityId: number) => void;
    editFacility: (facility: EditFacility) => void;
    toggleShowQrOnQuestions: (facilityId: number) => void;
    toggleHideGoogleOnBadRating: (facilityId: number) => void;
    editDesireDailyClicks: (facilityId: number, clicks: number) => void;
}

export function createFacilityActions(
    set: (fn: (state: AppState) => Partial<AppState>, replace?: false | undefined, actionName?: string) => void
): FacilityActions {
    return {
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
    };
}