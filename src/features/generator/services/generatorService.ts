// src/features/generator/services/generatorService.ts
import { api } from "@/shared/services/api.ts";
import type {
    GenerateBookResponse,
    SheetConnectionResponse,
    SupportedLanguagesResponse, SupportedTonesResponse
} from "@/shared/types/generator.ts";
import type { BookGeneratorFormValues } from "@/features/generator/lib/schemas.ts";
import type { BookDetailResponse, BookStatusResponse } from "@/shared/types/book.ts";
import type { ApiResponse } from "@/shared/types/api.ts";

export const generatorService = {
    connectToSheets: (url: string) => {
        return api.post<SheetConnectionResponse>('/sheet/connect', { "sheet_url": url });
    },
    getSupportedLanguages: () => {
        return api.get<SupportedLanguagesResponse>('/config/languages');
    },
    getSupportedTones: () => {
        return api.get<SupportedTonesResponse>('/config/tones');
    },
    generateBook: (data: BookGeneratorFormValues) => {
        return api.post<GenerateBookResponse>('/books/generate', data);
    },
    getBookById: (id: number) => api.get<BookDetailResponse>(`/books/${id}`),
    getBookStatus: (id: number) => api.get<BookStatusResponse>(`/books/${id}/status`),
    exportBook: (id: number) => api.post<ApiResponse<never>>(`/books/${id}/export`),
};
