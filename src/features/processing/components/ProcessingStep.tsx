// src/features/processing/components/ProcessingStep.tsx
import { cn } from '@/shared/lib/utils';
import { Check, Loader2 } from 'lucide-react';

type Status = 'pending' | 'active' | 'complete';

interface ProcessingStepProps {
    title: string;
    description: string;
    status: Status;
    stepNumber: number;
}

const statusStyles = {
    pending: {
        iconBg: 'bg-muted',
        iconColor: 'text-muted-foreground',
        textColor: 'text-muted-foreground',
    },
    active: {
        iconBg: 'bg-primary',
        iconColor: 'text-primary-foreground',
        textColor: 'text-primary',
    },
    complete: {
        iconBg: 'bg-green-500',
        iconColor: 'text-white',
        textColor: 'text-green-600',
    },
};

export const ProcessingStep = ({ title, description, status, stepNumber }: ProcessingStepProps) => {
    const styles = statusStyles[status];

    return (
        <div className={cn("flex items-start gap-4 transition-opacity duration-300", status === 'pending' ? 'opacity-50' : 'opacity-100')}>
            <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                styles.iconBg,
                styles.iconColor
            )}>
                {status === 'complete' && <Check className="h-5 w-5" />}
                {status === 'active' && <Loader2 className="h-5 w-5 animate-spin" />}
                {status === 'pending' && stepNumber}
            </div>
            <div className="flex-1 pt-1">
                <h3 className={cn("font-semibold transition-colors duration-300", styles.textColor)}>{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};