// src/features/generator/components/GenerationConfig.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import {SupportedLanguages} from "@/features/generator/components/SupportedLanguages.tsx";
import {useFormContext} from "react-hook-form";
import type {BookGeneratorFormValues} from "@/features/generator/lib/schemas.ts";

export const GenerationConfig = () => {
    const { control } = useFormContext<BookGeneratorFormValues>()
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className={'font-serif'}>Configuration</CardTitle>
                <CardDescription>Adjust the settings for the generation process.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <FormField
                        control={control}
                        name="words_per_chapter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Words per Chapter</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="writer_intro"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Writer Introduction</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Introduce the author..."
                                        className="resize-vertical min-h-[80px]"
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <SupportedLanguages />

                    <FormField
                        control={control}
                        name="ai_prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content Enhancement Prompt</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="e.g., Make the tone more formal..."
                                        className="resize-vertical min-h-[80px]"
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Guide the AI on style, tone, and structure. Be specific for best results.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
};