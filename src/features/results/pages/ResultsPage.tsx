// src/features/results/pages/ResultsPage.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { ResultStatCard } from '../components/ResultStatCard';
import { BookViewer } from '../components/BookViewer';
import { useBookDetails } from '../hooks/useResultsQueries';
import { Book, FileText, Languages, ListOrdered, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';

export const ResultsPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isViewerOpen, setViewerOpen] = useState(false);

    const { data: response, isLoading, isError, error } = useBookDetails(bookId ? Number(bookId) : undefined);
    const book = response?.data?.success ? response.data.data : null;

    const handleExport = () => {
        // This is where you would call the real export API
        toast({
            title: "Export Not Implemented",
            description: "Export to Google Docs is coming soon.",
            variant: "default",
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Loading your book...</p>
            </div>
        );
    }

    if (isError || !book) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <AlertTriangle className="h-12 w-12 text-destructive" />
                <h2 className="mt-4 text-2xl font-bold">Failed to Load Book</h2>
                <p className="mt-2 text-muted-foreground">
                    There was an error retrieving the book details. Please try again later.
                </p>
                <p className="text-sm text-red-500 mt-2">{error?.message}</p>
            </div>
        );
    }

    const totalWords = book.chapters.length * book.words_per_chapter;

    return (
        <>
            <div className="space-y-8">
                {/* Page Header */}
                <div>
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                        Books Generated Successfully!
                    </h1>
                    <p className="text-muted-foreground">
                        Your AI-enhanced book is ready to be reviewed and exported.
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <ResultStatCard
                            title="Book Title"
                            value={book.writer_intro}
                            icon={<Book className="h-5 w-5" />}
                        />
                        <ResultStatCard
                            title="Total Words"
                            value={`~${totalWords.toLocaleString()}`}
                            icon={<FileText className="h-5 w-5" />}
                        />
                        <ResultStatCard
                            title="Languages"
                            value={book.languages.length.toString()}
                            icon={<Languages className="h-5 w-5" />}
                        />
                        <ResultStatCard
                            title="Chapters"
                            value={book.chapters.length.toString()}
                            icon={<ListOrdered className="h-5 w-5" />}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 pt-4">
                        <Button size="lg" onClick={() => setViewerOpen(true)}>View Book</Button>
                        <Button size="lg" variant="outline" onClick={handleExport}>
                            Export (Coming Soon)
                        </Button>
                    </div>
                     <div className="flex justify-center gap-4 pt-4">
                        <Button size="lg" onClick={() => navigate('/generator')}>Generate More Books</Button>
                        <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>

            {/* Book Viewer Sheet */}
            <BookViewer
                book={book}
                isOpen={isViewerOpen}
                onClose={() => setViewerOpen(false)}
            />
        </>
    );
};