// src/app/App.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from '@/shared/components/ui/toaster';
import { Sidebar } from '@/shared/components/Sidebar';
import { MobileNav } from '@/shared/components/MobileNav';
import { useAuthStore } from '@/shared/stores/auth';
import { useSidebarStore } from '@/shared/stores/use-sidebar';
import { cn } from '@/shared/lib/utils';

const AuthRoutes = ['/auth/login', '/auth/register', '/auth/reset-password'];

function App() {
    const { isAuthenticated } = useAuthStore();
    const { isCollapsed } = useSidebarStore();
    const location = useLocation();

    const isAuthPage = AuthRoutes.includes(location.pathname);
    const isHomePage = location.pathname === '/';

    if (isAuthPage) {
        return (
            <>
                <Outlet />
                <Toaster />
            </>
        );
    }

    if (isHomePage && !isAuthenticated) {
        return (
            <>
                <Outlet />
                <Toaster />
            </>
        );
    }


    return (
        <div className="min-h-screen w-full">
            <Sidebar />
            <div className={cn(
                "flex flex-col transition-all duration-300 ease-in-out",
                isAuthenticated ? (isCollapsed ? "lg:ml-20" : "lg:ml-64") : ""
            )}>
                <MobileNav />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
                    <Outlet />
                </main>
            </div>
            <Toaster />
        </div>
    );
}

export default App;
