import type { FetchParams, FetchResponse } from '../types/fetchTypes';
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
};


export const fetchData = async <T>(params: FetchParams): Promise<FetchResponse<T>> => {
    const result = await fetcher<T>(params);
    return result;
};
