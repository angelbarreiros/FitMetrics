import { TabletIcon } from "lucide-react";
import { useState } from "react";
import { TOKEN_NAME } from "../../auth/Auth";
import { SEO } from "../../components/SEO";
import DeviceModal from "../../components/pages/devices/deviceModal";
import CustomDropdown from "../../components/shared/CustomDropdown";
import NoItemsFound from "../../components/shared/NoItemsFound";
import PagesHeader from "../../components/shared/PageHeader";
import { userStore } from "../../stores/userStore";
import type { FilterDevices } from "../../types/responsesTypes";
import { fetchData } from "../../util/fetch";


export default function DevicesPage() {
    const facilities = userStore(state => state.user.userInfo.Facilities);
    const allDevices = facilities?.flatMap(facility => facility.Devices || []) || [];
    const [devices, setDevices] = useState(allDevices)
    const handleFilterChange = (facilityId: number) => {
        if (facilityId === 0) {
            setDevices(allDevices);
            return;
        }
        fetchData<FilterDevices>({ apiName: "login", url: `/api/v1/filterFacility/${facilityId}`, method: "GET", auth: { tokenName: TOKEN_NAME } }, {
            onForbiddenError: () => { },
            onNotFoundError: () => { },
            onServerError: () => {

            },
            onSuccess: (result) => {
                setDevices(result.Devices);
            },
            onUnexpectedError: () => {

            },
            onUserError: () => {

            },
            onUnauthorizedError: () => {

            }
        });
    };


    return (
        <section>
            <SEO title="FiteMetrics - Devices" ></SEO>
            <PagesHeader title="Devices" icon={TabletIcon}>
                <div className="flex flex-row mr-8 items-center justify-center gap-2">
                    <CustomDropdown getValue={handleFilterChange} id="Filter Dropdown" defaultOption={{ Name: "All", Id: 0 }} name="Filter Dropdown" options={facilities} bgColor="primary" textColor="text"></CustomDropdown>
                    <DeviceModal></DeviceModal>

                </div>
            </PagesHeader>
            <div className="px-2 py-4">
                {allDevices.length === 0
                    ? <NoItemsFound title="Devices" buttonLabel="Create" />
                    :
                    devices.map((device) => (
                        <div key={device.Id} className="bg-secundary rounded-default border-1 border-borderLine my-4">
                            <div className="flex flex-row items-center justify-between p-4">
                                <div className="flex flex-row items-center gap-2">
                                    <TabletIcon className="h-8 w-8 text-text" />
                                    <p className="text-text font-semibold">{device.Name}</p>
                                </div>
                                <p className="text-text-secundary/50 text-sm">{device.UuidName}</p>
                            </div>
                        </div>
                    ))

                }

            </div>
        </section>



    );
}