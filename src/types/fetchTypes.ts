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
export interface ResponseActions<T> {
    onSuccess: (result: T) => void;
    onUserError: (result: T) => void;
    onServerError: (result: T) => void;
    onUnexpectedError: (result: T) => void;
    onForbiddenError: (result: T) => void;
    onUnauthorizedError: (result: T) => void;
    onNotFoundError: (result: T) => void;
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



