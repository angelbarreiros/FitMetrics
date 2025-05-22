import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { DeviceInfoResponse, RatingQuestionsResponse, UserInfo } from '../types/responsesTypes';
import { CreateDeviceActions, type DeviceActions } from './actions/deviceActions';
import { createFacilityActions, type FacilityActions } from './actions/facilityActions';
import { createSelectedDeviceActions, type SelectedDeviceActions } from './actions/selectedDeviceActions';
import { createUserActions, type UserActions } from './actions/userActions';
import { SelectedDeviceInitialState, SelectedRatingInitialState, UserInfoInitialState } from './initialState';
import { createSelectedRatingActions, type SelectedRatingActions } from './actions/selectedRatingActions';

export interface UserProps {
    isAuthenticated: boolean;
    hasConexion: boolean;
    selectedDevice: DeviceInfoResponse;
    selectedRating: RatingQuestionsResponse
    userInfo: UserInfo;
}

export interface AppState {
    user: UserProps;
    userActions: UserActions;
    facilityActions: FacilityActions;
    deviceActions: DeviceActions;
    selectedDeviceActions: SelectedDeviceActions
    selectedRatingActions: SelectedRatingActions
}
export const userStore = create<AppState>()(
    devtools((set) => ({
        user: {
            isAuthenticated: false,
            hasConexion: true,
            userInfo: UserInfoInitialState,
            selectedDevice: SelectedDeviceInitialState,
            selectedRating: SelectedRatingInitialState
        },
        selectedDeviceActions: createSelectedDeviceActions(set),
        facilityActions: createFacilityActions(set),
        userActions: createUserActions(set),
        deviceActions: CreateDeviceActions(set),
        selectedRatingActions: createSelectedRatingActions(set)



    }))
);
export default userStore;