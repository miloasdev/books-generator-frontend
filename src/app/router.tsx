// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { LoginPage, RegisterPage, ResetPasswordPage } from '@/features/auth/pages';
import { HomePage } from '@/pages';
import {DashboardPage} from "@/features/dashboard/pages/DashboardPages.tsx";

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