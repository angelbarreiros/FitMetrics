import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { EditFacility } from '../types/fetchTypes';
import type { AddFacilityResponse, DeviceDto, UserInfo } from '../types/responsesTypes';
import { CreateDeviceActions, type DeviceActions } from './actions/deviceActions';
import { createFacilityActions } from './actions/facilityActions';
import { createUserActions, type UserActions } from './actions/userActions';
import { UserInfoInitialState } from './initialState';

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



export interface AppState {
    user: UserProps;
    filteredDevices: DeviceDto[];
    userActions: UserActions;
    facilityActions: FacilityActions;
    deviceActions: DeviceActions;
}
export const userStore = create<AppState>()(
    devtools((set) => ({
        user: {
            isAuthenticated: false,
            hasConexion: true,
            userInfo: UserInfoInitialState,
        },
        facilityActions: createFacilityActions(set),
        userActions: createUserActions(set),
        deviceActions: CreateDeviceActions(set),


    }))
);
export default userStore;