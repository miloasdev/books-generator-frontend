// src/features/results/components/BookResultCard.tsx
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {Badge} from "@/shared/components/ui/badge";
import {Button} from "@/shared/components/ui/button";
import {cn} from "@/shared/lib/utils";
import type {BookDetail} from "@/shared/types/book";

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

export function BookResultCard({book, onView, onExport, exporting, className}: Props) {
    const estWords = book.chapters.length * book.words_per_chapter;

    return (
        <Card className={cn("bg-card border border-border", className)}>
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-sans text-xl font-semibold truncate">
                    {book.title}
                </CardTitle>
                <Badge variant={statusVariant[book.status]} className="capitalize">
                    {book.status}
                </Badge>
            </CardHeader>

            {/* Compact but distinct info blocks */}
            <CardContent className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-md bg-muted p-2">
                    <div className="text-muted-foreground">Chapters</div>
                    <div className="font-medium">{book.chapters.length}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                    <div className="text-muted-foreground">Languages</div>
                    <div className="font-medium">
                        {book.languages.map(l => l.code.toUpperCase()).join(", ") || "—"}
                    </div>
                </div>
                <div className="rounded-md bg-muted p-2">
                    <div className="text-muted-foreground">Words</div>
                    <div className="font-medium">~{estWords.toLocaleString()}</div>
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex justify-end gap-3">
                <Button onClick={onView} className="px-6">
                    View
                </Button>
                <Button
                    variant="outline"
                    onClick={onExport}
                    disabled={exporting}
                    className="px-6"
                >
                    {exporting ? "Exporting..." : "Export"}
                </Button>
            </CardFooter>
        </Card>
    );
}
