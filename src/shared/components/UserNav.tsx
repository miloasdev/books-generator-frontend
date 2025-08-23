import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores/auth';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/components/ui/avatar';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';

export const UserNav = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full hover:text-foreground hover:bg-secondary" >
                    <Avatar className="h-8 w-8 border border-primary">
                        <AvatarImage src={user?.picture} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" forceMount className="w-56 bg-background border border-border">
                <DropdownMenuLabel className="px-4 py-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent/50 rounded-md"
                        >
                            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link
                            to="/settings"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent/50 rounded-md"
                        >
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} className="px-4 py-2 flex items-center gap-2 text-sm text-foreground hover:bg-accent/50 rounded-md">
                    <LogOut className="h-4 w-4 text-muted-foreground" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
