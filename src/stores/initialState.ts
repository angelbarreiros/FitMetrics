import type { UserInfo } from "../types/responsesTypes";

export const UserInfoInitialState: UserInfo = {
    Name: "",
    Email: "",
    HasUnreadNotifications: false,
    SendMonthlyEmail: false,
    AlertLanguage: "",
    Facilities: []
}