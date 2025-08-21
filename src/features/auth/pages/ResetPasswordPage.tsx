// src/features/auth/pages/ResetPasswordPage.tsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { AuthLayout } from '../components/AuthLayout';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useToast } from '@/shared/hooks/use-toast';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../lib/schemas';
import { mockResetPasswordSuccess, mockResetPasswordError } from '@/mocks/auth';

export const ResetPasswordPage = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (values: ResetPasswordFormValues) => {
        setIsSubmitting(true);
        console.log('Form values:', values);

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (values.email === 'notfound@example.com') {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: mockResetPasswordError.error,
            });
            setIsSubmitting(false);
        } else {
            toast({
                title: 'Request Sent',
                description: mockResetPasswordSuccess.message,
            });
            setTimeout(() => navigate('/auth/login'), 2000);
        }
    };

    return (
        <AuthLayout title="Reset Your Password" description="Enter your email to receive a reset link">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Forgot Password</CardTitle>
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
                </form>
            </Form>
        </AuthLayout>
    );
};
