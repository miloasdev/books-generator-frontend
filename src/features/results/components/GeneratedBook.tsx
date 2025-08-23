// src/features/results/components/GeneratedBook.tsx
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils';

interface BookLanguage {
    name: string;
    code: string;
    link: string;
}

interface GeneratedBookProps {
    title: string;
    description: string;
    languages: BookLanguage[];
    className?: string;
    status?: 'completed' | 'processing' | 'failed';
}

export const GeneratedBook = ({
                                  title,
                                  description,
                                  languages,
                                  className,
                                  status = 'completed',
                              }: GeneratedBookProps) => {
    const statusLabel =
        status === 'completed' ? 'Completed' : status === 'processing' ? 'Processing' : 'Failed';
    const statusVariant =
        status === 'completed' ? 'secondary' : status === 'processing' ? 'outline' : 'destructive';

    return (
        <Card className={cn(className)}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <CardTitle className="text-lg font-semibold tracking-tight text-foreground truncate">
                            {title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            {description}
                        </CardDescription>
                    </div>
                    <Badge variant={statusVariant}>{statusLabel}</Badge>
                </div>
            </CardHeader>

            <CardContent className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {languages.map((lang) => (
                    <div
                        key={lang.code}
                        className="flex items-center justify-between gap-3 rounded-lg bg-muted p-3"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background text-sm font-semibold text-foreground">
                                {lang.code}
                            </div>
                            <span className="truncate text-sm font-medium text-foreground">{lang.name}</span>
                        </div>
                        <Link
                            to={lang.link}
                            className="shrink-0 text-sm font-medium text-primary hover:underline"
                        >
                            View Doc
                        </Link>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
