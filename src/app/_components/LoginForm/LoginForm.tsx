'use client';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Input } from '../ui/input';
import { FormFieldWithHeader } from '../Forms/FormFieldWithHeader/FormFieldWithHeader';
import { Lock, Mail } from 'lucide-react';
import { UserFlowForm } from '@/app/_components/SHARED/UserFlow/UserFlowForm/UserFlowForm';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        } else {
            redirect('/');
        }
    };

    return (
        <UserFlowForm
            footerQuestion="New here?"
            footerRedirectButtonHref="/sign-up"
            footerRedirectButtonText="Create Account"
            formTitle="Sign in to your account"
            handleSubmit={handleSubmit}
            loading={loading}
            submitButtonText="Sign In"
        >
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
        </UserFlowForm>
    );
};
