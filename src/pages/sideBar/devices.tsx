import { TabletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TOKEN_NAME } from "../../auth/Auth";
import { SEO } from "../../components/SEO";
import DeviceModal from "../../components/pages/devices/deviceModal";
import CustomDropdown from "../../components/shared/CustomDropdown";
import NoItemsFound from "../../components/shared/NoItemsFound";
import PagesHeader from "../../components/shared/PageHeader";
import { userStore } from "../../stores/userStore";
import type { FilterDevices } from "../../types/responsesTypes";
import { fetchData } from "../../util/fetch";
import DeviceCard from "../../components/pages/devices/deviceCard";

export default function DevicesPage() {
    const Facilities = userStore(state => state.user.userInfo.Facilities);
    const allDevices = Facilities?.flatMap(facility => facility.Devices || []) || [];
    const [devices, setDevices] = useState(allDevices);
    const [selectedFacility, setSelectedFacility] = useState(0);

    useEffect(() => {
        if (selectedFacility === 0) {
            setDevices(allDevices);
        } else {
            fetchData<FilterDevices>(
                { apiName: "login", url: `/api/v1/filterFacility/${selectedFacility}`, method: "GET", auth: { tokenName: TOKEN_NAME } },
                {
                    onSuccess: (result) => setDevices(result.Devices),
                    onForbiddenError: () => { },
                    onNotFoundError: () => { },
                    onServerError: () => { },
                    onUnexpectedError: () => { },
                    onUserError: () => { },
                    onUnauthorizedError: () => { },
                }
            );
        }
    }, [selectedFacility, Facilities]);

    const handleFilterChange = (facilityId: number) => {
        setSelectedFacility(facilityId);
    };




    return (
        <section>
            <SEO title="FiteMetrics - Devices" />
            <PagesHeader title="Devices" icon={TabletIcon}>
                <div className="flex flex-row mr-8 items-center justify-center gap-2">
                    <CustomDropdown
                        getValue={handleFilterChange}
                        id="Filter Dropdown"
                        defaultOption={{ Name: "All", Id: 0 }}
                        name="Filter Dropdown"
                        options={Facilities}
                        bgColor="primary"
                        textColor="text"
                    />
                    <DeviceModal />
                </div>
            </PagesHeader>
            <div className="px-2 py-4">
                {allDevices.length === 0
                    ? <NoItemsFound title="Devices" buttonLabel="Create" />
                    : (
                        <div
                            className="grid md:grid-cols-4 gap-4  transition-all duration-300"

                        >
                            {devices.map((device) => (

                                <DeviceCard
                                    id={device.Id}
                                    uuidname={device.UuidName}
                                    facilityName={device.FacilityName}
                                    isActive={device.IsActive}
                                    facilityId={device.FacilityId}
                                    name={device.Name}
                                    filterId={selectedFacility}

                                />

                            ))}
                        </div>
                    )
                }
            </div>
        </section>
    );
}