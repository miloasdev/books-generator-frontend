import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores/auth';
import { userService } from '@/shared/services/user';
import * as React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { token, user, setUser, logout } = useAuthStore();
    const navigate = useNavigate();
    const [checking, setChecking] = React.useState(true);

    React.useEffect(() => {
        const fetchUser = async () => {
            // Only fetch if we have a token but no user loaded yet
            if (token && !user) {
                try {
                    const res = await userService.get_user();
                    if (!res.data.success || !res.data.data) throw new Error();
                    setUser(res.data.data);
                } catch {
                    logout();
                    navigate('/auth/login', { replace: true });
                }
            }
            setChecking(false);
        };
        fetchUser();
    }, [token, user, setUser, logout, navigate]);

    // Optional: prevent flashing children until we know the auth state
    if (checking) {
        return <div>Loading...</div>; // replace with spinner/skeleton
    }

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
};
