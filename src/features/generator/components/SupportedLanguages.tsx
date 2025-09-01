// src/features/generator/components/SupportedLanguages.tsx
import { FormItem, FormLabel, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Badge } from '@/shared/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { useFormContext, useController } from 'react-hook-form';
import type { BookGeneratorFormValues } from '../lib/schemas';
import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { RotateCcw } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useSupportedLanguages } from '../hooks/useGeneratorQueries'; // 👈 Import the hook

export const SupportedLanguages = () => {
    const { control } = useFormContext<BookGeneratorFormValues>();
    const { field } = useController({
        name: "languages",
        control,
        defaultValue: [],
    });
    // 👇 Use the hook to fetch data. isLoading, error, and data are all handled for you.
    const { data: supportedLanguages, isLoading, isError, refetch } = useSupportedLanguages();

    useEffect(() => {
        if (supportedLanguages && field.value?.length === 0) {
            const englishLang = supportedLanguages.find(l => l.code === 'en');
            if (englishLang) {
                field.onChange([{ id: englishLang.id, code: englishLang.code }]);
            }
        }
    }, [supportedLanguages, field]);

    return (
        <FormItem>
            <div className="mb-3">
                <FormLabel className="text-base">Target Languages</FormLabel>
                <FormDescription>Select languages for translation.</FormDescription>
            </div>

            {isLoading && (
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={cn("h-6 w-12 rounded-md animate-pulse bg-primary/20")} />
                    ))}
                </div>
            )}

            {isError && (
                <div className="flex items-center gap-3 text-sm text-red-500">
                    <span>Unable to load languages.</span>
                    <Button variant="outline" size="sm" onClick={() => refetch()} className="flex items-center gap-1">
                        <RotateCcw className="h-4 w-4" />
                        Retry
                    </Button>
                </div>
            )}

            {supportedLanguages && (
                <TooltipProvider delayDuration={100}>
                    <div className="flex flex-wrap gap-2">
                        {supportedLanguages.map((lang) => {
                            const isSelected = field.value?.some(l => l.id === lang.id);
                            return (
                                <Tooltip key={lang.id}>
                                    <TooltipTrigger asChild>
                                        <Badge
                                            variant={isSelected ? 'default' : 'secondary'}
                                            onClick={() => {
                                                const newSelection = isSelected
                                                    ? field.value?.filter(l => l.id !== lang.id)
                                                    : [...(field.value || []), { id: lang.id, code: lang.code }];
                                                field.onChange(newSelection);
                                            }}
                                            className="cursor-pointer rounded-md"
                                        >
                                            {lang.code.toUpperCase()}
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{lang.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>
                </TooltipProvider>
            )}

            <FormMessage className="pt-2" />
        </FormItem>
    );
};