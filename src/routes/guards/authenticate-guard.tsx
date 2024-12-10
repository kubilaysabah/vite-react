import { Navigate, Outlet } from 'react-router-dom';
import pageRoutes from '@constant/page-routes';

export default function AuthenticateGuard() {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
        return <Navigate to={pageRoutes.auth.login} replace />; // Redirect to login page if not authenticated
    }

    return <Outlet />; // Render children components (protected pageRoutes)
}
