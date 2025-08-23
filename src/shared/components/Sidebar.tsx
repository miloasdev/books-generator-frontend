// src/shared/components/Sidebar.tsx
import * as React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    BookMarked,
    LayoutDashboard,
    Settings,
    Wand2,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/stores/auth';
import { useSidebarStore } from '@/shared/stores/use-sidebar';
import { Button } from '@/shared/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';

interface NavItemProps {
    to: string;
    icon: React.ElementType;
    label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
    const { isCollapsed } = useSidebarStore();

    const link = (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    'group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    {
                        // Active state
                        'bg-accent text-secondary': isActive,
                        // Inactive state
                        'text-foreground hover:bg-accent/50 hover:text-primary': !isActive,
                        // Collapse
                        'justify-center': isCollapsed,
                    }
                )
            }
        >
            <Icon
                className={cn('h-5 w-5 transition-colors', {
                    'text-primary': useSidebarStore().isCollapsed ? false : undefined,
                })}
            />
            {!isCollapsed && <span className="ml-3 truncate">{label}</span>}
        </NavLink>
    );

    if (isCollapsed) {
        return (
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>{link}</TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return link;
};

export const Sidebar = () => {
    const { user, logout } = useAuthStore();
    const { isCollapsed, toggleSidebar } = useSidebarStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-10 flex flex-col bg-background border-r border-border transition-all duration-300',
                { 'w-20': isCollapsed, 'w-64': !isCollapsed }
            )}
        >
            {/* Logo + Toggle */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                <Link to={'/'} className={cn('flex items-center gap-2', { 'justify-center w-full': isCollapsed })}>
                    <BookMarked className="h-6 w-6 text-primary" />
                    {!isCollapsed && <span className="text-lg font-serif font-semibold text-foreground">Books AI</span>}
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground"
                    onClick={toggleSidebar}
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
                <NavItem to="/generator" icon={Wand2} label="Generator" />
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            </nav>

            {/* User Menu */}
            <div className="px-4 py-4 border-t border-border">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className={cn(
                                'flex items-center w-full transition-colors',
                                {
                                    'justify-center h-12': isCollapsed,
                                    'justify-start gap-3 p-2 h-auto': !isCollapsed,
                                }
                            )}
                        >
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user?.picture} alt={user?.name} />
                                <AvatarFallback>{user?.name?.[0].toUpperCase() || 'U'}</AvatarFallback>
                            </Avatar>
                            {!isCollapsed && (
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-medium text-foreground">{user?.name}</span>
                                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                                </div>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" forceMount className="w-56">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/settings">
                                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
};
