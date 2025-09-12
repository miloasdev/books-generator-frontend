// src/features/results/pages/ResultsPage.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ResultStatCard } from "../components/ResultStatCard";
import { BookViewer } from "../components/BookViewer";
import { useBookDetails, useBookMutations } from "../hooks/useResultsQueries";
import { FileText, Languages, ListOrdered, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { BookResultCard } from "../components/BookResultCard";

export const ResultsPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [isViewerOpen, setViewerOpen] = useState(false);
  const numericBookId = bookId ? Number(bookId) : undefined;

  const { data: response, isLoading, isError, error } = useBookDetails(numericBookId);
  const { exportBook, isExporting } = useBookMutations(numericBookId!);

  const book = response?.data.success ? response.data.data : null;

    console.log("Book Details", book)

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
        {/* Page title + status */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
              Results
            </h1>
            <p className="text-muted-foreground">
              Review your generated book and export when ready.
            </p>
          </div>
        </div>

       {/* Stats row */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
            <ResultStatCard
            title="Books"
            value={"1"} // hardcoded for now, replace with dynamic later
            icon={<FileText className="h-5 w-5" />}
          />
          <ResultStatCard
            title="Chapters"
            value={book.chapters.length.toString()}
            icon={<ListOrdered className="h-5 w-5" />}
          />
            <ResultStatCard
            title="Estimated Words"
            value={`~${totalWords.toLocaleString()}`}
            icon={<FileText className="h-5 w-5" />}
          />
          <ResultStatCard
            title="Tone"
            value={book.tone?.name ?? "—"}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <ResultStatCard
            title="Languages"
            value={book.languages.length.toString()}
            icon={<Languages className="h-5 w-5" />}
          />
        </div>

        {/* Books list (scales to multiple later) */}
        <div className="max-w-6xl mx-auto grid gap-6">
          <BookResultCard
            book={book}
            onView={() => setViewerOpen(true)}
            onExport={() => exportBook()}
            exporting={isExporting}
          />
        </div>

        {/* Secondary nav buttons */}
        <div className="max-w-6xl mx-auto flex justify-center gap-4 pt-2">
          <Button size="lg" onClick={() => navigate("/generator")}>Generate More Books</Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Viewer (step 2 we’ll refine markdown styles) */}
      <BookViewer
        book={book}
        isOpen={isViewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
};
