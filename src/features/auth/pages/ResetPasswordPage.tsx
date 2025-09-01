// src/features/auth/pages/ResetPasswordPage.tsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../lib/schemas';
import {useAuthStore} from "@/shared/stores/auth.ts";
import {useEffect} from "react";

export const ResetPasswordPage = () => {
    const {isAuthenticated} = useAuthStore()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/generator', { replace: true });
        }
    }, [isAuthenticated, navigate])

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (values: ResetPasswordFormValues) => {
        setIsSubmitting(true);
        console.log('Form values:', values);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-4xl">
                <div className="flex items-center justify-center">
                    <Card className="w-full max-w-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-serif">Forgot Password</CardTitle>
                            <CardDescription>We'll email you a link to reset your password.</CardDescription>
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
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Reset Link
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    );
};
