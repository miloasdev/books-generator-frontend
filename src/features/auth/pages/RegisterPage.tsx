// src/features/auth/pages/RegisterPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { registerSchema, type RegisterFormValues } from '../lib/schemas';
import { useAuthStore } from "@/shared/stores/auth.ts";
import { useEffect } from "react";
import { FamousQuote } from "@/features/auth/components/FamousQuote.tsx";
import { GoogleAuthButton } from "@/features/auth/components/GoogleAuthButton.tsx";
import { useAuthMutations } from '../hooks/useAuthMutations'; // 👈 Import the hook

export const RegisterPage = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const { register, isRegistering } = useAuthMutations(); // 👈 Use the hook

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        register(values);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/generator', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <Card className="w-full max-w-3xl">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-serif">Sign Up</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
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
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isRegistering}>
                                    {isRegistering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create an account
                                </Button>
                                <GoogleAuthButton />
                                <div className="text-center text-sm">
                                    Already have an account?{' '}
                                    <Link to="/auth/login" className="underline">
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div className="flex flex-col justify-center h-full">
                        <FamousQuote
                            className={"text-center space-y-4 p-4"}
                            quote={"Start writing, no matter what. The water does not flow until the faucet is turned on."}
                            auther={"Louis L'Amour"}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};