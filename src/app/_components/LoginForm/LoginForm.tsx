'use client';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FormFieldWithHeader } from '../Forms/FormFieldWithHeader/FormFieldWithHeader';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';
import { LoadingSpinner } from '../SHARED/LoadingSpinner/LoadingSpinner';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const res = await signIn('credentials', {
            email: email,
            password: password,
            callbackUrl: `${window.location.origin}/`,
            redirect: false,
        });

        setLoading(false); // End loading

        if (res?.error) {
            setError(res.error);
        } else {
            redirect('/');
        }
    };

    return (
        <form
            className="max-w-max bg-white shadow-xl border border-stone-100 p-1.5 rounded-md space-y-6"
            onSubmit={(e) => void handleSubmit(e)}
        >
            <div className="px-12 pt-12 pb-4 space-y-8">
                <h1 className="text-[22px] font-medium text-stone-800">Sign in to your account</h1>
                <div className="space-y-4">
                    <FormFieldWithHeader title="Email">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="h-5 w-5 stroke-stone-500" />
                            </div>
                            <Input
                                type="email"
                                required
                                className="p-2.5 pl-10 md:min-w-96"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </FormFieldWithHeader>
                    <FormFieldWithHeader title="Password">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 stroke-stone-500" />
                            </div>
                            <Input
                                type="password"
                                required
                                className="p-2.5 pl-10 "
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </FormFieldWithHeader>
                </div>
                <div className="pt-2">
                    <Button type="submit" className="w-full bg-indigo-600">
                        {loading ? <LoadingSpinner inline /> : 'Sign In'}
                    </Button>
                </div>
                <div className="w-2/3 text-center mx-auto text-stone-500">
                    By clicking continue, you agree to our{' '}
                    <span className="underline underline-offset-4">Terms of Service</span> and{' '}
                    <span className="underline underline-offset-4">Privacy Policy.</span>
                </div>
            </div>
            <div className="bg-stone-50 font-light text-center text-sm py-6 rounded-md">
                New Here?{' '}
                <Link href="/sign-up" className="text-cyan-500 ml-1 font-medium">
                    Create Account
                </Link>
            </div>
        </form>
    );
};
