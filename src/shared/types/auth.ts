// src/shared/types/auth.ts
import type { ApiResponse } from './api';
import type { User } from './user'; // 👈 Import the centralized User type

// Type for the JWT token response from the backend
export type Token = {
    access_token: string;
    token_type: string;
};

// --- API Response Types ---
export type RegisterResponse = ApiResponse<User>;
export type LoginResponse = ApiResponse<Token>;