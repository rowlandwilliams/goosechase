'use client';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // router.push("/");
        // console.log(window.location.origin);
        const res = await signIn('credentials', {
            email: email,
            password: password,
            callbackUrl: `${window.location.origin}/`,
            redirect: false,
        });

        if (res?.error) {
            setError(res.error);
        } else {
            redirect('/');
        }
    };

    return (
        <form
            className="flex w-full flex-col items-center max-w-max bg-indigo-800 p-8 rounded-md space-y-8"
            onSubmit={(e) => void handleSubmit(e)}
        >
            <section className="w-full space-y-2">
                <label htmlFor="email-address-icon" className="font-mediumtext-white mb-2 block text-sm">
                    Email
                </label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                    </div>
                    <input
                        type="email"
                        required
                        id="email-address-icon"
                        className="block w-full rounded-lg border border-zinc-700 bg-base-blue p-2.5 pl-10 text-sm text-black  placeholder-gray-400 focus:border-purple focus:ring-purple"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <label htmlFor="email-address-icon" className="font-mediumtext-white mb-2 block text-sm">
                    Password
                </label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                    </div>
                    <input
                        type="password"
                        required
                        id="email-address-icon"
                        className="block w-full rounded-lg border border-zinc-700 text-black bg-base-blue p-2.5 pl-10 text-sm  placeholder-gray-400 focus:border-purple focus:ring-purple"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </section>
            <Button type="submit" className="rounded-sm bg-purple bg-opacity-[0.15] px-4 py-2 font-medium text-white">
                Sign In
            </Button>
        </form>
    );
};
