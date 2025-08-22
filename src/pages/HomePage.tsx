// src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Footer } from "@/shared/components/Footer";

export const HomePage = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <main className="flex-grow flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto py-24">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            Transform Your Content into Multiple Books with AI
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Upload your Google Sheet content and let our AI create, shuffle, improve, and translate your work into multiple books across several languages.
                        </p>
                        <div className="mt-10">
                            <Button asChild size="lg">
                                <Link to="/auth/login">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};