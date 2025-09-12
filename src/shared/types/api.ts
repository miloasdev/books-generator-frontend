// src/shared/types/api.ts

export type ErrorModel = {
  code: string;
  message: string;
  details?: unknown; // Can hold validation fields, etc.
};

// Type for a successful response
export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string | null;
  meta?: Record<string, never> | null;
  error?: undefined;
};

// Type for a failed response
export type ApiFailure = {
  success: false;
  error: ErrorModel;
  message?: string | null;
  meta?: Record<string, never> | null;
  data?: undefined;
};

// The main union type
export type ApiResponse<T = never> = ApiSuccess<T> | ApiFailure;
