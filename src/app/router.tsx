// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import { LoginPage, RegisterPage, ResetPasswordPage } from '@/features/auth/pages';
import { HomePage } from '@/pages';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { GeneratorPage } from '@/features/generator/pages/GeneratorPage';
import {ProcessingPage} from "@/features/processing/pages/ProcessingPage.tsx";
import {ResultsPage} from "@/features/results/pages/ResultsPage.tsx";
import {SettingsPage} from "@/features/settings/pages/SettingsPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'generator',
                element: (
                    <ProtectedRoute>
                        <GeneratorPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'processing',
                element: (
                    <ProtectedRoute>
                        <ProcessingPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'results',
                element: (
                    <ProtectedRoute>
                        <ResultsPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'settings',
                element: (
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'auth/login',
                element: <LoginPage />
            },
            {
                path: 'auth/register',
                element: <RegisterPage />
            },
            {
                path: 'auth/reset-password',
                element: <ResetPasswordPage />
            }
        ]
    }
]);