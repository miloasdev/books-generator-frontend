// src/shared/hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/shared/services/user';
import { useAuthStore } from '@/shared/stores/auth';
import { useEffect } from 'react';

export const useUser = () => {
    const { token, setUser, logout } = useAuthStore();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['currentUser'], // Unique key for the user query
        queryFn: async () => {
            const { data } = await userService.get_user();
            if (!data.success || !data.data) {
                throw new Error('Failed to fetch user');
            }
            return data.data;
        },
        enabled: !!token, // Only run this query if the token exists
        retry: 1, // Only try to fetch the user once if it fails
        staleTime: Infinity, // Keep the user data fresh until logout
    });

    // Sync the fetched user data with the Zustand store
    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    // If the query fails (e.g., token is invalid), log the user out
    useEffect(() => {
        if (isError) {
            logout();
        }
    }, [isError, logout]);


    return { user, isLoading };
};