import { Link, NavLink } from 'react-router-dom';
import { Menu, BookMarked, Wand2, LayoutDashboard, Settings } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/shared/components/ui/sheet';
import { cn } from '@/shared/lib/utils';

export const MobileNav = () => {
    return (
        <header className="flex items-center h-16 px-4 border-b border-border bg-background lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5 text-foreground" />
                        <span className="sr-only">Open navigation</span>
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 bg-background border-r border-border p-4">
                    <nav className="flex flex-col space-y-4">
                        <Link to="/generator" className="flex items-center gap-2 text-lg font-semibold text-foreground mb-2">
                            <BookMarked className="h-6 w-6 text-primary" />
                            <span>Books AI</span>
                        </Link>

                        {[
                            { to: '/generator', icon: Wand2, label: 'Generator' },
                            { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                            { to: '/settings', icon: Settings, label: 'Settings' },
                        ].map(({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-accent text-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                                    )
                                }
                            >
                                <Icon className="h-5 w-5" />
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
};
