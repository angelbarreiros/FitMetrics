import { Check, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { fetchData } from "../../../util/fetch";
import { TOKEN_NAME } from "../../../auth/Auth";
import { userStore } from "../../../stores/userStore";


type FacilitySettings = {
    Id: number;
    ShowQrOnQuestions: boolean;
    HideGoogleOnBadRating: boolean;
    DesireDailyClicks: number;
}
const SettingsMenu = (facility: FacilitySettings) => {
    const { toggleShowQrOnQuestions, toggleHideGoogleOnBadRating, editDesireDailyClicks, logout } = userStore((state) => state);
    const [showQr, setShowQr] = useState(facility.ShowQrOnQuestions);
    const [hideGoogle, setHideGoogle] = useState(facility.HideGoogleOnBadRating);
    const [clicks, setClicks] = useState(facility.DesireDailyClicks || 0);
    const [clickEditing, setClickEditing] = useState(false);
    const [tempClicks, setTempClicks] = useState(clicks);

    const handleQrTogle = () => {
        fetchData({ apiName: "login", method: "PUT", url: `/api/v1/changeQrOption/${facility.Id}`, auth: { tokenName: TOKEN_NAME } }, {
            onForbiddenError: () => { logout() },
            onSuccess: () => {
                setShowQr(!showQr);
                toggleShowQrOnQuestions(facility.Id);
            },
            onNotFoundError: () => { },
            onServerError: () => { },
            onUnauthorizedError: () => { },
            onUnexpectedError: () => { },
            onUserError: () => { },

        })

    };
    const handleGoogleTogle = () => {
        fetchData({ apiName: "login", method: "PUT", url: `/api/v1/changeGoogleOption/${facility.Id}`, auth: { tokenName: TOKEN_NAME } }, {
            onForbiddenError: () => { logout() },
            onSuccess: () => {
                setHideGoogle(!hideGoogle);
                toggleHideGoogleOnBadRating(facility.Id);
            },
            onNotFoundError: () => { },
            onServerError: () => { },
            onUnauthorizedError: () => { },
            onUnexpectedError: () => { },
            onUserError: () => { },

        })

    };

    const handleClicksSubmit = async () => {
        const body = { DesireDailyClicks: tempClicks }
        fetchData({ apiName: "login", method: "PUT", url: `/api/v1/updateDesireDailyClicks/${facility.Id}`, body: body, auth: { tokenName: TOKEN_NAME } }, {
            onForbiddenError: () => { logout() },
            onSuccess: () => {
                console.log("Success");
                setClicks(tempClicks);
                editDesireDailyClicks(facility.Id, tempClicks);
                setClickEditing(false);
            },
            onNotFoundError: () => { },
            onServerError: () => { },
            onUnauthorizedError: () => { },
            onUnexpectedError: () => { },
            onUserError: () => { },

        })

    };

    return (
        <div className="flex flex-col gap-4 p-4">

            <SettingToggle
                label="Show QR Code on Questions"
                enabled={showQr}
                onClick={handleQrTogle}
            />


            <SettingToggle
                label="Hide Google Link on Bad Rating"
                enabled={hideGoogle}
                onClick={handleGoogleTogle}
            />

            {/* Desire Daily Clicks */}
            <div className="flex items-center justify-between w-full">
                <span className="">Desire dayli clicks</span>
                <div className="flex items-center gap-2">
                    {clickEditing ? (
                        <>
                            <input
                                type="number"
                                value={tempClicks}
                                onChange={(e) => setTempClicks(parseInt(e.target.value) || 0)}
                                className="p-1 border border-primary rounded-default text-center"
                                min="0"
                            />
                            <button
                                onClick={handleClicksSubmit}
                                className="p-1 text-green-500 hover:text-green-700"
                            >
                                <Check className="w-6 h-6 hover:cursor-pointer" />
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="">{clicks}</span>
                            <button
                                onClick={() => {
                                    setTempClicks(clicks);
                                    setClickEditing(true);
                                }}
                                className="p-1 text-gray-500 hover:text-gray-700"
                            >
                                <Edit className="w-6 h-6 hover:cursor-pointer" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

type SettingToggleProps = {
    label: string;
    enabled: boolean;
    onClick: () => void;
};

const SettingToggle = ({ label, enabled, onClick }: SettingToggleProps) => (
    <div className="flex items-center justify-between w-full">
        <span className="">{label}</span>
        <button
            onClick={onClick}
            className={`p-1 ${enabled ? "text-green-500" : "text-gray-400"}`}
        >
            {enabled ? (
                <ToggleRight className="w-6 h-6 hover:cursor-pointer" />
            ) : (
                <ToggleLeft className="w-6 h-6 hover:cursor-pointer" />
            )}
        </button>
    </div>
);

export default SettingsMenu;
