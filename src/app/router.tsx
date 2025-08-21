// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import { LoginPage, RegisterPage, ResetPasswordPage } from '@/features/auth/pages';
import { HomePage } from '@/pages';

// Temporary placeholder components
const Dashboard = () => <div>Dashboard (Coming Soon)</div>;

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
                        <Dashboard />
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