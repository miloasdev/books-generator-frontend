// src/features/generator/services/generatorService.ts
import { api } from "@/shared/services/api.ts";
import type {
    GenerateBookResponse,
    SheetConnectionResponse,
    SupportedLanguagesResponse
} from "@/shared/types/generator.ts";
import type { BookGeneratorFormValues } from "@/features/generator/lib/schemas.ts";
import type { BookDetailResponse, BookStatusResponse } from "@/shared/types/book.ts"; // 👈 IMPORT NEW TYPE

export const generatorService = {
    connectToSheets: (url: string) => {
        return api.post<SheetConnectionResponse>('/sheet/connect', { "sheet_url": url });
    },
    getSupportedLanguages: () => {
        return api.get<SupportedLanguagesResponse>('/config/languages');
    },
    generateBook: (data: BookGeneratorFormValues) => {
        return api.post<GenerateBookResponse>('/books/generate', data);
    },
    getBookById: (id: number) => api.get<BookDetailResponse>(`/books/${id}`), // 👈 APPLY TYPE
    getBookStatus: (id: number) => api.get<BookStatusResponse>(`/books/${id}/status`),
};
