import { ChevronLeftIcon, LucideMessageCircleQuestion } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TOKEN_NAME } from "../../../../../auth/Auth";
import QuestionCard from "../../../../../components/pages/questions/questionCard";
import { FullScreenLoader } from "../../../../../components/shared/FullScreenLoader";
import PagesHeader from "../../../../../components/shared/PageHeader";
import { SEO } from "../../../../../components/shared/SEO";
import { SimpleAdder } from "../../../../../components/shared/SimpleAdder";
import userStore from "../../../../../stores/userStore";
import type { QuestionResponse, RatingQuestionsResponse } from "../../../../../types/responsesTypes";
import { fetchData } from "../../../../../util/fetch";
import NotFoundPage from "../../../../404";


export const DeviceQuestions = () => {
    const selectedRating = userStore(state => state.user.selectedRating);
    const { setSelectedRating, addQuestion } = userStore(state => state.selectedRatingActions);
    const { deviceId, ratingId } = useParams();
    const [error, setError] = useState<string | null>(null);
    const [addError, setAddError] = useState("");
    const handleAddQuestion = (question: string) => {
        const body = {
            QuestionString: question,
            RatingId: Number(ratingId),
            Weight: 5,
        }
        fetchData<QuestionResponse>(

            { apiName: "login", method: "POST", url: `/api/v1/addQuestion/${deviceId}`, body: body, auth: { tokenName: TOKEN_NAME } },
            {
                onSuccess: (result) => {
                    addQuestion(result);

                },
                onForbiddenError: () => { setAddError("Forbidden"); },
                onNotFoundError: () => { setAddError("Not found"); },
                onServerError: () => { setAddError("Server error"); },
                onUnexpectedError: () => { setAddError("Unexpected error"); },
                onUserError: (result) => { setAddError(result.message); },
                onUnauthorizedError: () => { setAddError("Unauthorized"); },
            }
        );


    }
    useEffect(() => {

        const body = {
            RatingId: Number(ratingId),
        }
        fetchData<RatingQuestionsResponse>(

            { apiName: "login", method: "POST", url: `/api/v1/getQuestions/${deviceId}`, body: body, auth: { tokenName: TOKEN_NAME } },
            {
                onSuccess: (result) => {
                    setSelectedRating(result);

                },
                onForbiddenError: () => { setError("Forbidden"); },
                onNotFoundError: () => { setError("Not found"); },
                onServerError: () => { setError("Server error"); },
                onUnexpectedError: () => { setError("Unexpected error"); },
                onUserError: () => { setError("User error"); },
                onUnauthorizedError: () => { setError("Unauthorized"); },
            }
        );
    }, [deviceId, ratingId]);
    if (!deviceId || isNaN(Number(deviceId)) || Number(deviceId) <= 0) {
        return <NotFoundPage />;
    }
    if (!ratingId || isNaN(Number(ratingId)) || Number(ratingId) <= 0) {
        return <NotFoundPage />;
    }
    if (error) {
        return <NotFoundPage />;
    }

    if (selectedRating.Name === "") {
        return <FullScreenLoader />;
    }

    return (
        <section>
            <SEO title="FitMetrics - DeviceQuestions" />
            <PagesHeader
                beforeChildren={
                    <Link to={`/devices/deviceInfo/${deviceId}`} className="p-2 rounded-full hover:bg-secundary/50 transition-colors">
                        <ChevronLeftIcon className="w-6 h-6 text-text" />
                    </Link>}
                title="Device Info"
                icon={LucideMessageCircleQuestion} >
                <div className="mr-8 ">
                    <SimpleAdder onAdd={handleAddQuestion} error={addError} placeholder="Question Phrase"></SimpleAdder>
                </div>
            </PagesHeader>
            <div className="px-2 py-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedRating.Questions.map((question) => (
                    <QuestionCard
                        deviceId={Number(deviceId)}
                        ratingId={Number(ratingId)}
                        key={question.Id}
                        question={question}
                        visible={question.IsVisible}
                    />
                ))}

            </div>
        </section>
    );
};

export default DeviceQuestions;