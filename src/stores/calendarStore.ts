import { create } from "zustand";
import { devtools } from "zustand/middleware/devtools";

export const calendarStore = create<null>()(devtools((set) => ({

})))