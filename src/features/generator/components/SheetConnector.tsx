// src/features/generator/components/SheetConnector.tsx
import * as React from 'react';
import {type Control, useController } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import type {BookGeneratorFormValues} from '../lib/schemas';
import { FileText, Loader2, Zap } from 'lucide-react';
import { ScrollArea } from '@/shared/components/ui/scroll-area';

const mockChapters = Array.from({ length: 15 }, (_, i) => ({
    id: `ch-${i + 1}`,
    title: `Chapter ${i + 1}: ${i % 2 === 0 ? 'The Journey Begins' : 'A New Horizon'}`,
}));

interface SheetConnectorProps {
    control: Control<BookGeneratorFormValues>;
}

const ChapterSelectionTools = ({ allChapters, onSelect }: { allChapters: {id: string, title: string}[], onSelect: (selection: {id: string, title: string}[]) => void }) => (
    <div className="flex flex-wrap gap-2 mb-4">
        <Button type="button" variant="outline" size="sm" onClick={() => onSelect(allChapters)}>Select All</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => onSelect([])}>Deselect All</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => onSelect(allChapters.filter((_, i) => (i + 1) % 2 !== 0))}>Select Odd</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => onSelect(allChapters.filter((_, i) => (i + 1) % 2 === 0))}>Select Even</Button>
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
                const randomSelection = allChapters.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * allChapters.length) + 1);
                onSelect(randomSelection);
            }}
        >
            <Zap className="mr-2 h-4 w-4" />
            Random
        </Button>
    </div>
);

export const SheetConnector = ({ control }: SheetConnectorProps) => {
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [chapters, setChapters] = React.useState<{id: string, title: string}[]>([]);

    // Use the useController hook to get direct access to field properties
    const { field } = useController({
        name: "selectedChapters",
        control,
    });

    const handleConnect = () => {
        setIsConnecting(true);
        setTimeout(() => {
            setChapters(mockChapters);
            setIsConnecting(false);
        }, 1500);
    };

    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Content Source</CardTitle>
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
                            <ChapterSelectionTools allChapters={chapters} onSelect={field.onChange} />
                            <ScrollArea className="h-72 w-full">
                                <div className="space-y-3 pr-4">
                                    {chapters.map((chapter) => (
                                        <div key={chapter.id} className="flex items-center space-x-3 rounded-md p-2 hover:bg-muted/50 transition-colors">
                                            <Checkbox
                                                id={chapter.id}
                                                checked={field.value?.some(c => c.id === chapter.id)}
                                                onCheckedChange={(checked) => {
                                                    const currentSelection = field.value || [];
                                                    const newSelection = checked
                                                        ? [...currentSelection, chapter]
                                                        : currentSelection.filter((c) => c.id !== chapter.id);
                                                    field.onChange(newSelection);
                                                }}
                                            />
                                            <Label htmlFor={chapter.id} className="flex-1 cursor-pointer font-normal">
                                                {chapter.title}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <FormMessage className="pt-2">{control.getFieldState("selectedChapters").error?.message}</FormMessage>
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