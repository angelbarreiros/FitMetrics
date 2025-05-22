import { Ban, CircleCheck, Pencil, Settings, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { TOKEN_NAME } from "../../../auth/Auth";
import { userStore } from "../../../stores/userStore";
import type { FacilitiesDto } from "../../../types/responsesTypes";
import { fetchData } from "../../../util/fetch";
import SimpleEditableField from "../../shared/EditableField";
import SettingsMenu from "./settingsMenu";

const FacilityRow = ({ Id, Name, GoogleLink, PhoneNumber, ShowQrOnQuestions, HideGoogleOnBadRating, DesireDailyClicks, Devices }: FacilitiesDto) => {
    const { deleteFacility, editFacility } = userStore(state => state.facilityActions);
    const { logout } = userStore(state => state.userActions);
    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const nameRef = useRef<string>(Name);
    const linkRef = useRef<string>(GoogleLink);
    const phoneRef = useRef<string>(PhoneNumber);


    const [locationColors, setLocationColors] = useState<Record<string, string>>({});

    useEffect(() => {
        const colors: Record<string, string> = {};
        const palette = [
            "bg-blue-100 text-blue-800 border-blue-200",
            "bg-green-100 text-green-800 border-green-200",
            "bg-purple-100 text-purple-800 border-purple-200",
            "bg-indigo-100 text-indigo-800 border-indigo-200",
            "bg-sky-100 text-sky-800 border-sky-200",
            "bg-amber-100 text-amber-800 border-amber-200",
            "bg-rose-100 text-rose-800 border-rose-200",
        ];

        Devices.forEach(({ Id }) => {
            colors[Id] = palette[Math.floor(Math.random() * palette.length)];
        });
        setLocationColors(colors);
    }, [Devices]);

    const handleSave = async () => {
        if (!nameRef.current.trim()) {
            setErrorMessage("Name cannot be empty");
            return;
        }
        if (nameRef.current.trim().length > 30) {
            setErrorMessage("Name cannot exceed 30 characters");
            return;
        }
        if (linkRef.current.trim().length > 500) {
            setErrorMessage("Google Link cannot exceed 500 characters");
            return;
        }
        if (phoneRef.current.trim().length > 20) {
            setErrorMessage("Phone number cannot exceed 20 characters");
            return;
        }
        if (linkRef.current && !/^https?:\/\/.+/.test(linkRef.current.trim())) {
            setErrorMessage("Google Link must be a valid URL starting with http:// or https://");
            return;
        }
        if (phoneRef.current && !/^\+?[0-9\s\-()]{7,20}$/.test(phoneRef.current.trim())) {
            setErrorMessage("Phone number is invalid");
            return;
        }
        setErrorMessage("");
        const body = { Name: nameRef.current.trim(), GoogleLink: linkRef.current.trim(), PhoneNumber: phoneRef.current.trim() };
        fetchData({ apiName: "login", url: `/api/v1/editFacility/${Id}`, method: "PUT", body: body, auth: { tokenName: TOKEN_NAME } }, {
            onForbiddenError: () => { logout(); },
            onNotFoundError: () => { setErrorMessage("Server error"); },
            onServerError: () => { setErrorMessage("Server error"); },
            onSuccess: () => {
                editFacility({ Id: Id, Name: nameRef.current.trim(), GoogleLink: linkRef.current.trim(), PhoneNumber: phoneRef.current.trim() });
                setEditing(false);
            },
            onUserError: () => { setErrorMessage("Server error"); },
            onUnauthorizedError: () => { setErrorMessage("Server error"); },
            onUnexpectedError: () => { setErrorMessage("Server error"); },

        })

    };
    const handleEndEditing = async () => {
        await handleSave();

    }
    const handleDelete = async () => {
        fetchData({ apiName: "login", url: `/api/v1/deleteFacility/${Id}`, method: "DELETE", auth: { tokenName: TOKEN_NAME } }, {
            onForbiddenError: () => { logout(); },
            onNotFoundError: () => { setErrorMessage("Server error"); },
            onServerError: () => { setErrorMessage("Server error"); },
            onSuccess: () => { deleteFacility(Id); setDeleting(false); },
            onUserError: () => { setErrorMessage("Server error"); },
            onUnauthorizedError: () => { setErrorMessage("Server error"); },
            onUnexpectedError: () => { setErrorMessage("Server error"); },

        })
    };

    return (
        <div className="min-h-10 py-3 px-4 ">
            <div className="grid grid-cols-10 items-center gap-2  ">
                {/* Name */}
                <div className="col-span-2 text-center">
                    <SimpleEditableField endEditable={handleEndEditing} getValue={(value) => nameRef.current = value} type="text" editable={isEditing} value={nameRef.current} placeholder={Name} name="Name" ></SimpleEditableField>

                </div>

                {/* Google Link */}
                <div className="col-span-2 text-center">
                    <SimpleEditableField endEditable={handleEndEditing} getValue={(value) => linkRef.current = value} type="text" editable={isEditing} value={linkRef.current} placeholder={GoogleLink} name="Google Link" ></SimpleEditableField>
                </div>

                {/* Phone Number */}
                <div className="col-span-2 text-center">
                    <SimpleEditableField endEditable={handleEndEditing} getValue={(value) => phoneRef.current = value} type="text" editable={isEditing} value={phoneRef.current} placeholder={PhoneNumber} name="Phone Number" ></SimpleEditableField>

                </div>

                {/* Devices */}
                <div className="col-span-3 flex flex-wrap gap-2">
                    {Devices.length ? (
                        Devices.map(({ Id, Name }) => (
                            <Link
                                key={Id}
                                to={`/location/${Id}`}
                                className={`px-3 py-1 rounded-full border ${locationColors[Id]}`}
                            >
                                {Name}
                            </Link>
                        ))
                    ) : (
                        <span className="text-gray-400">No devices</span>
                    )}
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end space-x-2">
                    {isDeleting ? (
                        <>
                            <button onClick={handleDelete} title={"Confirm Delete"}>
                                <CircleCheck className="text-red-500" />
                            </button>
                            <button onClick={() => setDeleting(false)} title="Cancel Delete">
                                <Ban className="text-gray-500 hover:cursor-pointer" />
                            </button>
                        </>
                    ) : isEditing ? (
                        <button onClick={handleSave} title="Save changes">
                            <CircleCheck className="text-green-500 hover:cursor-pointer" />
                        </button>
                    ) : (
                        <>
                            <button onClick={() => { console.log(Id); console.log(Name); setEditing(true) }} title="Edit">
                                <Pencil className="text-primary hover:cursor-pointer" />
                            </button>
                            <button onClick={() => setShowSettings(!showSettings)} title="Settings">
                                <Settings className="text-gray-600 hover:cursor-pointer" />
                            </button>
                            {Devices.length === 0 && (
                                <button onClick={() => setDeleting(true)} title="Delete">
                                    <Trash2 className="text-red-500 hover:cursor-pointer" />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {showSettings && (
                <div className="mt-3 border-t pt-3">
                    <SettingsMenu Id={Id} ShowQrOnQuestions={ShowQrOnQuestions} DesireDailyClicks={DesireDailyClicks} HideGoogleOnBadRating={HideGoogleOnBadRating} />
                </div>
            )}

            {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
        </div>
    );
};

export default FacilityRow;
