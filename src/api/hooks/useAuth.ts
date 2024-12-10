import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login, register, logout } from '@services/auth.service';
import { useMessageStore } from '@state/toast.state';
import pageRoutes from '@constant/page-routes';
import type { LoginParams, LoginResponse, RegisterResponse, RegisterParams } from '~types/auth'

export const useLogin = () => {
    const navigate = useNavigate();
    const showMessage = useMessageStore((state) => state.showMessage);

    return useMutation<LoginResponse, AxiosError<{ statusCode?: number }>, LoginParams>({
        mutationFn: login,
        onSuccess: (data) => {
            sessionStorage.setItem('refreshToken', data.refreshToken);
            sessionStorage.setItem('accessToken', data.accessToken);
            navigate(pageRoutes.dashboard, { replace: true });
        },
        onError: (error) => {
            if (error?.response?.data?.statusCode === 401) {
                showMessage({
                    message: 'Kullanıcı adı veya şifre hatalı',
                    status: 'error'
                });
                return;
            }

            if (error?.response?.data?.statusCode === 403) {
                showMessage({
                    message: 'Hesabınız aktif değil',
                    status: 'error'
                });

                return;
            }

            showMessage({
                message: 'Giriş yapılırken bir hata oluştu',
                status: 'error'
            });
        }
    });
};

export const useRegister = () => {
    const navigate = useNavigate();
    const showMessage = useMessageStore((state) => state.showMessage);

    return useMutation<RegisterResponse, AxiosError<{ statusCode?: number; }>, RegisterParams>({
        mutationFn: (params: RegisterParams) => register(params),
        onSuccess: (data) => {
            sessionStorage.setItem('refreshToken', data.refreshToken);
            sessionStorage.setItem('accessToken', data.accessToken);
            navigate(pageRoutes.dashboard, { replace: true });
        },
        onError: (error) => {
            if (error?.response?.data?.statusCode === 403) {
                showMessage({
                    message: 'Kayıt işlemi başarılı hesabınızın aktif edilmesini bekleyin.',
                    status: 'success'
                });

                navigate(pageRoutes.home, { replace: true });

                return;
            }

            showMessage({
                message: 'Giriş yapılırken bir hata oluştu',
                status: 'error'
            });
        }
    });
};

export const useLogout = () => {
    return useMutation({
        mutationFn: logout
    });
};
