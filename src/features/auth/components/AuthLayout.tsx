// src/features/auth/components/AuthLayout.tsx
import * as React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
    return (
        <div className="max-w-md w-full mx-auto space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>
            {children}
        </div>
    );
};