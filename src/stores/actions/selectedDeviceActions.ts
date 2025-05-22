import type { DeviceInfoResponse } from "../../types/responsesTypes";
import type { AppState } from "../userStore";

export interface SelectedDeviceActions {
    setSelectedDevice: (device: DeviceInfoResponse) => void;
}
export function createSelectedDeviceActions(
    set: (fn: (state: AppState) => Partial<AppState>, replace?: false | undefined, actionName?: string) => void
): SelectedDeviceActions {
    return (
        {
            setSelectedDevice: (device) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        selectedDevice: device
                    }
                }), false, 'selectedDevice/setSelectedDevice')
        }
    )
}