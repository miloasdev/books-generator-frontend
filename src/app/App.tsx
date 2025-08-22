// src/app/App.tsx
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/shared/components/ui/toaster';
import { Header } from '@/shared/components/Header';

function App() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Toaster />
        </div>
    );
}

export default App;