// src/shared/types/book.ts
import type { ApiResponse } from '@/shared/types/api';

// Matches the ChapterOut schema from the backend
export interface ChapterDetail {
    id: number;
    title: string;
    description: string | null;
    status: string;
    generated_content: string | null;
    error_reason: string | null;
}

// Matches the SelectedLanguage schema from the backend
export interface Language {
    id: number;
    code: string;
    name: string;
}

export interface Tone {
    id: number;
    name: string;
    code: string;
}

export interface IndexedChapter {
    id: number;
    title: string;
}

// Matches the BookDetailResponse schema from the backend
export interface BookDetail {
    id: number;
    title: string;
    status: string;
    words_per_chapter: number;
    writer_intro: string;
    ai_prompt: string;
    languages: Language[];
    tone: Tone
    chapters: ChapterDetail[];
    index: IndexedChapter;
}

export type BookDetailResponse = ApiResponse<BookDetail>;

export interface ChapterStatus {
    title: string;
    status: 'pending' | 'generating' | 'done' | 'failed';
}

export interface BookStatus {
    book_status: 'pending' | 'generating' | 'partial' | 'done';
    chapters: ChapterStatus[];
    total_count: number;
    done_count: number;
    failed_count: number;
}

export type BookStatusResponse = ApiResponse<BookStatus>;