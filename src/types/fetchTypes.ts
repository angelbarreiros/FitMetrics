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
export interface ResponseActions {
    status: number;
    onSuccess: () => void;
    onUserError: () => void;
    onServerError: () => void;
    onUnexpectedError: () => void;
    onForbiddenError: () => void;
    onNotFoundError: () => void;
}



