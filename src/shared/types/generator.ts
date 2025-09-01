// src/shared/types/generator.ts
import type { ApiResponse } from '@/shared/types/api';

// Represents a single chapter fetched from a Google Sheet
export type SheetChapter = {
    id: string;
    title: string;
    description: string;
};

// The data structure returned after connecting to a Google Sheet
export type SheetConnectionData = {
    cache_id: string;
    chapters: SheetChapter[];
};

// Represents a single supported language
export type Language = {
    id: number;
    name: string;
    code: string;
};

// The data structure for the list of supported languages
export type LanguagesData = {
    languages: Language[];
};

// The data structure for the response after starting book generation
export type GenerateBookData = {
    message: string;
    book_id: number;
};

// --- API Response Types ---
export type SheetConnectionResponse = ApiResponse<SheetConnectionData>;
export type SupportedLanguagesResponse = ApiResponse<LanguagesData>;
export type GenerateBookResponse = ApiResponse<GenerateBookData>;