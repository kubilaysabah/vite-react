import { jwtDecode } from 'jwt-decode';
import type { Session } from '~types/auth';

export function getSession(): Session | null {
    const token = sessionStorage.getItem('accessToken');
    
    if (token) {
        return jwtDecode<Session>(token);
    }

    return null;
}
