// src/features/generator/pages/GeneratorPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/shared/hooks/use-toast';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import { SheetConnector } from '../components/SheetConnector';
import { GenerationConfig } from '../components/GenerationConfig';
import { bookGeneratorInputSchema, bookGeneratorSchema, type BookGeneratorFormValues } from '../lib/schemas';

export const GeneratorPage = () => {
    // const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<BookGeneratorFormValues>({
        resolver: zodResolver(bookGeneratorInputSchema),
        defaultValues: {
            googleSheetUrl: '',
            selectedChapters: [],
            writerIntroduction: '',
            wordsPerChapter: '2500',
            languages: [{ id: 'en', label: 'English' }],
            enhancementPrompt: `Focus on clarity, engagement, and a professional tone. Improve the flow between paragraphs, add relevant examples or analogies where appropriate, and ensure the overall narrative is compelling and accessible to a broad audience.`,
        },
    });

    function onSubmit(data: BookGeneratorFormValues) {
        const result = bookGeneratorSchema.safeParse(data);
        if (result.success) {
            console.log("Processed Data:", result.data);
            toast({
                title: "Job Submitted!",
                description: "Your books are now being processed.",
            });
            // navigate('/processing/some-job-id');
        } else {
            console.error("Validation Errors:", result.error.flatten().fieldErrors);
            // Manually set form errors from Zod's flattened error object
            Object.entries(result.error.flatten().fieldErrors).forEach(([name, messages]) => {
                form.setError(name as keyof BookGeneratorFormValues, {
                    type: 'manual',
                    message: messages?.[0] || 'Invalid input',
                });
            });
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please check the highlighted fields and try again.",
            });
        }
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Generate Your Books</h1>
                <p className="text-muted-foreground">Configure your content source and AI settings.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                        {/* Left Column: Sheet Connector + Main Action Button */}
                        <div className="lg:col-span-3 flex flex-col gap-8">
                            <SheetConnector control={form.control} />
                            <Button type="submit" size="lg" className="w-full lg:w-auto lg:self-end">
                                Generate Books
                            </Button>
                        </div>

                        {/* Right Column: AI Configuration */}
                        <div className="lg:col-span-2">
                            <GenerationConfig control={form.control} />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};