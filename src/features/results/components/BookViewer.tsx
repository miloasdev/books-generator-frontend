// src/features/results/components/BookViewer.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/shared/components/ui/sheet';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import type { BookDetail } from '@/shared/types/book';

interface BookViewerProps {
    book: BookDetail | null;
    isOpen: boolean;
    onClose: () => void;
}

export const BookViewer = ({ book, isOpen, onClose }: BookViewerProps) => {
    if (!book) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-3xl p-0">
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="font-serif text-2xl">{book.writer_intro || 'Generated Book'}</SheetTitle>
                            <SheetDescription>
                                A preview of your generated content.
                            </SheetDescription>
                        </SheetHeader>
                        <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
                            {book.chapters.map((chapter) => (
                                <section key={chapter.id} className="mb-8 last:mb-0">
                                    <h2 className="font-serif !mb-4">{chapter.title}</h2>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {chapter.generated_content || '*No content was generated for this chapter.*'}
                                    </ReactMarkdown>
                                </section>
                            ))}
                        </article>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};