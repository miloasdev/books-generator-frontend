// src/features/processing/pages/ProcessingPage.tsx
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
import { ProcessingStep } from '../components/ProcessingStep';
import { Wand2 } from 'lucide-react';
import { useBookStatus } from '../hooks/useProcessingQueries'; // 👈 IMPORT THE NEW HOOK

const processSteps = [
    { title: "Reading Google Sheet", description: "Importing chapters from your spreadsheet." },
    { title: "Creating Combinations", description: "Generating unique book variations." },
    { title: "Enhancing with AI", description: "Improving readability and adding professional touches." },
    { title: "Adding Book Elements", description: "Creating intros, tables of content, and titles." },
    { title: "Translating Content", description: "Converting books to all selected languages." },
    { title: "Finalizing Documents", description: "Generating Google Docs and updating your sheet." }
];

export const ProcessingPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    // 👇 USE THE NEW HOOK
    const { data: response } = useBookStatus(bookId ? Number(bookId) : undefined);

    const statusData = response?.data?.data;

    React.useEffect(() => {
        if (statusData) {
            const { book_status } = statusData;
            if (book_status === 'done' || book_status === 'partial') {
                navigate(`/results/${bookId}`);
            }
        }
    }, [statusData, navigate, bookId]);

    const {
        book_status = 'generating',
        done_count = 0,
        total_count = 1,
    } = statusData || {};

    const progress = (done_count / total_count) * 100;
    const isComplete = book_status === 'done' || book_status === 'partial';

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                    Processing Your Books
                </h1>
                <p className="text-muted-foreground">
                    This may take a few minutes. We'll keep you updated step‑by‑step.
                </p>
            </div>
            <div className="max-w-3xl mx-auto w-full">
                <Card className="bg-card border border-border">
                    <CardHeader className="flex flex-col items-center text-center space-y-4">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                            <Wand2 className="h-7 w-7 text-primary" />
                        </div>
                        <CardTitle className="font-serif text-2xl">
                            {isComplete ? "All Steps Completed" : "In Progress"}
                        </CardTitle>
                        <CardDescription>
                            {isComplete
                                ? "You can now view and download your generated books."
                                : "Follow the progress below as we prepare your content."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-5">
                            {processSteps.map((step, index) => {
                                const currentStepIndex = Math.floor((progress / 100) * processSteps.length);
                                return (
                                    <ProcessingStep
                                        key={index}
                                        stepNumber={index + 1}
                                        title={step.title}
                                        description={step.description}
                                        status={
                                            index < currentStepIndex ? 'complete' :
                                            index === currentStepIndex && !isComplete ? 'active' :
                                            'pending'
                                        }
                                    />
                                );
                            })}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-6">
                        {!isComplete && (
                            <>
                                <Progress value={progress} className="w-full h-2 rounded-full" />
                                <div className="text-center text-sm text-muted-foreground">
                                    <strong>Status: </strong>
                                    {book_status} ({done_count}/{total_count} Chapters)
                                </div>
                            </>
                        )}
                        {isComplete && (
                            <Button size="lg" className="w-full lg:w-auto" onClick={() => navigate(`/results/${bookId}`)}>
                                View Results
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};