// src/features/generator/components/GenerationConfig.tsx
import type {Control} from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Badge } from '@/shared/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import type {BookGeneratorFormValues} from '../lib/schemas';

const availableLanguages = [
    { id: 'en', label: 'English', code: 'EN' },
    { id: 'zh-hant', label: 'Traditional Chinese', code: 'ZH-HANT' },
    { id: 'hi', label: 'Hindi', code: 'HI' },
    { id: 'zh-hans', label: 'Simplified Chinese', code: 'ZH-HANS' },
    { id: 'fr', label: 'French', code: 'FR' },
    { id: 'es', label: 'Spanish', code: 'ES' },
    { id: 'de', label: 'German', code: 'DE' },
    { id: 'ja', label: 'Japanese', code: 'JA' },
];

interface GenerationConfigProps {
    control: Control<BookGeneratorFormValues>;
}

export const GenerationConfig = ({ control }: GenerationConfigProps) => {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className={'font-serif'}>AI Configuration</CardTitle>
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

                    <FormField
                        control={control}
                        name="languages"
                        render={({ field }) => (
                            <FormItem>
                                <div className="mb-3">
                                    <FormLabel className="text-base">Target Languages</FormLabel>
                                    <FormDescription>Select languages for translation.</FormDescription>
                                </div>
                                <TooltipProvider delayDuration={100}>
                                    <div className="flex flex-wrap gap-2">
                                        {availableLanguages.map((lang) => {
                                            const isSelected = field.value?.some(l => l.id === lang.id);
                                            return (
                                                <Tooltip key={lang.id}>
                                                    <TooltipTrigger asChild>
                                                        <Badge
                                                            variant={isSelected ? 'default' : 'secondary'}
                                                            onClick={() => {
                                                                if (lang.id === 'en') return;
                                                                const newSelection = isSelected
                                                                    ? field.value?.filter(l => l.id !== lang.id)
                                                                    : [...field.value, {id: lang.id, label: lang.label}];
                                                                field.onChange(newSelection);
                                                            }}
                                                            className="cursor-pointer rounded-md"
                                                        >
                                                            {lang.code}
                                                        </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{lang.label}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            );
                                        })}
                                    </div>
                                </TooltipProvider>
                                <FormMessage className="pt-2" />
                            </FormItem>
                        )}
                    />

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