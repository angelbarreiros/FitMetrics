import { MapPin } from "lucide-react";
import { useCallback, useState } from "react";
import { TOKEN_NAME } from "../../auth/Auth";
import FacilityRow from "../../components/pages/facilities/facilityRow";
import { SEO } from "../../components/shared/SEO";
import NoItemsFound from "../../components/shared/NoItemsFound";
import PagesHeader from "../../components/shared/PageHeader";
import { SimpleAdder } from "../../components/shared/SimpleAdder";
import { userStore } from "../../stores/userStore";
import type { AddFacilityResponse } from "../../types/responsesTypes";
import { fetchData } from "../../util/fetch";
export const FacilitiesPage = () => {
    const facilities = userStore(state => state.user.userInfo.Facilities)
    const { addFacility } = userStore(state => state.facilityActions);
    const { logout } = userStore(state => state.userActions);
    const [addError, setAddError] = useState("");
    const handleAddFacility = useCallback(async (name: string) => {
        setAddError("");
        if (facilities.some(facility => facility.Name === name.trim())) {
            setAddError("Facility already exists");
            setTimeout(() => setAddError(""), 2000);
            return;
        }
        if (!name.trim()) {
            setAddError("Name cannot be empty");
            return;
        }
        const body = {
            Name: name
        }
        fetchData<AddFacilityResponse>(
            { apiName: "login", url: "/api/v1/createFacility", method: "POST", body: body, auth: { tokenName: TOKEN_NAME } },
            {
                onForbiddenError: () => { logout() },
                onNotFoundError: () => { logout() },
                onServerError: () => { setAddError("Server error"); },
                onSuccess: (result) => { console.log(result); addFacility(result); },
                onUserError: (result) => {
                    setAddError(result.message);
                },
                onUnauthorizedError: (result) => { setAddError(result.message); },
                onUnexpectedError: (result) => { setAddError(result.message); },
            })
    }, [addFacility, logout]);

    return (
        <section>
            <SEO title="FitMetrics - Facilities" ></SEO>
            <PagesHeader title="Facilities of" icon={MapPin}>
                <div className="mr-8">
                    <SimpleAdder onAdd={handleAddFacility} error={addError} placeholder="Facility Name"></SimpleAdder>
                </div>
            </PagesHeader>
            <div className="px-2 py-4">
                <div className="hidden md:grid  grid-cols-10 text-text-secundar/50 pb-2  border-b border-borderLine ">
                    <div className="col-span-2 text-center">
                        Name
                    </div>
                    <div className="col-span-2 text-center">
                        Google Link
                    </div>
                    <div className="col-span-2 text-center">
                        WhatsApp Phone
                    </div>

                    <div className="col-span-3 text-center mr-20">
                        Devices
                    </div>
                    <div className="col-span-1 text-right"></div>

                </div>
                {facilities.length === 0
                    ? <NoItemsFound title="Facilities" buttonLabel="Add" />
                    : facilities.map((facility) => (
                        <div
                            key={facility.Id}
                            className="m-3 bg-secundary/50 rounded-default hover:shadow-xl transition-shadow duration-300"
                        >
                            <FacilityRow
                                Id={facility.Id}
                                Name={facility.Name}
                                GoogleLink={facility.GoogleLink}
                                PhoneNumber={facility.PhoneNumber}
                                Devices={facility.Devices}
                                ShowQrOnQuestions={facility.ShowQrOnQuestions}
                                HideGoogleOnBadRating={facility.HideGoogleOnBadRating}
                                DesireDailyClicks={facility.DesireDailyClicks}

                            />
                        </div>
                    ))
                }

            </div>





        </section>



    );
}
export default FacilitiesPage;
