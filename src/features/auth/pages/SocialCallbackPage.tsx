import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores/auth';
import { userService } from '@/shared/services/user';

export const SocialCallback = () => {
    const navigate = useNavigate();
    const { setToken, setUser, logout } = useAuthStore();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        const token = params.get('token');

        // If backend indicated an error, bail out to login (optionally show message)
        if (error) {
            logout();
            navigate(`/auth/login?error=${encodeURIComponent(error)}`);
            return;
        }

        if (!token) {
            navigate('/auth/login');
            return;
        }

        setToken(token);
        userService.get_user()
            .then(res => {
                if (res.data.success && res.data.data) {
                    setUser(res.data.data);
                    navigate('/generator');
                } else {
                    logout();
                    navigate('/auth/login');
                }
            })
            .catch(() => {
                logout();
                navigate('/auth/login');
            });
    }, [navigate, setToken, setUser, logout]);

    return <div>Signing you in...</div>;
};
