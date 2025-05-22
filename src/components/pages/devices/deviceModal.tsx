import { Plus } from "lucide-react";
import { TOKEN_NAME } from "../../../auth/Auth";
import userStore from "../../../stores/userStore";
import type { AddDeviceResponse } from "../../../types/responsesTypes";
import { fetchData } from "../../../util/fetch";
import { CustomDropdown } from "../../shared/CustomDropdown";
import ModalOpener from "../../shared/ModalOpener";
import { useRef, useState } from "react";

export const DeviceModal = () => {
    const facilities = userStore(state => state.user.userInfo.Facilities);
    const { logout } = userStore(state => state.userActions);
    const { addDevice } = userStore(state => state.deviceActions);
    const [deviceName, setDeviceName] = useState("");
    const filterId = useRef<number>(0);
    const [error, setError] = useState("");
    const cleanError = () => {
        setError("");
    }
    const handleSubmit = (e: React.FormEvent, closeModal: () => void) => {
        e.preventDefault();
        cleanError();
        const body = {
            Name: deviceName,
            FacilityId: filterId.current,

        }
        fetchData<AddDeviceResponse>({ apiName: "login", url: "/api/v1/createDevice", method: "POST", body: body, auth: { tokenName: TOKEN_NAME } },
            {
                onForbiddenError: () => { logout(); },
                onNotFoundError: (result) => { setError(result.message) },
                onServerError: () => {
                    setError("Server error, please try again later");
                },
                onSuccess: (result) => {
                    addDevice(result);
                    closeModal()
                    setError("");
                },
                onUnexpectedError: () => {
                    setError("Unexpected error, please try again later");

                },
                onUserError: (result) => {
                    setError(result.message);
                },
                onUnauthorizedError: () => {
                    setError("Unauthorized error, please try again later");
                    logout();
                },
            })

    }

    return (
        <ModalOpener buttonLabel="Create" Icon={Plus}>
            {(closeModal) => (
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e, closeModal)}>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="deviceName"
                                className="block text-xl  text-text"
                            >
                                Device Name:
                            </label>
                            <input
                                type="text"
                                id="deviceName"
                                name="deviceName"
                                className="w-full bg-secundary px-4 py-2 border-2  rounded-default
                                     transition-all duration-200 outline-none
                                     border-none
                                     placeholder-text text-text text-xl
                                     "
                                placeholder="Enter device name"
                                value={deviceName}
                                onChange={e => setDeviceName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xl  text-text mb-2">
                                Select Facility:
                            </label>
                            <div className="w-full">
                                <CustomDropdown
                                    options={facilities}
                                    id="Device Modal"
                                    name="Device Dropdown"
                                    bgColor="secundary"
                                    textColor="text"
                                    placeholder="Choose a facility"
                                    getValue={id => filterId.current = id}
                                />
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="px-6 py-2 bg-secundary text-text rounded-default
                                     hover:bg-secundary transition-colors duration-200
                                     font-medium text-md shadow-sm
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!deviceName.trim()}
                    >
                        Create Device
                    </button>


                </form>
            )



            }
        </ModalOpener>
    );
};

export default DeviceModal;