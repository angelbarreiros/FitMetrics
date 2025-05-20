import { create } from "zustand";
import { devtools } from "zustand/middleware/devtools";
export type AlertInfo = {
    title: string;
    description: string;
}
export type AlertState = {
    alerts: AlertInfo[];
    addAlerts: (alerts: AlertInfo[]) => void;
}

export const alertStore = create<AlertState>()(
    devtools((set) => ({
        alerts: [],
        addAlerts: (alerts: AlertInfo[]) =>
            set(
                (state) => ({
                    alerts: [...state.alerts, ...alerts],
                }),
                false,
                'addAlerts'
            ),
    }))
);