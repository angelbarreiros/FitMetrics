type DeviceIds = {
    id: number;
    name: string;
    uuidName: string;
    isActive: boolean;
    facilityId?: number;
    facilityName: string;
    googleLink: string;
}
export type UserInfo = {
    id: number;
    name: string;
    email: string;
    hasUnreadNotifications: boolean;
    sendMonthlyEmail: boolean;
    alertLanguage: string;
    devices: DeviceIds[];
}
export type LoginResponse = {
    token: string;
    UserInfo: UserInfo
    message: string;
}
