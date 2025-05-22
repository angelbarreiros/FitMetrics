import type { EditDeviceDto } from "../../types/fetchTypes";
import type { AddDeviceResponse } from "../../types/responsesTypes";
import type { AppState } from "../userStore";

export interface DeviceActions {
    addDevice: (device: AddDeviceResponse) => void;
    deleteDevice: (deviceId: number) => void;
    editDevice: (deviceId: number, device: EditDeviceDto) => void;

}
export function CreateDeviceActions(
    set: (fn: (state: AppState) => Partial<AppState>, replace?: false | undefined, actionName?: string) => void
): DeviceActions {
    return {
        addDevice: (device) =>
            set((state) => ({
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        Facilities: state.user.userInfo.Facilities.map(f => {
                            if (f.Id === device.FacilityId) {
                                return {
                                    ...f,
                                    Devices: [
                                        ...(f.Devices || []),
                                        {
                                            Id: device.Id,
                                            Name: device.Name,
                                            UuidName: device.UuidName,
                                            FacilityName: device.FacilityName,
                                            FacilityId: device.FacilityId,
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
        editDevice: (deviceId, device) =>
            set((state) => ({
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        Facilities: state.user.userInfo.Facilities.map(f => ({
                            ...f,
                            Devices: (f.Devices || []).map(d => {
                                if (d.Id === deviceId) {
                                    return {
                                        ...d,
                                        Name: device.Name,
                                        FacilityId: device.FacilityId
                                    };
                                }
                                return d;
                            })
                        }))
                    }
                }
            }), false, 'device/editDevice')



    }
}