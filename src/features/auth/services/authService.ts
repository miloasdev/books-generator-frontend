import { api } from '@/shared/services/api';
import type { RegisterFormValues, LoginFormValues } from '../lib/schemas';

interface LoginResponse {
    access_token: string;
    token_type: string;
}

const USE_MOCK_AUTH = true;

export const authService = {
    register: async (values: RegisterFormValues) => {
        if (USE_MOCK_AUTH) {
            await new Promise((r) => setTimeout(r, 500));
            return { message: 'Mocked registration successful' };
        }

        return api.post('/auth/register', values);
    },

    login: async (values: LoginFormValues): Promise<LoginResponse> => {
        if (USE_MOCK_AUTH) {
            await new Promise((r) => setTimeout(r, 500));
            return {
                access_token: 'mocked-access-token',
                token_type: 'Bearer'
            };
        }

        const response = await api.post<LoginResponse>('/auth/login', values);
        return response.data;
    }
};
