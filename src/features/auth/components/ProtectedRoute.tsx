// src/features/auth/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores/auth';
import { useUser } from '@/shared/hooks/useUser'; // 👈 Import the new hook

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthStore();
    const { isLoading } = useUser(); // 👈 Use the hook to get the loading state

    // While we're verifying the token by fetching the user, show a loader
    if (isLoading) {
        return <div>Loading...</div>; // Or a full-page spinner
    }

    // If not loading and not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    // If authenticated, render the protected layout and its children
    return <Outlet />;
};