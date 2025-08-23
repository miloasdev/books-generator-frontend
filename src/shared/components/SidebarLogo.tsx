import {cn} from "@/shared/lib";
import {BookMarked} from "lucide-react";
import {Link} from "react-router-dom";
import {useAuthStore} from "@/shared/stores/auth.ts";

export const SidebarLogo = ({isCollapsed} : {isCollapsed: boolean}) => {
    const { isAuthenticated } = useAuthStore();
    const target = isAuthenticated ? '/generator' : '/';

    return (
        <Link to={target} className={cn('flex items-center gap-2', { 'justify-center w-full': isCollapsed })}>
            <BookMarked className="h-6 w-6 text-primary" />
            {!isCollapsed && <span className="text-lg font-serif font-semibold text-foreground">Books AI</span>}
        </Link>
    )
}