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
            return;
        }
        const timer = setTimeout(() => {
            setCurrentStep(step => step + 1);
            setProgress(p => p + (100 / processSteps.length));
        }, 3000);
        return () => clearTimeout(timer);
    }, [currentStep, isComplete]);

    return (
        <div className="space-y-6">
            {/* Header - matches Dashboard */}
            <div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                    Processing Your Books
                </h1>
                <p className="text-muted-foreground">
                    This may take a few minutes. We'll keep you updated step‑by‑step.
                </p>
            </div>

            {/* Content - centered like Dashboard cards */}
            <div className="max-w-3xl mx-auto w-full">
                <Card className="bg-card border border-border">
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
                            {!isComplete && (
                                <>
                                    <Progress value={progress} className="w-full h-2 rounded-full" />
                                    <div className="text-center text-sm text-muted-foreground">
                                        <strong>Estimated time remaining: </strong>
                                        {timeEstimates[currentStep] || 'Finalizing...'}
                                    </div>
                                </>
                            )}
                            {isComplete && (
                                <Button size="lg" className="w-full lg:w-auto" onClick={() => navigate('/results')}>
                                    View Results
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </Card>
            </div>
        </div>
    );
};
