// src/features/auth/lib/schemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
});

export const registerSchema = z.object({
    email: z.email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

export const resetPasswordSchema = z.object({
    email: z.email({ message: 'Please enter a valid email address.' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
