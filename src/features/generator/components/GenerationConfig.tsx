// src/features/generator/components/GenerationConfig.tsx
import type {Control} from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import type {BookGeneratorFormValues} from '../lib/schemas';
import {SupportedLanguages} from "@/features/generator/components/SupportedLanguages.tsx";

interface GenerationConfigProps {
    control: Control<BookGeneratorFormValues>;
}

export const GenerationConfig = ({ control }: GenerationConfigProps) => {
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
                        name="wordsPerChapter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Words per Chapter</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="writerIntroduction"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Writer Introduction</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Introduce the author..." className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <SupportedLanguages control={control} />

                    <FormField
                        control={control}
                        name="enhancementPrompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content Enhancement Prompt</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="e.g., Make the tone more formal..."
                                        className="resize-vertical min-h-[120px]"
                                        {...field}
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