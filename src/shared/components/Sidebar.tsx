// src/shared/components/Sidebar.tsx
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

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
    const { isCollapsed } = useSidebarStore();

    const linkContent = (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    { 'justify-center': isCollapsed, 'bg-muted text-primary': isActive }
                )
            }
        >
            <Icon className="h-5 w-5" />
            <span className={cn('truncate', { 'hidden': isCollapsed })}>{label}</span>
        </NavLink>
    );

    if (isCollapsed) {
        return (
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return linkContent;
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
        <aside className={cn(
            "hidden border-r bg-muted/40 lg:flex lg:flex-col fixed inset-y-0 left-0 z-10 transition-all duration-300 ease-in-out",
            isCollapsed ? "w-20" : "w-64"
        )}>
            <div className="flex h-16 items-center border-b px-4 lg:px-6 justify-between">
                <Link to="/generator" className={cn("flex items-center gap-2 font-semibold", { 'justify-center w-full': isCollapsed })}>
                    <BookMarked className="h-6 w-6" />
                    <span className={cn({ 'hidden': isCollapsed })}>Books AI</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="rounded-full">
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </Button>
            </div>
            <nav className="flex-1 grid items-start px-2 text-sm font-medium lg:px-4 py-4">
                <NavItem to="/generator" icon={Wand2} label="Generator" />
            </nav>
            <div className="mt-auto p-4 border-t">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className={cn("flex items-center gap-3 w-full", isCollapsed ? 'justify-center h-12' : 'justify-start p-2 h-auto')}>
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user?.picture} alt={user?.name} />
                                <AvatarFallback>{user?.name?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
                            </Avatar>
                            <div className={cn("flex flex-col items-start", { 'hidden': isCollapsed })}>
                                <span className="font-semibold">{user?.name}</span>
                                <span className="text-xs text-muted-foreground">{user?.email}</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/dashboard">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
};
