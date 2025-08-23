// src/features/auth/pages/LoginPage.tsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useAuthStore } from '@/shared/stores/auth';
import { useToast } from '@/shared/hooks/use-toast';
import { loginSchema, type LoginFormValues } from '@/features/auth/lib/schemas';
import { authService } from '../services/authService';
import { getErrorMessage } from "@/shared/lib";
import {useEffect} from "react";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 488 512">
        <path
            fill="currentColor"
            d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.4 76.4c-24.1-23.4-58.4-38-96.5-38-80.6 0-146.5 65.9-146.5 146.5s65.9 146.5 146.5 146.5c94.2 0 135.3-65.5 139.8-100.2H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        />
    </svg>
);

export const LoginPage = () => {
    const {isAuthenticated} = useAuthStore()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/generator', { replace: true });
        }
    }, [isAuthenticated, navigate])

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { login } = useAuthStore();
    const { toast } = useToast();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const data = await authService.login(values);
            toast({ title: 'Login Successful', description: `Welcome back!` });
            const user = { email: values.email, name: 'User' };
            login(user, data.access_token);
            navigate('/generator');
        } catch (error) {
            toast({ variant: 'destructive', title: 'Login Failed', description: getErrorMessage(error) });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Login
                                </Button>
                                <Button variant="outline" className="w-full" type="button">
                                    <GoogleIcon /> Login with Google
                                </Button>
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
                        <div className="text-center space-y-4">
                            <blockquote className="text-2xl font-serif italic text-foreground/80">
                                "The beautiful thing about writing is that you don't have to get it right the first time, unlike, say, a brain surgeon."
                            </blockquote>
                            <footer className="text-lg font-sans text-foreground/60">- Robert Cormier</footer>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
