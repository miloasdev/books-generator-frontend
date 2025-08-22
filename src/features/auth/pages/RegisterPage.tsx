// src/features/auth/pages/RegisterPage.tsx
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
import { useToast } from '@/shared/hooks/use-toast';
import { registerSchema, type RegisterFormValues } from '../lib/schemas';
import { authService } from '../services/authService';
import {getErrorMessage} from "@/shared/lib"; // Import the real service

export const RegisterPage = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        setIsSubmitting(true);
        try {
            await authService.register(values);
            toast({
                title: 'Registration Successful',
                description: 'Please log in to continue.',
            });
            navigate('/auth/login');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Registration Failed',
                description: getErrorMessage(error),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout title="Create an Account" description="Join Books AI to start generating your masterpiece">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>Enter your details to create an account.</CardDescription>
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create account
                            </Button>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Log in
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </AuthLayout>
    );
};