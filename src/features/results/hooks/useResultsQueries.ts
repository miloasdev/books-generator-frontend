// src/features/results/hooks/useResultsQueries.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "@/shared/hooks/use-toast.ts";
import { getErrorMessage } from "@/shared/lib";
import {resultService} from "@/features/results/services/resultsService.ts";

export const useBookDetails = (bookId: number | undefined) => {
    return useQuery({
        queryKey: ['bookDetails', bookId],
        queryFn: () => resultService.getBookById(Number(bookId)),
        enabled: !!bookId,
        staleTime: 1000 * 60 * 5,
    });
};

// 👇 ADD THIS NEW HOOK
export const useBookMutations = (bookId: number) => {
    const { toast } = useToast();

    const exportBookMutation = useMutation({
        mutationFn: () => resultService.exportBook(bookId),
        onSuccess: (res) => {
            const { data } = res;
            if (data.success) {
                toast({ title: "Export Started", description: data.message ?? "Your book is being exported." });
            } else {
                // This handles the "NOT_IMPLEMENTED" error gracefully
                toast({ title: "Export unavailable", description: data.error.message, variant: "default" });
            }
        },
        onError: (err) => {
            toast({ title: "Export Failed", description: getErrorMessage(err), variant: "destructive" });
        }
    });

    return {
        exportBook: exportBookMutation.mutate,
        isExporting: exportBookMutation.isPending,
    }
}
