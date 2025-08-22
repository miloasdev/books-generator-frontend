import { api } from '@/shared/services/api'; // Assuming apiClient is in shared/lib
import type { RegisterFormValues, LoginFormValues } from '../lib/schemas';

// Define the expected response type for the login endpoint
interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const authService = {
    /**
     * Registers a new user.
     * @param values - The registration form data (email, password).
     * @returns The response data from the server.
     */
    register: (values: RegisterFormValues) => {
        return api.post('/auth/register', values);
    },

    /**
     * Logs in a user.
     * @param values - The login form data (email, password).
     * @returns The login response data containing the access token.
     */
    login: async (values: LoginFormValues): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', values);
        // Axios wraps the response in a `data` object, so we return it directly
        return response.data;
    },
};