type QuoteProps = {
    className?: string
    quote: string
    auther: string
}

export const FamousQuote = ({className, quote, auther} : QuoteProps ) => {
    return (
        <div className={className}>
            <blockquote className="text-2xl font-serif italic text-foreground/80">
                "{quote}"
            </blockquote>
            <footer className="text-lg font-sans text-foreground/60">- {auther}</footer>
        </div>
    );
}