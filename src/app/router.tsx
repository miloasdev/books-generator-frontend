// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import { HomePage } from '@/pages';
import { LoginPage, RegisterPage, ResetPasswordPage } from '@/features/auth/pages';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { GeneratorPage } from '@/features/generator/pages/GeneratorPage';
import { ProcessingPage } from '@/features/processing/pages/ProcessingPage';
import { ResultsPage } from '@/features/results/pages/ResultsPage';
import { SettingsPage } from '@/features/settings/pages/SettingsPage';
import { PublicLayout } from "@/layouts/PublicLayout.tsx";
import { ProtectedLayout } from "@/layouts/ProtectedLayout.tsx";
import { SocialCallback } from "@/features/auth/pages/SocialCallbackPage.tsx";

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'auth/login', element: <LoginPage /> },
            { path: 'auth/register', element: <RegisterPage /> },
            { path: 'auth/reset-password', element: <ResetPasswordPage /> },
            { path: 'auth/social/callback', element: <SocialCallback />}
        ]
    },
    {
        // 👇 This is the new structure
        element: <ProtectedRoute />,
        children: [
            {
                element: <ProtectedLayout />,
                children: [
                    { path: 'dashboard', element: <DashboardPage /> },
                    { path: 'generator', element: <GeneratorPage /> },
                    { path: 'processing', element: <ProcessingPage /> },
                    { path: 'results', element: <ResultsPage /> },
                    { path: 'settings', element: <SettingsPage /> }
                ]
            }
        ]
    }
]);