// src/shared/components/MobileNav.tsx
import { Link, NavLink } from 'react-router-dom';
import {
    BookMarked,
    LayoutDashboard,
    Menu,
    Settings,
    Wand2,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet';
import { cn } from '../lib';

export const MobileNav = () => {
    return (
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link to="/generator" className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <BookMarked className="h-6 w-6" />
                            <span>Books AI</span>
                        </Link>
                        <NavLink
                            to="/generator"
                            className={({isActive}) => cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive && "bg-muted text-foreground")}
                        >
                            <Wand2 className="h-5 w-5" />
                            Generator
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className={({isActive}) => cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive && "bg-muted text-foreground")}
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({isActive}) => cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive && "bg-muted text-foreground")}
                        >
                            <Settings className="h-5 w-5" />
                            Settings
                        </NavLink>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
};
