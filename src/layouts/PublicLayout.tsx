// src/app/layouts/PublicLayout.tsx
import {Outlet} from 'react-router-dom';
import { Header } from '@/shared/components/Header';
import { Toaster } from '@/shared/components/ui/toaster';

export const PublicLayout = () => {
    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
                <Outlet />
            </div>
            <Toaster />
        </>
    );
};