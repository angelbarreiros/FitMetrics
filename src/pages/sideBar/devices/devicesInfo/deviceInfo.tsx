import { ChevronLeftIcon, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TOKEN_NAME } from "../../../../auth/Auth";
import FacesGrid from "../../../../components/pages/deviceInfo/facesGrid";
import { FullScreenLoader } from "../../../../components/shared/FullScreenLoader";
import PagesHeader from "../../../../components/shared/PageHeader";
import { SEO } from "../../../../components/shared/SEO";
import userStore from "../../../../stores/userStore";
import type { DeviceInfoResponse } from "../../../../types/responsesTypes";
import { fetchData } from "../../../../util/fetch";
import NotFoundPage from "../../../404";

export const DeviceInfo = () => {
    const selectedDeviceInfo = userStore(state => state.user.selectedDevice);
    const setSelectedDevice = userStore(state => state.selectedDeviceActions.setSelectedDevice);
    const { deviceId } = useParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!deviceId || isNaN(Number(deviceId)) || Number(deviceId) <= 0) {
            setError("Invalid device ID");

            return;
        }

        fetchData<DeviceInfoResponse>(
            { apiName: "login", method: "GET", url: `/api/v1/deviceInfo/${deviceId}`, auth: { tokenName: TOKEN_NAME } },
            {
                onSuccess: (result) => {
                    setSelectedDevice(result);

                },
                onForbiddenError: () => { setError("Forbidden"); },
                onNotFoundError: () => { setError("Not found"); },
                onServerError: () => { setError("Server error"); },
                onUnexpectedError: () => { setError("Unexpected error"); },
                onUserError: () => { setError("User error"); },
                onUnauthorizedError: () => { setError("Unauthorized"); },
            }
        );
    }, [deviceId]);

    if (!deviceId || isNaN(Number(deviceId)) || Number(deviceId) <= 0) {
        return <NotFoundPage />;
    }
    if (error) {
        return <NotFoundPage />;
    }
    if (selectedDeviceInfo.Id === 0) {
        return <FullScreenLoader />;
    }

    return (
        <section>
            <SEO title="FitMetrics - DeviceInfo" />
            <PagesHeader
                accountName={false}
                beforeChildren={
                    <Link to={"/devices"} className="p-2 rounded-full hover:bg-secundary/50 transition-colors">
                        <ChevronLeftIcon className="w-6 h-6 text-text" />
                    </Link>}
                title={`Device Info for ${selectedDeviceInfo.Name}`}
                icon={Star} >
                <div className="mr-8 text-text text-md">
                    Uuid: {selectedDeviceInfo.UuidName}
                </div>
            </PagesHeader>
            <div className="px-2 py-4 ">
                <FacesGrid
                    deviceId={deviceId}
                    Name={selectedDeviceInfo.Name}
                    UuidName={selectedDeviceInfo.UuidName}
                    R1Id={selectedDeviceInfo.R1Id}
                    R2Id={selectedDeviceInfo.R2Id}
                    R3Id={selectedDeviceInfo.R3Id}
                    R4Id={selectedDeviceInfo.R4Id}
                />
            </div>
        </section>
    );
};

export default DeviceInfo;