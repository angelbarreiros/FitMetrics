import { create } from "zustand";
import { devtools } from "zustand/middleware/devtools";

export const userFeedbackStore = create<null>()(devtools((set) => ({

})))