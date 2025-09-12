// src/features/generator/pages/GeneratorPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import { SheetConnector } from '../components/SheetConnector';
import { GenerationConfig } from '../components/GenerationConfig';
import { bookGeneratorSchema, type BookGeneratorFormValues } from '../lib/schemas';
import {Loader2} from "lucide-react";
import {useGeneratorMutations} from "@/features/generator/hooks/useGeneratorQueries.ts";

export const GeneratorPage = () => {
    const { generateBook, isGenerating } = useGeneratorMutations(); // 👈 Use the hook

    const form = useForm<BookGeneratorFormValues>({
        resolver: zodResolver(bookGeneratorSchema),
        defaultValues: {
            googleSheetUrl: '',
            cache_id: '',
            selected_chapter_ids: [],
            title: '',
            writer_intro: '',
            words_per_chapter: 1500,
            selected_tone_id: undefined,
            languages: [],
            ai_prompt: '',
        },
        mode: 'onChange',
    });

    async function onSubmit(values: BookGeneratorFormValues) {
        generateBook(values);
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                    Generate Your Books
                </h1>
                <p className="text-muted-foreground">
                    Configure your content source and AI settings.
                </p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                        <div className="lg:col-span-3 flex flex-col gap-8">
                            <SheetConnector />
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full lg:w-auto lg:self-end disabled:bg-black"
                                disabled={!form.formState.isValid || isGenerating} // 👈 Disable on submit
                            >
                                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Generate Books
                            </Button>
                        </div>
                        <div className="lg:col-span-2">
                            <GenerationConfig />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};