import type { QuestionResponse, RatingQuestionsResponse } from "../../types/responsesTypes";
import type { AppState } from "../userStore";
export type QuestionEdit = {
    QuestionId: number;
    RatingId: number;
    Phrase: string;
    Weight: number;


}
export interface SelectedRatingActions {
    setSelectedRating: (device: RatingQuestionsResponse) => void;
    editQuestion: (question: QuestionEdit) => void;
    deleteQuestion: (questionId: number) => void;
    addQuestion: (question: QuestionResponse) => void;
    toggleQuestionVisibility: (questionId: number) => void;
}
export function createSelectedRatingActions(
    set: (fn: (state: AppState) => Partial<AppState>, replace?: false | undefined, actionName?: string) => void
): SelectedRatingActions {
    return (
        {
            setSelectedRating: (device) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        selectedRating: device
                    }
                }), false, 'selectedRating/setSelectedRating'),

            editQuestion: (question) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        selectedRating: {
                            ...state.user.selectedRating,
                            Questions: state.user.selectedRating.Questions.map(q => q.Id === question.QuestionId ? {
                                ...q,
                                Phrase: question.Phrase,
                                Weight: question.Weight
                            } : q)
                        }
                    }
                }), false, 'selectedRating/editQuestion'),

            deleteQuestion: (questionId) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        selectedRating: {
                            ...state.user.selectedRating,
                            Questions: state.user.selectedRating.Questions.filter(q => q.Id !== questionId)
                        }
                    }
                }), false, 'selectedRating/deleteQuestion'),

            addQuestion: (question) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        selectedRating: {
                            ...state.user.selectedRating,
                            Questions: [...state.user.selectedRating.Questions, question]
                        }
                    }
                }), false, 'selectedRating/addQuestion'),
            toggleQuestionVisibility: (questionId) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        selectedRating: {
                            ...state.user.selectedRating,
                            Questions: state.user.selectedRating.Questions.map(q => q.Id === questionId ? { ...q, IsVisible: !q.IsVisible } : q)
                        }
                    }
                }), false, 'selectedRating/toggleQuestionVisibility')
        }
    )

}