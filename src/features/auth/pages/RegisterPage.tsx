// src/features/auth/pages/RegisterPage.tsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useToast } from '@/shared/hooks/use-toast';
import { registerSchema, type RegisterFormValues } from '../lib/schemas';
import { authService } from '../services/authService';
import { getErrorMessage } from "@/shared/lib";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.4 76.4c-24.1-23.4-58.4-38-96.5-38-80.6 0-146.5 65.9-146.5 146.5s65.9 146.5 146.5 146.5c94.2 0 135.3-65.5 139.8-100.2H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
    </svg>
);

export const RegisterPage = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        setIsSubmitting(true);
        try {
            await authService.register(values);
            toast({ title: 'Registration Successful', description: 'Please log in to continue.' });
            navigate('/auth/login');
        } catch (error) {
            toast({ variant: 'destructive', title: 'Registration Failed', description: getErrorMessage(error) });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-screen lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                <Card className="mx-auto w-full max-w-sm border-0 shadow-none lg:border lg:shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign Up</CardTitle>
                        <CardDescription>Enter your information to create an account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl><Input placeholder="m@example.com" {...field} /></FormControl>
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
                                            <FormControl><Input type="password" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create an account
                                </Button>
                                <Button variant="outline" className="w-full" type="button">
                                    <GoogleIcon /> Sign up with Google
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/auth/login" className="underline">Login</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="hidden bg-muted lg:flex items-center justify-center p-12">
                <div className="w-full max-w-md text-center">
                    <blockquote className="text-4xl font-serif italic text-foreground/80">
                        "Start writing, no matter what. The water does not flow until the faucet is turned on."
                    </blockquote>
                    <footer className="mt-4 text-xl font-sans text-foreground/60">- Louis L'Amour</footer>
                </div>
            </div>
        </div>
    );
};