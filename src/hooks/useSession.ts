import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { Session } from '~types/auth.ts';

const useSession = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');

        if (token) {
            setSession(jwtDecode<Session>(token))
        }
    }, []);

    return session;
};

export default useSession;
