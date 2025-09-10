// src/features/results/hooks/useResultsQueries.ts
import { useQuery } from '@tanstack/react-query';
import { generatorService } from '@/features/generator/services/generatorService';

export const useBookDetails = (bookId: number | undefined) => {
    return useQuery({
        queryKey: ['bookDetails', bookId],
        queryFn: () => generatorService.getBookById(Number(bookId)),
        enabled: !!bookId, // Only run if bookId is available
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
};