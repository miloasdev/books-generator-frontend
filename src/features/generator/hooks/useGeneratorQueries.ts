// src/features/generator/hooks/useGeneratorQueries.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { generatorService } from '../services/generatorService';
import { useToast } from '@/shared/hooks/use-toast';
import { getErrorMessage } from '@/shared/lib';
import { useNavigate } from 'react-router-dom';

// Hook for fetching data (GET requests) - REMAINS THE SAME
export const useSupportedLanguages = () => {
    return useQuery({
        queryKey: ['supportedLanguages'],
        queryFn: async () => {
            const { data } = await generatorService.getSupportedLanguages();
            if (!data.success || !data.data) {
                throw new Error(data.error?.message || 'Failed to fetch languages');
            }
            return data.data.languages;
        },
        staleTime: 1000 * 60 * 5,
    });
};

// Hook for performing actions (POST requests) - NAME IS NOW CORRECT
export const useGeneratorMutations = () => { // 👈 RENAMED HERE
    const { toast } = useToast();
    const navigate = useNavigate();

    const connectToSheetMutation = useMutation({
        mutationFn: generatorService.connectToSheets,
        onSuccess: (response) => {
            const { data } = response;
            if (!data.success || !data.data) {
                toast({ variant: 'destructive', title: 'Google Sheets Error', description: data.error?.message || 'Invalid response' });
            }
        },
        onError: (error) => {
            toast({ variant: 'destructive', title: 'Unable to connect', description: getErrorMessage(error) });
        },
    });

    const generateBookMutation = useMutation({
        mutationFn: generatorService.generateBook,
        onSuccess: (response) => {
            const { data } = response;
            if (!data.success || !data.data) {
                toast({title: "Something went wrong", description: data.error?.message, variant: "destructive"});
                return;
            }
            toast({title: data.data?.message, description: `The book ID is ${data.data?.book_id}. Please be patient`});
            navigate('/processing'); // 👈 ADDED NAVIGATION
        },
        onError: (error) => {
            toast({
                title: 'Book generation failed',
                description: getErrorMessage(error),
                variant: 'destructive',
            });
        }
    });

    return {
        connectToSheet: connectToSheetMutation.mutate,
        isConnecting: connectToSheetMutation.isPending,
        connectData: connectToSheetMutation.data,

        generateBook: generateBookMutation.mutate,
        isGenerating: generateBookMutation.isPending,
    };
};