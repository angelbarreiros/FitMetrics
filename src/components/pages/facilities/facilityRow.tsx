import { Ban, CircleCheck, Pencil, Settings, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import SettingsMenu from "./settingsMenu";
import type { FacilitiesDto } from "../../../types/responsesTypes";
import { fetchData } from "../../../util/fetch";
import { TOKEN_NAME } from "../../../auth/Auth";
import { userStore } from "../../../stores/userStore";

const FacilityRow = ({ Id, Name, GoogleLink, PhoneNumber, ShowQrOnQuestions, HideGoogleOnBadRating, DesireDailyClicks, Devices }: FacilitiesDto) => {
    const { deleteFacility, editFacility, logout } = userStore(state => state);


    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [nameState, setName] = useState(Name);
    const [linkState, setLink] = useState(GoogleLink);
    const [phoneState, setPhone] = useState(PhoneNumber);

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
        if (!nameState.trim()) {
            setErrorMessage("Name cannot be empty");
            return;
        }
        if (linkState && !/^https?:\/\/.+/.test(linkState.trim())) {
            setErrorMessage("Google Link must be a valid URL starting with http:// or https://");
            return;
        }
        if (phoneState && !/^\+?[0-9\s\-()]{7,20}$/.test(phoneState.trim())) {
            setErrorMessage("Phone number is invalid");
            return;
        }
        setErrorMessage("");
        const body = { Name: nameState.trim(), GoogleLink: linkState.trim(), PhoneNumber: phoneState.trim() };
        fetchData({ apiName: "login", url: `/api/v1/editFacility/${Id}`, method: "PUT", body: body, auth: { tokenName: TOKEN_NAME } }, {
            onForbiddenError: () => { logout(); },
            onNotFoundError: () => { setErrorMessage("Server error"); },
            onServerError: () => { setErrorMessage("Server error"); },
            onSuccess: () => {
                editFacility({ Id: Id, Name: nameState.trim(), GoogleLink: linkState.trim(), PhoneNumber: phoneState.trim() });
                setEditing(false);
            },
            onUserError: () => { setErrorMessage("Server error"); },
            onUnauthorizedError: () => { setErrorMessage("Server error"); },
            onUnexpectedError: () => { setErrorMessage("Server error"); },

        })

    };

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
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            className=" w-full border-2 border-primary rounded-default p-1"
                            value={nameState}
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        <span className="block text-text-secundary text-lg text-center truncate">{nameState}</span>
                    )}
                </div>

                {/* Google Link */}
                <div className="col-span-2 text-center">
                    {isEditing ? (
                        <input
                            className=" w-full border-2 border-primary rounded-default p-1"
                            value={linkState}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    ) : phoneState !== "" ? (
                        <a
                            href={phoneState}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline block truncate"
                        >
                            {phoneState}
                        </a>
                    ) : (
                        <span className="text-text-secundary/50">No Link</span>
                    )}
                </div>

                {/* Phone Number */}
                <div className="col-span-2 text-center">
                    {isEditing ? (
                        <input
                            className=" w-full border-2 border-primary rounded-default p-1"
                            value={phoneState}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    ) : (
                        <span className="block truncate text-text-secundary">
                            {phoneState || "No phone number"}
                        </span>
                    )}
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
