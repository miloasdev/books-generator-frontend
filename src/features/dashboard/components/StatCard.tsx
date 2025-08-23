import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    description: string;
}

export const StatCard = ({ title, value, icon, description }: StatCardProps) => {
    return (
        <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-primary">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
};