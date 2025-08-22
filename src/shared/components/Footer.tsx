// src/shared/components/Footer.tsx
export const Footer = () => {
    return (
        <footer className="py-8 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Books AI. All rights reserved.</p>
            </div>
        </footer>
    );
};