import { request } from '@utils/request';
import ApiRoutes from '@constant/api-routes';
import type { RegisterParams, RegisterResponse, LoginResponse } from '~types/auth';

export async function register(user: RegisterParams): Promise<RegisterResponse> {
    const response = await request<RegisterResponse>({
        url: ApiRoutes.auth.register,
        method: 'POST',
        data: {
            ...user,
            credit: 0
        }
    });

    return response.data;
}

export async function login(body: { email: string, password: string }): Promise<LoginResponse> {
    const response = await request<LoginResponse>({
        url: ApiRoutes.auth.login,
        data: body,
        method: 'POST',
    });

    return response.data;
}

export const logout = (): Promise<void> => {
    return new Promise((resolve) => {
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('User_Id');

        resolve();
    });
};

export const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (!refreshToken) {
        throw new Error('Yenileme tokeni bulunamadı, lütfen giriş yapın.');
    }
};
