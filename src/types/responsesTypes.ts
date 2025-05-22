export type UserInfo = {
    Name: string;
    Email: string;
    HasUnreadNotifications: boolean;
    SendMonthlyEmail: boolean;
    AlertLanguage: string;
    Facilities: FacilitiesDto[];
}
export type FacilitiesDto = {
    Id: number;
    Name: string;
    GoogleLink: string;
    PhoneNumber: string;
    DesireDailyClicks: number;
    HideGoogleOnBadRating: boolean;
    ShowQrOnQuestions: boolean;
    Devices: DeviceDto[];
}
export type DeviceDto = {
    Id: number;
    Name: string;
    UuidName: string;
    IsActive: boolean;
};

export type LoginResponse = {
    Token: string;
    UserInfo: UserInfo
    message: string;
}

export type EditAccountResponse = {
    Id: number;
    Name: string;
    Email: string;
    SendMonthlyEmail: boolean;
    message: string;
}
export type AddFacilityResponse = {
    Id: number;
    Name: string;
    GoogleLink: string;
    PhoneNumber: string;
    Devices: any[];

    Message: string;
}
export type AddDeviceResponse = {
    Id: number;
    Name: string;
    UuidName: string;
    Message: string;
}
export type FilterDevices = {
    Devices: DeviceDto[]
}
