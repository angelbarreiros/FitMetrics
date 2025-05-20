type auth = {
    tokenName: string;
}
export interface FetchParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    apiName: string
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
    onNotFoundError: (result: T) => void;
}



