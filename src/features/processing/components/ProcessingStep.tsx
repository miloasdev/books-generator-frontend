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
        iconBg: 'bg-primary/20',
        iconColor: 'text-primary',
        textColor: 'text-primary',
    },
};

export const ProcessingStep = ({ title, description, status, stepNumber }: ProcessingStepProps) => {
    const styles = statusStyles[status];

    return (
        <div className={cn(
            "flex items-start gap-4 rounded-md p-3 transition-colors duration-300",
            status === 'active' && "bg-primary/5"
        )}>
            <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                styles.iconBg,
                styles.iconColor
            )}>
                {status === 'complete' && <Check className="h-5 w-5" />}
                {status === 'active' && <Loader2 className="h-5 w-5 animate-spin" />}
                {status === 'pending' && stepNumber}
            </div>
            <div className="flex-1">
                <h3 className={cn("font-sans font-semibold text-base", styles.textColor)}>{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};
