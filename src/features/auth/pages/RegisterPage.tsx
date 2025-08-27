// src/features/auth/pages/RegisterPage.tsx
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Link, useNavigate} from 'react-router-dom';
import {Loader2} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/shared/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/shared/components/ui/form';
import {Input} from '@/shared/components/ui/input';
import {useToast} from '@/shared/hooks/use-toast';
import {registerSchema, type RegisterFormValues} from '../lib/schemas';
import {getErrorMessage} from '@/shared/lib';
import {useAuthStore} from "@/shared/stores/auth.ts";
import {useEffect} from "react";
import {GoogleIcon} from "@/features/auth/components/GoogleIcon.tsx";
import {FamousQuote} from "@/features/auth/components/FamousQuote.tsx";

type APIResponse<T> = {
    status: 'success' | 'error';
    message?: string;
    data?: T;
}

type User = {
    id: number;
    email: string;
}

export const RegisterPage = () => {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {email: '', password: ''},
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {toast} = useToast();
    const navigate = useNavigate()

    const onSubmit = async (values: RegisterFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            const body : APIResponse<User> = await response.json()
            if (body.status === 'success') {
                toast({title: 'Registration Successful', description: body.message});
                navigate('/auth/login');
            } else {
                toast({title: 'Registration Failed', description: body.message, variant: "destructive"});
            }
        } catch (error) {
            toast({variant: 'destructive', title: 'Registration Failed', description: getErrorMessage(error)});
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
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="m@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                    Create an account
                                </Button>
                                <Button variant="outline" className="w-full" type="button">
                                    <GoogleIcon/> Sign up with Google
                                </Button>
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
