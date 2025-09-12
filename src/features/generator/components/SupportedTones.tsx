// src/features/generator/components/SupportedTones.tsx
import { useFormContext } from 'react-hook-form';
import { useSupportedTones } from '../hooks/useGeneratorQueries';
import type { BookGeneratorFormValues } from '../lib/schemas';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Button } from "@/shared/components/ui/button.tsx";
import { RotateCcw, Loader2 } from "lucide-react";

export const SupportedTones = () => {
    const { control } = useFormContext<BookGeneratorFormValues>();
    const { data: supportedTones, isLoading, isError, refetch } = useSupportedTones();

    return (
        <FormField
            control={control}
            name="selected_tone_id"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Writing Tone</FormLabel>
                    <Select
                        onValueChange={(value) => field.onChange(parseInt(value, 10))}
                        defaultValue={field.value?.toString()}
                        disabled={isLoading || isError}
                    >
                        <FormControl>
                            <SelectTrigger>
                                {isLoading ? (
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" /> Loading tones...
                                    </span>
                                ) : (
                                    <SelectValue placeholder="Select a writing tone" />
                                )}
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {supportedTones?.map((tone) => (
                                <SelectItem key={tone.id} value={tone.id.toString()}>
                                    {tone.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {isError && (
                        <div className="flex items-center gap-3 pt-2 text-sm text-red-500">
                             <span>Unable to load tones.</span>
                             <Button variant="outline" size="icon" onClick={() => refetch()} className="h-6 w-6">
                                 <RotateCcw className="h-4 w-4" />
                             </Button>
                        </div>
                    )}

                    <FormDescription>
                        Choose the primary tone for the generated content.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};