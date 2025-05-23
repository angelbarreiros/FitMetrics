import type { DeviceInfoResponse, RatingQuestionsResponse, UserInfo } from "../types/responsesTypes";

export const UserInfoInitialState: UserInfo = {
    Name: "",
    Email: "",
    HasUnreadNotifications: false,
    SendMonthlyEmail: false,
    AlertLanguage: "",
    Facilities: []
}
export const SelectedDeviceInitialState: DeviceInfoResponse = {
    Id: 0,
    Name: "",
    UuidName: "",
    IsActive: false,
    R1Id: 0,
    R2Id: 0,
    R3Id: 0,
    R4Id: 0
}
export const SelectedRatingInitialState: RatingQuestionsResponse = {
    Questions: [],
    Name: "",
    message: ""
}