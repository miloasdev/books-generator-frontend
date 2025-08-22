import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {isAxiosError} from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Parses an error of unknown type and returns a standardized error message.
 * @param error - The error to parse.
 * @returns A string containing the error message.
 */
export function getErrorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        return error.response?.data?.message || 'An API error occurred.';
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred.';
}