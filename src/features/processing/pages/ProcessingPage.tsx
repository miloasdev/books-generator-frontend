// src/features/processing/pages/ProcessingPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { Wand2 } from "lucide-react";
import { useBookStatus } from "../hooks/useProcessingQueries";
import { ChapterStatusCard } from "../components/ChapterStatusCard";
import { Button } from "@/shared/components/ui/button";

export const ProcessingPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: response } = useBookStatus(bookId ? Number(bookId) : undefined);

  const bookData = response && response.success ? response.data : null;

  const {
    book_status = "generating",
    done_count = 0,
    failed_count = 0,
    total_count = 1,
    chapters = [],
  } = bookData || {};

  const progress = total_count > 0 ? (done_count / total_count) * 100 : 0;
  const isComplete = book_status === "done" || book_status === "partial";
  const processing_count = total_count - done_count - failed_count;

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
          Processing Your Book
        </h1>
        <p className="text-muted-foreground">
          Each chapter is generated independently. Status updates in real-time.
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <Card className="bg-card border border-border h-[80vh] flex flex-col">
          {/* Header */}
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Wand2 className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="font-serif text-2xl">
              {isComplete ? "Book Generation Completed" : "Chapters in Progress"}
            </CardTitle>
            <CardDescription>
              {isComplete
                ? "You can now view the results of your book."
                : "Chapters are being processed in parallel."}
            </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent className="flex flex-col flex-1 overflow-hidden">
            {/* Summary */}
            <div className="flex items-center justify-around border rounded-md py-2 mb-4 bg-muted/30 text-sm font-medium">
              <span>Total: {total_count}</span>
              <span className="text-green-600">Done: {done_count}</span>
              <span className="text-red-600">Failed: {failed_count}</span>
              <span className="text-primary">Processing: {processing_count}</span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <Progress value={progress} className="w-full h-2 rounded-full" />
              <div className="text-center text-xs text-muted-foreground mt-1">
                {book_status} ({done_count}/{total_count} chapters completed)
              </div>
            </div>

            {/* Scrollable chapter list */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              {chapters.map((ch, i) => (
                <ChapterStatusCard key={i} title={ch.title} status={ch.status} />
              ))}
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex justify-center pt-4">
            {isComplete && (
              <Button
                size="lg"
                className="w-full lg:w-auto"
                onClick={() => navigate(`/results/${bookId}`)}
              >
                View Results
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
