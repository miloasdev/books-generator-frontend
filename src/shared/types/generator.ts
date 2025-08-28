import type {ApiResponse} from "@/shared/types/api.ts";

export type SheetChapter = {
    id: string;
    title: string;
    description: string;
}

export type SheetChapters = {
    chapters: SheetChapter[]
}

export type SheetChapterResponse = ApiResponse<SheetChapters>