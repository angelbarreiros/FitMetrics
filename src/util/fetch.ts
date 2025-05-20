import type { FetchParams, FetchResponse, ResponseActions } from '../types/fetchTypes';
const apis: { [key: string]: string } = {
    login: import.meta.env.VITE_LOGIN_URL as string
};



const fetcher = async <T>({ apiName, method, url, body, auth }: FetchParams): Promise<FetchResponse<T>> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (auth) {
        const token = localStorage.getItem(auth.tokenName);
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(`${apis[apiName]}${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();
        return {
            status: response.status,
            data,
        };
    } catch (error) {
        const data: any = null
        return {
            status: 500,
            data
        };
    }
};


export const fetchData = async <T>(params: FetchParams): Promise<FetchResponse<T>> => {
    const result = await fetcher<T>(params);
    return result;
};



export const responseSelector = ({ status, onSuccess, onForbiddenError, onNotFoundError, onServerError, onUnexpectedError, onUserError }: ResponseActions) => {
    switch (status) {
        case 200:
            onSuccess();
            break;
        case 403:
            onForbiddenError();
            break;
        case 404:
            onNotFoundError();
            break;
        case 500:
            onServerError();
            break;
        case 400:
            onUserError();
            break;
        default:
            onUnexpectedError();
    }

}
