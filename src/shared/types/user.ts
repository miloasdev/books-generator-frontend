// src/shared/types/user.ts
import type { ApiResponse } from '@/shared/types/api';

export type User = {
    id: number;
    email: string;
    // Optional fields that might come from Google OAuth
    name?: string;
    picture?: string;
};

// This will be the standard response type when fetching user info
export type UserInfoResponse = ApiResponse<User>;