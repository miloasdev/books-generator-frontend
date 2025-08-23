export const Footer = () => {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Books AI. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
