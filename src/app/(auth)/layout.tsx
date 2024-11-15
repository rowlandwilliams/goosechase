import '@/styles/globals.css';
import { type Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';
import { AuthLayoutNavbar } from '@/app/_components/AuthLayoutNavbar/AuthLayoutNavbar';

export const metadata: Metadata = {
    title: 'Sign in',
    description: 'Generated by create-t3-app',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SessionProvider>
            <AuthLayoutNavbar />
            <section className="p-6">{children}</section>
        </SessionProvider>
    );
}
