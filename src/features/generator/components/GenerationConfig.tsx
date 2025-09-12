// src/features/generator/components/GenerationConfig.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { SupportedLanguages } from "@/features/generator/components/SupportedLanguages.tsx";
import { useFormContext } from "react-hook-form";
import type { BookGeneratorFormValues } from "@/features/generator/lib/schemas.ts";
import { SupportedTones } from "@/features/generator/components/SupportedTones.tsx"; // 👈 Import new component

export const GenerationConfig = () => {
    const { control } = useFormContext<BookGeneratorFormValues>()
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className={'font-serif'}>Configuration</CardTitle>
                <CardDescription>Adjust the settings for the generation process.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* 👇 Fields are now reordered with the new additions */}
                <div className="space-y-8">
                    {/* 1. Title */}
                    <FormField
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Book Title</FormLabel>
                                <FormControl>
                                    <Input
                                        type={"text"}
                                        placeholder="e.g., The Future of AI"
                                        { ...field }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 2. Writer Introduction */}
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 3. Words per Chapter */}
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

                    {/* 4. Tone */}
                    <SupportedTones />

                    {/* 5. Languages */}
                    <SupportedLanguages />

                    {/* 6. AI Prompt */}
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