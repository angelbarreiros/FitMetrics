import { Bell, BellDotIcon, Calendar, ChartNoAxesCombined, FileText, MapPin, MessageSquare, TabletIcon, type LucideIcon } from "lucide-react";

export type SideNavItem = {
    path: string;
    icon: LucideIcon;
    label: string;
    mobileLabel?: string;
    mobileShow?: boolean;
    onClick?: () => void;
    iconClass?: string;
    rbac?: string[];
};

export type GetSideNavItemsParams = {
    hasNotifications: boolean;
    markAsRead: () => void;
};

export function getNavItems({ hasNotifications, markAsRead }: GetSideNavItemsParams): SideNavItem[] {
    return [
        { path: "/facilities", icon: MapPin, label: "Facilities" },
        { path: "/devices", icon: TabletIcon, label: "Devices" },
        {
            path: "/userFeedback",
            icon: MessageSquare,
            label: "User Feedback",
            mobileLabel: "Feedback",

        },
        {
            path: "/alerts",
            icon: hasNotifications ? BellDotIcon : Bell,
            label: "Alerts",
            onClick: markAsRead,
            iconClass: hasNotifications ? "text-primary/50" : "",

        },
        {
            path: "/calendar",
            icon: Calendar,
            label: "Events",
            mobileLabel: "Events",
        },
        {
            path: "/analytics",
            icon: ChartNoAxesCombined,
            label: "Analytics",
            mobileShow: false,
        },
        {
            path: "/agents",
            icon: FileText,
            label: "Agents",
            mobileLabel: "Documents",
        },
    ];
}
