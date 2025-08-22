// src/features/results/components/ResultStatCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface ResultStatCardProps {
    title: string;
    value: string;
}

export const ResultStatCard = ({ title, value }: ResultStatCardProps) => {
    return (
        <Card className="text-center">
            <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{title}</p>
            </CardContent>
        </Card>
    );
};