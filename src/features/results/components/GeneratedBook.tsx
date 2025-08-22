// src/features/results/components/GeneratedBook.tsx
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';

interface BookLanguage {
    name: string;
    code: string;
    link: string;
}

interface GeneratedBookProps {
    title: string;
    description: string;
    languages: BookLanguage[];
}

export const GeneratedBook = ({ title, description, languages }: GeneratedBookProps) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                </div>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4">
                {languages.map((lang) => (
                    <div key={lang.code} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background text-sm font-semibold">
                                {lang.code}
                            </div>
                            <span className="text-sm font-medium">{lang.name}</span>
                        </div>
                        <Link to={lang.link} className="text-sm font-medium text-primary hover:underline">
                            View Doc
                        </Link>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};