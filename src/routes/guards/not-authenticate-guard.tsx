import { Navigate, Outlet } from 'react-router-dom';

export default function NotAuthenticateGuard() {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (accessToken || refreshToken) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
