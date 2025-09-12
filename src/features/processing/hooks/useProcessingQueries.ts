// src/features/processing/hooks/useProcessingQueries.ts
import { useQuery } from "@tanstack/react-query";
import { generatorService } from "@/features/generator/services/generatorService";
import { AxiosError } from "axios";
import type { ApiResponse, ApiFailure } from "@/shared/types/api";
import type { BookStatus } from "@/shared/types/book";

export type BookStatusQueryResponse = ApiResponse<BookStatus>;

export const useBookStatus = (bookId: number | undefined) => {
  return useQuery<BookStatusQueryResponse, AxiosError<ApiFailure>>({
    queryKey: ["bookStatus", bookId],
    queryFn: async () => {
      if (typeof bookId !== "number") {
        throw new Error("Book ID must be a number.");
      }
      const res = await generatorService.getBookStatus(bookId);
      return res.data;
    },
    enabled: !!bookId,
    refetchInterval: (query) => {
      const response = query.state.data;
      if (!response || !response.success) return false;
      const status = response.data.book_status;
      return status === "done" || status === "partial" ? false : 3000;
    },
    retry: (failureCount, err) => {
      const code = err.response?.data?.error?.code;
      if (code === "BOOK_NOT_FOUND") return false;
      return failureCount < 3;
    },
  });
};
