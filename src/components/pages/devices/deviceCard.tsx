import { Ban, CircleCheck, Pencil, Trash2 } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SimpleEditableField from "../../shared/EditableField";
import DuplicateButton from "./duplicateButton";

import userStore from "../../../stores/userStore";
import { fetchData } from "../../../util/fetch";
import { TOKEN_NAME } from "../../../auth/Auth";
import { CustomDropdown } from "../../shared/CustomDropdown";



type DeviceCardProps = {
    id: number;
    name: string;
    uuidname: string;
    facilityId: number;
    filterId: number | null;
    facilityName: string;
    isActive: boolean;
};

export const DeviceCard = ({ id, name, uuidname, facilityId, facilityName, isActive, }: DeviceCardProps) => {
    const Facilities = userStore(state => state.user.userInfo.Facilities);
    const { editDevice, deleteDevice } = userStore(state => state.deviceActions);

    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const nameRef = useRef<string>(name);
    const facilityIdEditRef = useRef<number>(facilityId);
    const facilityNameRef = useRef<string>(facilityName);

    const toggleEdit = async (e?: FormEvent) => {
        if (e) e.preventDefault();
        const body = {
            Name: nameRef.current,
            FacilityId: facilityIdEditRef.current,

        };
        fetchData({ apiName: "login", url: `/api/v1/editDevice/${id}`, method: "PUT", auth: { tokenName: TOKEN_NAME }, body: body }, {
            onSuccess: () => {
                editDevice(id, body);
                setEditing(!isEditing);

            },
            onForbiddenError: () => { },
            onNotFoundError: () => { },
            onServerError: () => { },
            onUnexpectedError: () => { },
            onUserError: () => { },
            onUnauthorizedError: () => { },
        })



    };

    const handleEditClick = () => { setEditing(true); };

    const toggleDeleting = async () => {
        fetchData({ apiName: "login", url: `/api/v1/deleteDevice/${id}`, method: "DELETE", auth: { tokenName: TOKEN_NAME } }, {
            onSuccess: () => {
                setTimeout(() => {
                    deleteDevice(id);
                    setDeleting(false);
                }, 10);
            },
            onForbiddenError: () => { },
            onNotFoundError: () => { },
            onServerError: () => { },
            onUnexpectedError: () => { },
            onUserError: () => { },
            onUnauthorizedError: () => { },
        })
    };
    const handleDropdownChange = (id: number) => {
        facilityIdEditRef.current = id;
        facilityNameRef.current = Facilities.find(f => f.Id === id)?.Name || "";
    }
    return (
        <div
            key={id}
            className="bg-secundary/50 shadow-md rounded-lg p-5 border flex flex-col justify-between border-gray-200 hover:shadow-lg transition-all duration-300 relative"
        >
            <div className="mb-2">
                <form
                    onSubmit={toggleEdit}
                    className="w-62 md:w-10/12 space-y-2 flex-col justify-start"
                >
                    <SimpleEditableField endEditable={toggleEdit} name="Device Name" type="text" editable={isEditing} value={nameRef.current} getValue={(name) => nameRef.current = name}></SimpleEditableField>
                    {isEditing && (
                        <CustomDropdown
                            placeholder={facilityNameRef.current}
                            getValue={handleDropdownChange}
                            id="Filter Dropdown"
                            name="Filter Dropdown"
                            options={Facilities}
                            bgColor="primary"
                            textColor="text"
                        />
                    )}
                </form>
            </div>

            <div className="absolute top-4 right-4">
                <div className="flex items-center justify-center gap-0">
                    {isDeleting ? (
                        <>
                            <button
                                title="Approve"
                                onClick={() => toggleDeleting()}
                                className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 cursor-pointer"
                            >
                                <CircleCheck className="h-5 w-5" />
                            </button>
                            <button
                                title="Cancel"
                                onClick={() => setDeleting(!isDeleting)}
                                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                            >
                                <Ban className="h-5 w-5" />
                            </button>
                        </>
                    ) : isEditing ? (
                        <button
                            title="Approve"
                            onClick={() => toggleEdit()}
                            className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-50 cursor-pointer"
                        >
                            <CircleCheck className="h-5 w-5" />
                        </button>
                    ) : (
                        <>
                            <button
                                className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 cursor-pointer"
                                title="Edit"
                                onClick={handleEditClick}
                            >
                                <Pencil className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setDeleting(!isDeleting)}
                                className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 cursor-pointer"
                                title="Delete"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                            <DuplicateButton id={id} facilityId={facilityId} facilityName={facilityName} />
                        </>
                    )}
                </div>
            </div>

            <div className="mt-auto">
                {facilityName !== "" && !isEditing && (
                    <div className="flex justify-start mb-1 text-text">
                        Facility: {facilityNameRef.current}

                    </div>
                )}

                <Link
                    to={`/devices/deviceInfo/${id}`}
                    className="text-indigo-600 text-sm hover:text-indigo-800 hover:underline block mb-2"
                >
                    Device ID: {uuidname}
                </Link>
            </div>

            <div className="flex items-center mt-2 pt-2 border-t border-gray-100">
                <div
                    className={`w-3 h-3 rounded-full mr-2 ${isActive ? "bg-blue-500" : "bg-red-400 saturate-200"
                        }`}
                ></div>
                <span className="text-sm text-gray-600">
                    {isActive ? "Active" : "Inactive"}
                </span>
            </div>
        </div>
    );
};

export default DeviceCard;
