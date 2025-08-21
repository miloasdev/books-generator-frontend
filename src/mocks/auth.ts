// src/mocks/auth.ts
import type { AuthResponse, ResetPasswordResponse, ErrorResponse } from '@/shared/types/api';

/**
 * Mock data for a successful user login.
 */
export const mockLoginSuccess: AuthResponse = {
    user: {
        id: 'user-uuid-123',
        email: 'muhaiman@example.com',
        name: 'Muhaiman',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik11aGFpbWFuIiwiaWF0IjoxNTE2MjM5MDIyfQ.fake_signature_string',
};

/**
 * Mock data for a failed user login.
 */
export const mockLoginError: ErrorResponse = {
    error: 'Invalid email or password.',
};

/**
 * Mock data for a successful user registration.
 */
export const mockRegisterSuccess: AuthResponse = {
    user: {
        id: 'new-user-uuid-456',
        email: 'new.user@example.com',
        name: 'new.user@example.com',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwibmFtZSI6Ik5ldyBVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.another_fake_signature',
};

/**
 * Mock data for a failed user registration where the email is already taken.
 */
export const mockRegisterError: ErrorResponse = {
    error: 'An account with this email already exists.',
};


/**
 * Mock data for a successful password reset request.
 */
export const mockResetPasswordSuccess: ResetPasswordResponse = {
    message: 'Password reset link sent to your email',
};

/**
 * Mock data for a failed password reset where the user is not found.
 */
export const mockResetPasswordError: ErrorResponse = {
    error: 'User with this email not found.',
};
