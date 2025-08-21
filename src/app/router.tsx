import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';

// Temporary placeholder components
const Dashboard = () => <div>Dashboard (Coming Soon)</div>;
const Login = () => <div>Login Page</div>;

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

export const AppRouter = () => <RouterProvider router={router} />;