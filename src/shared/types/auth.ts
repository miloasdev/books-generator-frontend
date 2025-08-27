// src/shared/types/auth.ts
import type { ApiResponse } from './api';

export type User = {
    id: number;
    email: string;
};

export type Token = {
    access_token: string;
    token_type: string;
};

// --- API response shapes ---
export type RegisterResponse = ApiResponse<User>;
export type LoginResponse = ApiResponse<Token>;
