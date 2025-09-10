// src/features/processing/hooks/useProcessingQueries.ts
import { useQuery } from '@tanstack/react-query';
import { generatorService } from '@/features/generator/services/generatorService';

export const useBookStatus = (bookId: number | undefined) => {
    return useQuery({
        queryKey: ['bookStatus', bookId],
        queryFn: () => generatorService.getBookStatus(Number(bookId)),
        // This logic automatically stops polling when the book is done
        refetchInterval: (query) => {
            const status = query.state.data?.data?.data?.book_status;
            // 👇 CORRECTED THIS LINE
            const isFinished = status === 'done' || status === 'partial';
            return isFinished ? false : 3000;
        },
        enabled: !!bookId, // Only run the query if bookId is available
    });
};