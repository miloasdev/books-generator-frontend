// src/shared/types/api.ts
export type ErrorModel = {
    code: string;
    message: string;
    details?: unknown;
};

export type ApiResponse<T = never> = {
    success: boolean;
    data?: T;
    error?: ErrorModel;
    meta?: Record<string, never>;
    message?: string;
};
