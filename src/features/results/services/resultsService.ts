import {api} from "@/shared/services/api.ts";
import type {BookDetailResponse} from "@/shared/types/book.ts";
import type {ApiResponse} from "@/shared/types/api.ts";

export const resultService = {
    getBookById: (id: number) => api.get<BookDetailResponse>(`/books/${id}`),
    exportBook: (id: number) => api.post<ApiResponse<never>>(`/books/${id}/export`),
}