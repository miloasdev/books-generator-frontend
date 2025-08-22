// src/features/results/pages/ResultsPage.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ResultStatCard } from '../components/ResultStatCard';
import { GeneratedBook } from '../components/GeneratedBook';
import { Check, FileText } from 'lucide-react';

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
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Success Header */}
            <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Books Generated Successfully!</h1>
                <p className="text-muted-foreground">
                    Your AI-enhanced books are ready. Documents have been created and links updated.
                </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ResultStatCard title="Books Created" value={mockResults.stats.booksCreated} />
                <ResultStatCard title="Total Documents" value={mockResults.stats.totalDocuments} />
                <ResultStatCard title="Languages Used" value={mockResults.stats.languages} />
                <ResultStatCard title="Chapters Processed" value={mockResults.stats.totalChapters} />
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
                    <CardDescription>All generated book links have been added back to your spreadsheet.</CardDescription>
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
    );
};