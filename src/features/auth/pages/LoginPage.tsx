// src/features/auth/pages/LoginPage.tsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { AuthLayout } from '../components/AuthLayout';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useAuthStore } from '@/shared/stores/auth';
import { useToast } from '@/shared/hooks/use-toast';
import { loginSchema, type LoginFormValues } from '@/features/auth/lib/schemas';
import { authService } from '../services/authService';
import {getErrorMessage} from "@/shared/lib";

export const LoginPage = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const data = await authService.login(values);
            toast({
                title: 'Login Successful',
                description: `Welcome back!`,
            });
            // Create a placeholder user object. You can later decode the JWT to get real user info.
            const user = { email: values.email, name: 'User' };
            login(user, data.access_token);
            navigate('/dashboard');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: getErrorMessage(error), // Use the refactored function
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout title="Welcome Back" description="Sign in to continue to Books AI">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>Log In</CardTitle>
                            <CardDescription>Enter your credentials to access your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Login
                            </Button>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </AuthLayout>
    );
};