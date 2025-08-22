// src/shared/components/Header.tsx
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores/auth';
import { Button } from '@/shared/components/ui/button';
import { UserNav } from './UserNav';
import { BookMarked } from 'lucide-react';
import { cn } from '../lib';

export const Header = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                    <BookMarked className="h-6 w-6" />
                    <span>Books AI</span>
                </Link>

                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                            <NavLink to="/dashboard" className={({isActive}) => cn("text-muted-foreground transition-colors hover:text-foreground", isActive && "text-foreground")}>
                                Dashboard
                            </NavLink>
                            <NavLink to="/generator" className={({isActive}) => cn("text-muted-foreground transition-colors hover:text-foreground", isActive && "text-foreground")}>
                                Generator
                            </NavLink>
                            <NavLink to="/settings" className={({isActive}) => cn("text-muted-foreground transition-colors hover:text-foreground", isActive && "text-foreground")}>
                                Settings
                            </NavLink>
                        </nav>
                        <UserNav />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost">
                            <Link to="/auth/login">Log In</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/auth/register">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
};