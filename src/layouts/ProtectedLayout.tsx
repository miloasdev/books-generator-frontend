// src/app/layouts/ProtectedLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/shared/components/Sidebar';
import { MobileNav } from '@/shared/components/MobileNav';
import { Toaster } from '@/shared/components/ui/toaster';
import { useSidebarStore } from '@/shared/stores/use-sidebar.ts';
import { cn } from '@/shared/lib/utils';

export const ProtectedLayout = () => {
    const { isCollapsed } = useSidebarStore();

    return (
        <div className="min-h-screen w-full">
            <Sidebar />
            <div
                className={cn(
                    'flex flex-col transition-all duration-300 ease-in-out',
                    isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
                )}
            >
                <MobileNav />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
                    <Outlet />
                </main>
            </div>
            <Toaster />
        </div>
    );
};
