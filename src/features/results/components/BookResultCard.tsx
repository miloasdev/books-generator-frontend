// src/features/results/components/BookResultCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { BookDetail } from "@/shared/types/book";

type Props = {
  book: BookDetail;
  onView: () => void;
  onExport: () => void;
  exporting?: boolean;
  className?: string;
};

const statusVariant: Record<BookDetail["status"], "secondary" | "destructive" | "outline"> = {
  done: "secondary",
  partial: "destructive",
  pending: "outline",
  generating: "outline",
};

export function BookResultCard({ book, onView, onExport, exporting, className }: Props) {
  const estWords = book.chapters.length * book.words_per_chapter;

  return (
    <Card className={cn("bg-card border border-border", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="font-serif text-xl tracking-tight text-foreground">
              Book #{book.id}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {/* show a short foreword snippet as description */}
              {book.writer_intro}
            </CardDescription>
          </div>
          <Badge variant={statusVariant[book.status]} className="shrink-0 capitalize">
            {book.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-lg bg-muted p-3 text-sm">
          <div className="text-muted-foreground">Chapters</div>
          <div className="font-medium text-foreground">{book.chapters.length}</div>
        </div>
        <div className="rounded-lg bg-muted p-3 text-sm">
          <div className="text-muted-foreground">Languages</div>
          <div className="font-medium text-foreground">
            {book.languages.map(l => l.code.toUpperCase()).join(", ") || "—"}
          </div>
        </div>
        <div className="rounded-lg bg-muted p-3 text-sm">
          <div className="text-muted-foreground">Estimated Words</div>
          <div className="font-medium text-foreground">~{estWords.toLocaleString()}</div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3">
        <Button size="lg" onClick={onView}>View Book</Button>
        <Button size="lg" variant="outline" onClick={onExport} disabled={exporting}>
          {exporting ? "Exporting..." : "Export"}
        </Button>
      </CardFooter>
    </Card>
  );
}
