import type {ApiResponse} from "@/shared/types/api.ts";

// GOOGLE SHEETS CHAPTERS
export type SheetChapter = {
    id: string;
    title: string;
    description: string;
}
export type SheetChapters = {
    cache_id: string;
    chapters: SheetChapter[];
}

// SUPPORTED LANGUAGES
export type Language = {
    id: number;
    name: string;
    code: string;
}

export type Languages = {
    languages: Language[]
}

export type SheetChapterResponse = ApiResponse<SheetChapters>
export type SupportedLanguagesResponse = ApiResponse<Languages>