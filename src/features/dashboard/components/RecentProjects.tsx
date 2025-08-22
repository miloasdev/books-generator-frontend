// src/features/dashboard/components/RecentProjects.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';

const projects = [
    {
        name: 'Digital Success Series',
        details: '3 books • 3 languages • Created 2 hours ago',
        stats: {
            words: '45,000 words',
            languages: 'EN, 中文, 简体',
            documents: '9 documents',
        },
    },
    {
        name: 'Business Strategy Collection',
        details: '5 books • 4 languages • Created 1 day ago',
        stats: {
            words: '75,000 words',
            languages: 'EN, 中文, हिंदी, Français',
            documents: '20 documents',
        },
    },
    {
        name: 'Self-Help Guide Series',
        details: '2 books • 2 languages • Created 3 days ago',
        stats: {
            words: '30,000 words',
            languages: 'EN, Español',
            documents: '4 documents',
        },
    },
];

export const RecentProjects = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>An overview of your latest work.</CardDescription>
                </div>
                <Button variant="link" className="pr-0">
                    Create New Project
                </Button>
            </CardHeader>
            <CardContent className="divide-y">
                {projects.map((project, index) => (
                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="font-semibold">{project.name}</h3>
                                <p className="text-sm text-muted-foreground">{project.details}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">Completed</Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>📊 {project.stats.words}</span>
                            <span>🌐 {project.stats.languages}</span>
                            <span>📄 {project.stats.documents}</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};