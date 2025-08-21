// src/app/App.tsx
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/shared/components/ui/toaster';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { useAuthStore } from '@/shared/stores/auth';

function App() {
    const { isAuthenticated, user, logout } = useAuthStore();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="text-xl font-semibold">Books AI</Link>
                        <div>
                            {isAuthenticated ? (
                                <div className="flex items-center gap-4">
                                    <span>Welcome, {user?.name || 'User'}</span>
                                    <Button variant="outline" onClick={logout}>Logout</Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button asChild variant="ghost">
                                        <Link to="/auth/login">Log In</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link to="/auth/register">Sign Up</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Toaster />
        </div>
    );
}

export default App;