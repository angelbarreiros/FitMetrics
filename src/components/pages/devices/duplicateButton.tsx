import { CopyPlus } from "lucide-react";
import { useState } from "react";
import { fetchData } from "../../../util/fetch";
import { TOKEN_NAME } from "../../../auth/Auth";
import userStore from "../../../stores/userStore";
import type { AddDeviceResponse } from "../../../types/responsesTypes";

type DuplicateButtonProps = {
    id: number;
    facilityId: number;
    facilityName: string;
};

export const DuplicateButton = ({ id, facilityId, facilityName }: DuplicateButtonProps) => {
    const [loading, setLoading] = useState(false);
    const { addDevice } = userStore(state => state.deviceActions);

    const handleDuplicate = async () => {
        setLoading(true);
        fetchData<AddDeviceResponse>({ apiName: "login", url: `/api/v1/duplicateDevice/${id}`, method: "POST", auth: { tokenName: TOKEN_NAME } }, {
            onSuccess: (response) => {
                response.FacilityId = facilityId
                response.FacilityName = facilityName
                addDevice(response);
            },
            onForbiddenError: () => { },
            onNotFoundError: () => { },
            onServerError: () => { },
            onUnexpectedError: () => { },
            onUserError: () => { },
            onUnauthorizedError: () => { },
        })
        setLoading(false)

    };

    return (
        <button
            title="Duplicate"
            className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-50"
            onClick={handleDuplicate}
            disabled={loading}
        >
            {loading ? (
                <div className="flex justify-center items-center h-5 w-5">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700"></div>
                </div>
            ) : (
                <CopyPlus className="h-5 w-5" />
            )}
        </button>
    );
};

export default DuplicateButton;
