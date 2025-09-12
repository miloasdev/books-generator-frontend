// src/features/generator/services/generatorService.ts
import { api } from "@/shared/services/api.ts";
import type {
    GenerateBookResponse,
    SheetConnectionResponse,
    SupportedLanguagesResponse, SupportedTonesResponse
} from "@/shared/types/generator.ts";
import type { BookGeneratorFormValues } from "@/features/generator/lib/schemas.ts";
import type { BookStatusResponse } from "@/shared/types/book.ts";

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
    getBookStatus: (id: number) => api.get<BookStatusResponse>(`/books/${id}/status`),
};
