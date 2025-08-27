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
import { getErrorMessage } from "@/shared/lib";
import {useEffect} from "react";
import {GoogleIcon} from "@/features/auth/components/GoogleIcon.tsx";
import {FamousQuote} from "@/features/auth/components/FamousQuote.tsx";

type APIResponse<T> = {
    status: 'success' | 'error';
    message?: string;
    data?: T;
}

type LoggedUser = {
    id: number;
    email: string;
    token: {
        access_token: string;
        token_type: string;
    }
}

export const LoginPage = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate()
    const { toast } = useToast();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const formData = new URLSearchParams();
            formData.append('username', values.email);  // FastAPI expects 'username'
            formData.append('password', values.password);

            const response = await fetch('http://localhost:8000/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const result : APIResponse<LoggedUser> = await response.json();
            if (result.status === 'success' && result.message && result.data) {
                const user = {
                    id: result.data.id,
                    email: result.data.email,
                }
                login(user, result.data.token.access_token);
                toast({ title: `Logging in as ${result.data.email}`, description: result.message });
                navigate('/generator');
            } else {
                toast({ title: `Login Failed`, description: result.message, variant: "destructive" });
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Login Failed', description: getErrorMessage(error) });
        } finally {
            setIsSubmitting(false);
        }
    };

    const {isAuthenticated} = useAuthStore()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/generator', { replace: true });
        }
    }, [isAuthenticated, navigate])

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
