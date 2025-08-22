// src/features/dashboard/components/QuickActions.tsx
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { PlusCircle, FileText, Settings } from 'lucide-react';

export const QuickActions = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                    <Link to="/generator">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Book Project
                    </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full justify-start">
                    <Link to="/documents">
                        <FileText className="mr-2 h-4 w-4" />
                        View All Documents
                    </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full justify-start">
                    <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};