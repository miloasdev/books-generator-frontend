// src/features/generator/components/SheetConnector.tsx
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Checkbox } from '@/shared/components/ui/checkbox';
import type { BookGeneratorFormValues } from '../lib/schemas';
import { FileText, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import type { SheetChapter } from "@/shared/types/generator.ts";
import { Label } from "@/shared/components/ui/label.tsx";
import ChaptersSelectActions from "@/features/generator/components/ChaptersSelectActions.tsx";
import {useGeneratorMutations} from "@/features/generator/hooks/useGeneratorQueries.ts";

export const SheetConnector = () => {
    const { control, getValues, setValue } = useFormContext<BookGeneratorFormValues>();
    const [chapters, setChapters] = React.useState<SheetChapter[]>([]);
    const { connectToSheet, isConnecting, connectData } = useGeneratorMutations(); // 👈 Use the hook

    const { field } = useController({
        name: "selected_chapter_ids",
        control,
    });

    const handleConnect = () => {
        const sheetUrl = getValues('googleSheetUrl');
        connectToSheet(sheetUrl);
    };

    // Effect to update form and component state on successful API call
    React.useEffect(() => {
        if (connectData?.data.success && connectData.data.data) {
            setValue('cache_id', connectData.data.data.cache_id);
            setChapters(connectData.data.data.chapters);
        }
    }, [connectData, setValue]);

    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className={'font-serif'}>Content Source</CardTitle>
                <CardDescription>Connect your Google Sheet to import chapters.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <FormField
                        control={control}
                        name="googleSheetUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Google Sheet Link</FormLabel>
                                <div className="flex gap-2">
                                    <FormControl>
                                        <Input placeholder="https://docs.google.com/spreadsheets/d/..." {...field} />
                                    </FormControl>
                                    <Button type="button" onClick={handleConnect} disabled={isConnecting}>
                                        {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Connect'}
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2">
                        <FormLabel>Select Chapters</FormLabel>
                        <FormDescription>Choose which chapters to include in the generation.</FormDescription>
                    </div>

                    {chapters.length > 0 ? (
                        <div className="rounded-md border p-4">
                            <ChaptersSelectActions allChapters={chapters} onSelect={field.onChange} />
                            <ScrollArea className="h-72 w-full">
                                <div className="space-y-3 pr-4">
                                    {chapters.map((chapter) => (
                                        <Label
                                            key={chapter.id}
                                            htmlFor={chapter.id}
                                            className="flex cursor-pointer items-center space-x-3 rounded-md p-2 hover:bg-muted/50 transition-colors"
                                        >
                                            <Checkbox
                                                id={chapter.id}
                                                checked={field.value?.some(c => c.id === chapter.id)}
                                                onCheckedChange={(checked) => {
                                                    const currentSelection = field.value || [];
                                                    const newSelection = checked
                                                        ? [...currentSelection, {id: chapter.id, title: chapter.title}]
                                                        : currentSelection.filter((c) => c.id !== chapter.id);
                                                    field.onChange(newSelection);
                                                }}
                                            />
                                            <div className="flex-1">
                                                <span className="font-normal block">{chapter.title}</span>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {chapter.description}
                                                </p>
                                            </div>
                                        </Label>
                                    ))}
                                </div>
                            </ScrollArea>
                            <FormMessage className="pt-2">{control.getFieldState("selected_chapter_ids").error?.message}</FormMessage>
                        </div>
                    ) : (
                        <div className="flex h-72 w-full flex-col items-center justify-center rounded-md border-2 border-dashed">
                            <div className="text-center text-muted-foreground">
                                {isConnecting ? (
                                    <>
                                        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                                        <p className="mt-2">Connecting to Google Sheet...</p>
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mx-auto h-8 w-8" />
                                        <p className="mt-2">Your chapters will appear here</p>
                                        <p className="text-sm">Press "Connect" after pasting your link.</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};