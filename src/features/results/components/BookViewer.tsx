// src/features/results/components/BookViewer.tsx
import {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Sheet, SheetContent} from "@/shared/components/ui/sheet";
import {Button} from "@/shared/components/ui/button";
import {AnimatePresence, motion} from "framer-motion";
import type {BookDetail} from "@/shared/types/book";
import "@/shared/styles/book-prose.css";

interface BookViewerProps {
    book: BookDetail | null;
    isOpen: boolean;
    onClose: () => void;
}

export const BookViewer = ({book, isOpen, onClose}: BookViewerProps) => {
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState<"left" | "right">("right");

    if (!book) return null;

    // --- Pages array ---
    const pages = [
        {
            key: "title",
            content: (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <h1 className="font-serif text-5xl font-bold">{book.title}</h1>
                    <p className="italic text-muted-foreground">A Generated Work</p>
                    {book.tone && (
                        <p className="text-sm text-muted-foreground">Tone: {book.tone.name}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        Languages: {book.languages.map(l => l.code.toUpperCase()).join(", ") || "—"}
                    </p>
                </div>
            ),
        },
        {
            key: "foreword",
            content: (
                <section className="p-8 text-center max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl mb-4">Foreword</h2>
                    <hr className="border-t border-border my-4 w-1/3 mx-auto"/>
                    <p className="text-muted-foreground leading-relaxed">{book.writer_intro}</p>
                </section>
            ),
        },
        {
            key: "index",
            content: (
                <section className="p-8 max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl mb-6 text-center">Table of Contents</h2>
                    <ol className="space-y-3">
                        {book.chapters.map((c, idx) => (
                            <li key={c.id}>
                                <button
                                    onClick={() => setPage(3 + idx)}
                                    className="w-full flex items-center justify-between text-left hover:bg-muted/50 p-2 rounded-md transition"
                                >
                                    <span className="font-serif">{idx + 1}. {c.title}</span>
                                    <span className="text-sm text-muted-foreground">Page {idx + 4}</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </section>
            ),
        },
        ...book.chapters.map((chapter) => ({
            key: `chapter-${chapter.id}`,
            content: (
                <section className="p-6">
                    <h2 className="font-serif text-2xl mb-4">{chapter.title}</h2>
                    {chapter.status === "failed" ? (
                        <p className="text-red-500 italic">
                            {chapter.error_reason || "This chapter failed to generate."}
                        </p>
                    ) : (
                        <div className="book-prose">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {chapter.generated_content || "_No content was generated for this chapter._"}
                            </ReactMarkdown>
                        </div>
                    )}
                </section>
            ),
        })),
    ];

    // --- Motion variants ---
    const variants = {
        enter: (dir: "left" | "right") => ({
            x: dir === "right" ? 100 : -100,
            opacity: 0,
        }),
        center: {x: 0, opacity: 1},
        exit: (dir: "left" | "right") => ({
            x: dir === "right" ? -100 : 100,
            opacity: 0,
        }),
    };

    // --- Handlers ---
    const goPrev = () => {
        if (page > 0) {
            setDirection("left");
            setPage((p) => p - 1);
        }
    };

    const goNext = () => {
        if (page < pages.length - 1) {
            setDirection("right");
            setPage((p) => p + 1);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-3xl p-0 flex flex-col">
                {/* Page container with animation */}
                <div className="flex-1 overflow-hidden relative">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={pages[page].key}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{duration: 0.3}}
                            className="absolute inset-0 overflow-auto"
                        >
                            {pages[page].content}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex justify-between p-4 border-t">
                    <Button variant="outline" onClick={goPrev} disabled={page === 0}>
                        Previous
                    </Button>
                    <Button onClick={goNext} disabled={page === pages.length - 1}>
                        Next
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
