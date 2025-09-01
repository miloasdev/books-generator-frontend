// src/features/generator/services/generatorService.ts
import { api } from "@/shared/services/api.ts";
import type {
    GenerateBookResponse,
    SheetConnectionResponse, // 👈 Renamed for clarity
    SupportedLanguagesResponse
} from "@/shared/types/generator.ts";
import type { BookGeneratorFormValues } from "@/features/generator/lib/schemas.ts";

export const generatorService = {
    connectToSheets: (url: string) => {
        return api.post<SheetConnectionResponse>('/sheet/connect', { "sheet_url": url });
    },
    getSupportedLanguages: () => {
        return api.get<SupportedLanguagesResponse>('/config/languages');
    },
    generateBook: (data: BookGeneratorFormValues) => {
        return api.post<GenerateBookResponse>('/book/generate', data);
    }
};