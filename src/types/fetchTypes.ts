type auth = {
    tokenName: string;
}
export interface FetchParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    apiName: 'login' | 'customRating'
    url: string;
    body?: any;
    auth?: auth;

}
export type FetchError = {
    message: string;

}
export interface FetchResponse<T> {
    status: number;
    data: T;
}


export type EditAccount = {
    Name: string;
    Email: string;
    OldPwd: string;
    NewPwd: string;

}
export type EditFacility = {
    Id: number
    Name: string;
    GoogleLink: string;
    PhoneNumber: string;
}
export type EditDeviceDto = {

    Name: string
    FacilityId: number
}



