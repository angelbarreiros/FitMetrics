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


export const fetchData = async <T>(params: FetchParams, actions: ResponseActions<T>) => {
    const response = await fetcher<T>(params);
    switch (response.status) {
        case 200:
            actions.onSuccess(response.data);
            break;
        case 401:
            actions.onUnauthorizedError(response.data);
            break;
        case 403:
            actions.onForbiddenError(response.data);
            break;
        case 404:
            actions.onNotFoundError(response.data);
            break;
        case 500:
            actions.onServerError(response.data);
            break;
        case 400:
            actions.onUserError(response.data);
            break;
        default:
            actions.onUnexpectedError(response.data);
    }
    return



};



