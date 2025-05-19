import type { LucideIcon } from "lucide-react";
import { HelpCircle, CircleUserRound, LogOut } from "lucide-react";

export type FooterNavItem = {
    path: string;
    icon: LucideIcon;
    label: string;
    mobileLabel?: string;
    mobileShow?: boolean;
    onClick?: () => void;
    iconClass?: string;
    rbac?: string[];
};

export type GetFooterNavItemsParams = {
    logout: () => void;
};
export function getFooterNavItems({ logout }: GetFooterNavItemsParams): FooterNavItem[] {
    return [
        {
            path: "/help",
            icon: HelpCircle,
            label: "Help",
        },
        {
            path: "/account",
            icon: CircleUserRound,
            label: "Account",
        },
        {
            path: "/login",
            icon: LogOut,
            label: "Logout",
            onClick: logout,
            iconClass: "w-6 h-6 mr-3 flex-shrink-0",
        },
    ];
}