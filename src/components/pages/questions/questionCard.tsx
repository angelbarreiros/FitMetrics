import {
    AlertTriangle,
    Ban,
    CircleCheck,
    Eye,
    EyeOff,
    Pencil,
    Trash2
} from "lucide-react";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { TOKEN_NAME } from "../../../auth/Auth";
import userStore from "../../../stores/userStore";
import { fetchData } from "../../../util/fetch";

interface Question {
    Id: number;
    Phrase: string;
    Weight: number;
};

type QuestionCardProps = {
    ratingId: number;
    deviceId: number;
    question: Question;
    visible: boolean;
};

const QuestionCard = ({ ratingId, deviceId, question, visible }: QuestionCardProps) => {
    const { deleteQuestion, editQuestion, toggleQuestionVisibility } = userStore(state => state.selectedRatingActions);
    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isVisible, setIsVisible] = useState(visible);
    const [phraseEdited, setPhraseEdited] = useState(question.Phrase);
    const [weight, setWeight] = useState<number | string>(question.Weight);
    const [formError, setFormError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);

    const handleEdit = (e?: FormEvent) => {
        setFormError("")
        if (e) e.preventDefault();

        if (
            typeof weight !== "number" &&
            (weight === "" || isNaN(Number(weight)))
        ) {
            setFormError("Weight must be a number between 1 and 10.");
            return;
        }

        const weightNumber = Number(weight);
        if (weightNumber < 1 || weightNumber > 10) {
            setFormError("Weight must be between 1 and 10.");
            return;
        }

        const body = {
            QuestionId: question.Id,
            RatingId: ratingId,
            Weight: weightNumber,
            Phrase: phraseEdited,
        };
        fetchData(
            { apiName: "login", method: "PUT", url: `/api/v1/editQuestion/${deviceId}`, body: body, auth: { tokenName: TOKEN_NAME } },
            {
                onSuccess: () => {
                    editQuestion(body);
                    setEditing(false);
                },
                onForbiddenError: () => { setFormError("Forbidden"); },
                onNotFoundError: () => { setFormError("Not found"); },
                onServerError: () => { setFormError("Server error"); },
                onUnexpectedError: () => { setFormError("Unexpected error"); },
                onUserError: () => { setFormError("User error"); },
                onUnauthorizedError: () => { setFormError("Unauthorized"); },
            }
        );
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleEdit();
        }
    };

    const handleCancelEdit = () => {
        setPhraseEdited(question.Phrase);
        setWeight(question.Weight);
        setFormError(null);
        setEditing(false);
    };

    const handleChangeVisibility = () => {
        const body = {
            QuestionId: question.Id,
            RatingId: ratingId,
        };
        fetchData(
            { apiName: "login", method: "PUT", url: `/api/v1/changeVisibility/${deviceId}`, body: body, auth: { tokenName: TOKEN_NAME } },
            {
                onSuccess: () => {
                    toggleQuestionVisibility(question.Id);
                    setIsVisible(!isVisible);
                },
                onForbiddenError: () => { setFormError("Forbidden"); },
                onNotFoundError: () => { setFormError("Not found"); },
                onServerError: () => { setFormError("Server error"); },
                onUnexpectedError: () => { setFormError("Unexpected error"); },
                onUserError: () => { setFormError("User error"); },
                onUnauthorizedError: () => { setFormError("Unauthorized"); },
            }
        );
    };

    const handleDelete = () => {
        const body = {
            QuestionId: question.Id,
            RatingId: ratingId,
        };

        fetchData(
            { apiName: "login", method: "POST", url: `/api/v1/deleteQuestion/${deviceId}`, body: body, auth: { tokenName: TOKEN_NAME } },
            {
                onSuccess: () => {
                    deleteQuestion(question.Id);
                    setDeleting(false);
                },
                onForbiddenError: () => { setFormError("Forbidden"); },
                onNotFoundError: () => { setFormError("Not found"); },
                onServerError: () => { setFormError("Server error"); },
                onUnexpectedError: () => { setFormError("Unexpected error"); },
                onUserError: () => { setFormError("User error"); },
                onUnauthorizedError: () => { setFormError("Unauthorized"); },
            }
        );
    };

    return (
        <div
            className={`bg-white rounded-lg p-6 border-l-4 ${isVisible ? "border-l-blue-600" : "border-l-gray-300"
                } shadow-md hover:shadow-lg transition-all duration-300 mb-5`}
        >
            {isEditing ? (
                <form onSubmit={handleEdit} className="w-full">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phrase
                            </label>
                            <input
                                ref={inputRef}
                                onChange={(e) => setPhraseEdited(e.target.value)}
                                value={phraseEdited}
                                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                                type="text"
                                onKeyDown={handleInputKeyDown}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (1-10)
                            </label>
                            <input
                                ref={weightRef}
                                onChange={(e) => setWeight(e.target.value)}
                                value={weight}
                                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                                type="number"
                                min={1}
                                max={10}
                                onKeyDown={handleInputKeyDown}
                            />
                        </div>

                        {formError && (
                            <div className="flex items-center text-red-500 bg-red-50 p-3 rounded-md">
                                <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="text-sm">{formError}</span>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3 pt-2">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="flex justify-between">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 break-words">
                            {phraseEdited}
                        </h2>
                        <div className="flex items-center flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                Weight: {weight}
                            </span>
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${isVisible
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {isVisible ? "Visible" : "Hidden"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start ml-4 space-x-1">
                        {isDeleting ? (
                            <div className="flex items-center space-x-2 p-2 rounded-md">
                                <button
                                    onClick={handleDelete}
                                    className="p-1.5 rounded-full hover:bg-red-100"
                                    title="Confirm"
                                >
                                    <CircleCheck className="h-5 w-5 text-red-600" />
                                </button>
                                <button
                                    onClick={() => setDeleting(false)}
                                    className="p-1.5 rounded-full hover:bg-gray-200"
                                    title="Cancel"
                                >
                                    <Ban className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => {
                                        setEditing(true);
                                        setTimeout(() => inputRef.current?.focus(), 0);
                                    }}
                                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                    title="Edit"
                                >
                                    <Pencil className="h-5 w-5 text-blue-600" />
                                </button>
                                <button
                                    onClick={() => setDeleting(true)}
                                    className="p-1.5 rounded-full hover:bg-red-100 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="h-5 w-5 text-red-500" />
                                </button>
                                <button
                                    onClick={handleChangeVisibility}
                                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                    title={isVisible ? "Hide" : "Show"}
                                >
                                    {isVisible ? (
                                        <Eye className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;
