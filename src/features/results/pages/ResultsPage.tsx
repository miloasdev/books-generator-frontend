// src/features/results/pages/ResultsPage.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { GeneratedBook } from '../components/GeneratedBook';
import {Book, FileText, Languages, ListOrdered} from 'lucide-react';
import {ResultStatCard} from "@/features/results/components/ResultStatCard.tsx";

// Mock data to simulate the results of a generation job
const mockResults = {
    stats: {
        booksCreated: '3',
        totalDocuments: '9',
        languages: '3',
        totalChapters: '36',
    },
    books: [
        {
            title: 'The Complete Guide to Digital Success',
            description: 'Chapters: 1, 3, 5, 7, 9, 11 • ~15,000 words',
            languages: [
                { name: 'English', code: 'EN', link: '#' },
                { name: 'Traditional Chinese', code: 'ZH', link: '#' },
                { name: 'Simplified Chinese', code: '简', link: '#' },
            ],
        },
        {
            title: 'Mastering Modern Business Strategies',
            description: 'Chapters: 2, 4, 6, 8, 10, 12 • ~15,000 words',
            languages: [
                { name: 'English', code: 'EN', link: '#' },
                { name: 'Traditional Chinese', code: 'ZH', link: '#' },
                { name: 'Simplified Chinese', code: '简', link: '#' },
            ],
        },
    ],
};

export const ResultsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8">
            {/* Page Header - aligned with sidebar */}
            <div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                    Books Generated Successfully!
                </h1>
                <p className="text-muted-foreground">
                    Your AI‑enhanced books are ready. Documents have been created and links updated.
                </p>
            </div>

            {/* Main Content - centered */}
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ResultStatCard
                        title="Books Created"
                        value={mockResults.stats.booksCreated}
                        icon={<Book className="h-5 w-5" />}
                    />
                    <ResultStatCard
                        title="Total Documents"
                        value={mockResults.stats.totalDocuments}
                        icon={<FileText className="h-5 w-5" />}
                    />
                    <ResultStatCard
                        title="Languages Used"
                        value={mockResults.stats.languages}
                        icon={<Languages className="h-5 w-5" />}
                    />
                    <ResultStatCard
                        title="Chapters Processed"
                        value={mockResults.stats.totalChapters}
                        icon={<ListOrdered className="h-5 w-5" />}
                    />
                </div>

                {/* Generated Books List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Your Generated Books</h2>
                    {mockResults.books.map((book, index) => (
                        <GeneratedBook key={index} {...book} />
                    ))}
                </div>

                {/* Google Sheet Link Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Updated Google Sheet</CardTitle>
                        <CardDescription>
                            All generated book links have been added back to your spreadsheet.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                            <div className="flex items-center gap-4">
                                <FileText className="h-6 w-6 text-muted-foreground" />
                                <div>
                                    <h3 className="font-semibold">Your Original Google Sheet</h3>
                                    <p className="text-sm text-muted-foreground">Ready for you to review.</p>
                                </div>
                            </div>
                            <Button asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer">View Sheet</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                    <Button size="lg" onClick={() => navigate('/generator')}>Generate More Books</Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};
