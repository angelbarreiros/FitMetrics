import type { AddDeviceResponse } from "../../types/responsesTypes";
import type { AppState } from "../userStore";

export interface DeviceActions {
    addDevice: (device: AddDeviceResponse, facilityId: number) => void;
    deleteDevice: (deviceId: number) => void;
    editDevice: (device: any) => void;

}
export function CreateDeviceActions(
    set: (fn: (state: AppState) => Partial<AppState>, replace?: false | undefined, actionName?: string) => void
): DeviceActions {
    return {
        addDevice: (device, facilityId) =>
            set((state) => ({
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        Facilities: state.user.userInfo.Facilities.map(f => {
                            if (f.Id === facilityId) {
                                return {
                                    ...f,
                                    Devices: [
                                        ...(f.Devices || []),
                                        {
                                            Id: device.Id,
                                            Name: device.Name,
                                            UuidName: device.UuidName,
                                            IsActive: false
                                        }
                                    ]
                                };
                            }
                            return f;
                        })
                    }
                }
            }), false, 'device/addDevice'),
        deleteDevice: (deviceId) =>
            set((state) => ({
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        Facilities: state.user.userInfo.Facilities.map(f => ({
                            ...f,
                            Devices: (f.Devices || []).filter(d => d.Id !== deviceId)
                        }))
                    }
                }
            }), false, 'device/deleteDevice'),
        editDevice: () => { },



    }
}