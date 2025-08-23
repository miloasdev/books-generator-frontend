import { Link, NavLink } from 'react-router-dom';
import { BookMarked } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/stores/auth';
import { Button } from '@/shared/components/ui/button';
import { UserNav } from '@/shared/components/UserNav';

export const Header = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <header className="sticky top-0 z-40 bg-background/95 supports-[backdrop-filter]:backdrop-blur-sm border-b border-border">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <BookMarked className="h-6 w-6 text-primary" />
                    <span>Books AI</span>
                </Link>

                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center gap-6">
                            {[
                                { to: '/dashboard', label: 'Dashboard' },
                                { to: '/generator', label: 'Generator' },
                                { to: '/settings', label: 'Settings' },
                            ].map(({ to, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        cn(
                                            'text-sm font-medium transition-colors',
                                            isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                                        )
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                        <UserNav />
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" asChild>
                            <Link to="/auth/login" className="text-sm font-medium">
                                Log In
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link to="/auth/register" className="text-sm font-medium">
                                Sign Up
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
};
