// src/features/auth/hooks/useAuthMutations.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores/auth';
import { authService } from '../services/authService';
import { userService } from '@/shared/services/user';
import { useToast } from '@/shared/hooks/use-toast';
import { getErrorMessage } from '@/shared/lib';

export const useAuthMutations = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { setToken, setUser, logout } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: async (response) => {
            const { data } = response;
            if (!data.success || !data.data) {
                throw new Error(data.error?.message || 'Invalid response');
            }
            setToken(data.data.access_token);

            // Fetch user info after setting token
            const userRes = await userService.get_user();
            if (!userRes.data.success || !userRes.data.data) {
                logout();
                throw new Error('Could not load user profile.');
            }
            setUser(userRes.data.data);

            toast({ title: 'Login Successful', description: data.message });
            navigate('/generator');
        },
        onError: (error) => {
            toast({ variant: 'destructive', title: 'Login Failed', description: getErrorMessage(error) });
        },
    });

    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: (response) => {
            const { data } = response;
            if (!data.success || !data.data) {
                throw new Error(data.error?.message || 'Unknown error');
            }
            toast({
                title: 'Registration Success',
                description: `${data.message?.split(".")[0]} for ${data.data.email}`,
            });
            navigate('/auth/login');
        },
        onError: (error) => {
            toast({
                title: 'Registration Failed',
                description: getErrorMessage(error),
                variant: 'destructive',
            });
        },
    });

    return {
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
    };
};