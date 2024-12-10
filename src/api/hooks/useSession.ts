import { jwtDecode } from 'jwt-decode';
import type { Session } from '~types/auth';

export default function useSession(): Session | null {
    const token = sessionStorage.getItem('accessToken');

    if(token) {
        return jwtDecode(token);
    }

    return null;
}
