// src/features/dashboard/components/UsageStats.tsx
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';

const UsageItem = ({ title, value, max, progress }: { title: string, value: string, max: string, progress: number }) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">{title}</span>
            <span className="font-medium">{value} / {max}</span>
        </div>
        <Progress value={progress} />
    </div>
);

export const UsageStats = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <UsageItem title="Books Generated" value="12" max="50" progress={24} />
                <UsageItem title="Words Processed" value="180K" max="500K" progress={36} />
                <UsageItem title="Translations" value="36" max="200" progress={18} />
            </CardContent>
        </Card>
    );
};