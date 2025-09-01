// src/features/auth/pages/LoginPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useAuthStore } from '@/shared/stores/auth';
import { loginSchema, type LoginFormValues } from '@/features/auth/lib/schemas';
import { useEffect } from "react";
import { FamousQuote } from "@/features/auth/components/FamousQuote.tsx";
import { GoogleAuthButton } from "@/features/auth/components/GoogleAuthButton.tsx";
import { useAuthMutations } from '../hooks/useAuthMutations'; // 👈 Import the hook

export const LoginPage = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const { login, isLoggingIn } = useAuthMutations(); // 👈 Use the hook

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    // The onSubmit function is now just one line!
    const onSubmit = (values: LoginFormValues) => {
        login(values);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/generator', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <Card className="w-full max-w-3xl">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-serif">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    <div className="flex flex-col justify-center h-full">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="m@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel>Password</FormLabel>
                                                <Link to="/auth/reset-password" className="ml-auto inline-block text-sm underline">
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                                    {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Login
                                </Button>
                                <GoogleAuthButton />
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{' '}
                                    <Link to="/auth/register" className="underline">
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div className="flex flex-col justify-center h-full p-4">
                        <FamousQuote
                            className={"text-center space-y-4"}
                            quote={"The beautiful thing about writing is that you don't have to get it right the first time, unlike, say, a brain surgeon."}
                            auther={"Robert Cormier"}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};