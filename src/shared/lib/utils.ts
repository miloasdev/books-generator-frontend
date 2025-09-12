import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {isAxiosError} from "axios";
import type { ApiFailure } from "@/shared/types/api";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getErrorMessage(err: unknown): string {
  // Try to parse it as an Axios error with our custom API failure structure
  if (isAxiosError(err)) {
    const data = err.response?.data as ApiFailure | undefined;

    if (data && data.success === false && data.error) {
      const base = data.error.message ?? "Something went wrong.";

      // Check for validation error details
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const details = (data.error.details as any) || {};
      const fields = details?.fields as Record<string, string> | undefined;

      if (fields && Object.keys(fields).length > 0) {
        const first = Object.entries(fields)[0];
        if (first) {
          const [field, msg] = first;
          // Example: "Some inputs are invalid (words_per_chapter: Must be at least 500 words.)"
          return `${base} (${field}: ${msg})`;
        }
      }
      return base;
    }
  }

  // Generic fallbacks
  if (err instanceof Error) {
    return err.message;
  }
  return 'An unknown error occurred. Please try again.';
}
