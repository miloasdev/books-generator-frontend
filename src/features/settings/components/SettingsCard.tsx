// src/features/settings/components/SettingsCard.tsx
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface SettingsCardProps {
    title: string;
    children: React.ReactNode;
}

export const SettingsCard = ({ title, children }: SettingsCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {children}
            </CardContent>
        </Card>
    );
};