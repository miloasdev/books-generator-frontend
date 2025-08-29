import { FormItem, FormLabel, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Badge } from '@/shared/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { useFormContext } from 'react-hook-form';
import { useController } from 'react-hook-form'; // 👈 Import useController
import type { BookGeneratorFormValues } from '../lib/schemas';
import { useEffect, useState } from "react";
import { generatorService } from "@/features/generator/services/generatorService.ts";
import type { Language } from "@/shared/types/generator.ts";
import { Button } from "@/shared/components/ui/button";
import { RotateCcw } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export const SupportedLanguages = () => {
    const { control } = useFormContext<BookGeneratorFormValues>();
    // Get field state and methods at the top level
    const { field } = useController({
        name: "languages",
        control,
        defaultValue: [], // It's good practice to provide a default value
    });

    const [supportedLanguages, setSupportedLanguages] = useState<Language[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getSupportedLanguages = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await generatorService.getSupportedLanguages();
            if (!data.success || !data.data) {
                setError(data.message || "Failed to fetch supported languages.");
                setSupportedLanguages(null);
                return;
            }
            setSupportedLanguages(data.data.languages);
        } catch {
            setError("Unable to load languages. Please check your connection and try again.");
            setSupportedLanguages(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on mount
    useEffect(() => {
        getSupportedLanguages();
    }, []);

    // Correctly placed useEffect to set a default value
    useEffect(() => {
        if (supportedLanguages && field.value?.length === 0) {
            const englishLang = supportedLanguages.find(l => l.code === 'en');
            if (englishLang) {
                field.onChange([{ id: englishLang.id, label: englishLang.name }]);
            }
        }
    }, [supportedLanguages, field]); // Correct dependencies

    return (
        <FormItem>
            <div className="mb-3">
                <FormLabel className="text-base">Target Languages</FormLabel>
                <FormDescription>Select languages for translation.</FormDescription>
            </div>

            {loading && (
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={cn("h-6 w-12 rounded-md animate-pulse bg-primary/20")} />
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="flex items-center gap-3 text-sm text-red-500">
                    <span>{error}</span>
                    <Button variant="outline" size="sm" onClick={getSupportedLanguages} className="flex items-center gap-1">
                        <RotateCcw className="h-4 w-4" />
                        Retry
                    </Button>
                </div>
            )}

            {!loading && supportedLanguages && (
                <TooltipProvider delayDuration={100}>
                    <div className="flex flex-wrap gap-2">
                        {supportedLanguages.map((lang) => {
                            // 👇 Type mismatch fixed here by coercing to a number for comparison
                            // Note: The best long-term fix is to ensure your form schema expects a number for the id.
                            const isSelected = field.value?.some(l => Number(l.id) === lang.id);
                            return (
                                <Tooltip key={lang.id}>
                                    <TooltipTrigger asChild>
                                        <Badge
                                            variant={isSelected ? 'default' : 'secondary'}
                                            onClick={() => {
                                                const newSelection = isSelected
                                                    // 👇 And also fixed here
                                                    ? field.value?.filter(l => Number(l.id) !== lang.id)
                                                    : [...(field.value || []), { id: lang.id, label: lang.name }];
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