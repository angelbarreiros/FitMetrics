import { create } from "zustand";
import { devtools } from "zustand/middleware/devtools";

export const analyticsStore = create<null>()(devtools((set) => ({

})))