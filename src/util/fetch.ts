import type { FetchParams, FetchResponse } from '../types/fetchTypes';
const apis: { [key: string]: string } = {
    login: import.meta.env.VITE_LOGIN_URL as string
};



const fetcher = async <T>({ apiName, method, url, body }: FetchParams): Promise<FetchResponse<T>> => {
    const response = await fetch(`${apis[apiName]}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
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
