// src/pages/HomePage.tsx
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <div className="text-center flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold mb-4">Welcome to Books AI</h1>
            <p className="text-xl text-gray-600 mb-8">
                Your personal assistant for turning great ideas into incredible books.
            </p>
            <div className="flex gap-4">
                <Button asChild size="lg">
                    <Link to="/auth/login">Get Started</Link>
                </Button>
            </div>
        </div>
    );
};