// src/features/processing/pages/ProcessingPage.tsx
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
import { ProcessingStep } from '../components/ProcessingStep';
import { Wand2 } from 'lucide-react';

const processSteps = [
    { title: "Reading Google Sheet", description: "Importing chapters from your spreadsheet." },
    { title: "Creating Combinations", description: "Generating unique book variations." },
    { title: "Enhancing with AI", description: "Improving readability and adding professional touches." },
    { title: "Adding Book Elements", description: "Creating intros, tables of content, and titles." },
    { title: "Translating Content", description: "Converting books to all selected languages." },
    { title: "Finalizing Documents", description: "Generating Google Docs and updating your sheet." }
];

const timeEstimates = [
    "5-6 minutes", "4-5 minutes", "3-4 minutes", "2-3 minutes", "1-2 minutes", "Almost done..."
];

export const ProcessingPage = () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const navigate = useNavigate();

    const isComplete = currentStep >= processSteps.length;

    React.useEffect(() => {
        if (isComplete) {
            setProgress(100);
            return; // Stop the timer when all steps are done
        }

        const timer = setTimeout(() => {
            setCurrentStep(step => step + 1);
            setProgress(p => p + (100 / processSteps.length));
        }, 3000); // Simulate each step taking 3 seconds

        return () => clearTimeout(timer);
    }, [currentStep, isComplete]);

    return (
        <div className="max-w-3xl mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Wand2 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">
                        {isComplete ? "Generation Complete!" : "Your Books are Being Generated"}
                    </CardTitle>
                    <CardDescription>
                        {isComplete
                            ? "Your AI-enhanced books are ready for review."
                            : "This may take a few minutes. We'll update you as the process continues."
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-5">
                        {processSteps.map((step, index) => (
                            <ProcessingStep
                                key={index}
                                stepNumber={index + 1}
                                title={step.title}
                                description={step.description}
                                status={
                                    index < currentStep ? 'complete' :
                                        index === currentStep && !isComplete ? 'active' :
                                            isComplete ? 'complete' : 'pending'
                                }
                            />
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pt-6">
                    {isComplete ? (
                        <Button size="lg" className="w-full" onClick={() => navigate('/results')}>
                            View Results
                        </Button>
                    ) : (
                        <>
                            <Progress value={progress} className="w-full" />
                            <div className="text-center text-sm text-muted-foreground">
                                <p>
                                    <strong>Estimated time remaining: </strong>
                                    {timeEstimates[currentStep] || 'Finalizing...'}
                                </p>
                            </div>
                        </>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};