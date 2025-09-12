// src/features/results/components/BookViewer.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/shared/components/ui/sheet";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Badge } from "@/shared/components/ui/badge";
import type { BookDetail } from "@/shared/types/book";

interface BookViewerProps {
  book: BookDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookViewer = ({ book, isOpen, onClose }: BookViewerProps) => {
  if (!book) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* keep p-0 so we control inner spacing */}
      <SheetContent className="w-full sm:max-w-3xl p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="mb-6">
              {/* Keep this short; full foreword is below */}
              <SheetTitle className="font-serif text-2xl">Preview</SheetTitle>
              <SheetDescription>Quick look at your generated chapters.</SheetDescription>
            </SheetHeader>

            {/* Foreword / writer intro */}
            <section className="mb-8">
              <h2 className="font-serif text-xl mb-2">Foreword</h2>
              <p className="text-muted-foreground leading-relaxed">
                {book.writer_intro}
              </p>
            </section>

            {/* Markdown area — scoped styles only here */}
            <article
              className="
                prose prose-zinc dark:prose-invert max-w-none
                prose-headings:font-serif
                prose-h1:text-3xl prose-h1:mb-4
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
                prose-p:leading-relaxed
                prose-ul:list-disc prose-ol:list-decimal
                prose-pre:rounded-lg prose-pre:p-4
                prose-img:rounded-lg
              "
            >
              {book.chapters.map((chapter) => (
                <section key={chapter.id} className="mb-10 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    {chapter.status === "failed" && (
                      <Badge variant="destructive" className="shrink-0">Failed</Badge>
                    )}
                  </div>

                  {chapter.status === "failed" ? (
                    <p className="text-sm text-red-600 dark:text-red-500 italic">
                      {chapter.error_reason || "This chapter failed to generate."}
                    </p>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {chapter.generated_content || "_No content was generated for this chapter._"}
                    </ReactMarkdown>
                  )}
                </section>
              ))}
            </article>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
