import axios, { type AxiosError, type AxiosResponse, type AxiosRequestConfig, type AxiosInstance } from 'axios';

export function serializeParams(params?: { [key: string]: string | number | boolean | null | undefined }) {
    if(!params) {
        return;
    }

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (typeof value === "string") {
            searchParams.append(key, value);
        }

        if(typeof value === "number" && !isNaN(value)) {
            searchParams.append(key, value.toString());
        }

        if(typeof value === "boolean") {
            searchParams.append(key, value.toString());
        }
    }

    return searchParams.toString();
}

export async function createInstance(): Promise<AxiosInstance> {
    const instance = axios.create();
    const token = () => sessionStorage.getItem('accessToken');

    instance.interceptors.request.use(
      (config) => {
          config.headers['Authorization'] = `Bearer ${token()}`;
          return config;
      },
      (error) => {
          // Handle the request error
          return Promise.reject(error);
      }
    );

    return instance;
}

export async function request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T, AxiosError>> {
    const instance = await createInstance();
    return instance<T>(config);
}