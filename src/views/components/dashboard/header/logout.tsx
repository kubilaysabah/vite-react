import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { useLogout } from '@api/hooks/useAuth.ts';

export default function Logout() {
    const { mutate, isPending } = useLogout();
    const navigate = useNavigate();

    const logout = useCallback(() => {
        mutate();
        navigate('/login', { replace: true });
    }, [mutate, navigate]);

    return (
        <LoadingButton
            color={'secondary'}
            variant={'contained'}
            loading={isPending}
            sx={{
                marginLeft: 'auto',
                display: 'block'
            }}
            onClick={logout}
        >
            {'Çıkış Yap'}
        </LoadingButton>
    );
}
