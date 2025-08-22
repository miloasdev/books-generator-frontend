// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import { LoginPage, RegisterPage, ResetPasswordPage } from '@/features/auth/pages';
import { HomePage } from '@/pages';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { GeneratorPage } from '@/features/generator/pages/GeneratorPage'; // 1. Import the new page

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
            // 2. Add the new generator route
            {
                path: 'generator',
                element: (
                    <ProtectedRoute>
                        <GeneratorPage />
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