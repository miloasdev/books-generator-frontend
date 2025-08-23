// src/features/results/components/ResultStatCard.tsx
import * as React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

export interface ResultStatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    className?: string;
}

export const ResultStatCard = ({
                                   icon,
                                   title,
                                   value,
                                   className,
                               }: ResultStatCardProps) => {
    return (
        <Card className={cn('bg-card border border-border', className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="text-primary">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{value}</div>
            </CardContent>
        </Card>
    );
};
