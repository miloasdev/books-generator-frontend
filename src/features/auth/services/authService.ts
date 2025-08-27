import type { RegisterFormValues, LoginFormValues } from '../lib/schemas';
import type { RegisterResponse, LoginResponse } from '@/shared/types/auth';
import { api } from '@/shared/services/api';

export const authService = {
    register: (values: RegisterFormValues) =>
        api.post<RegisterResponse>('/auth/register', values),

    login: (values: LoginFormValues) => {
        const formData = new FormData();
        formData.set('username', values.email);
        formData.set('password', values.password);

        return api.post<LoginResponse>('/auth/token', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
