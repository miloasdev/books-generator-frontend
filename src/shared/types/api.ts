// src/shared/types/api.ts

/**
 * Represents the structure of a user object returned from the API.
 */
export interface User {
    id: string;
    email: string;
    name: string;
    picture?: string; // Optional field for profile picture URL
}

/**
 * Represents the successful response payload for login and registration.
 */
export interface AuthResponse {
    user: User;
    token: string;
}

/**
 * Represents the successful response for a password reset request.
 */
export interface ResetPasswordResponse {
    message: string;
}

/**
 * Represents a generic error response from the API.
 */
export interface ErrorResponse {
    error: string;
}
