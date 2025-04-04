import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { TRPCReactProvider } from '@/trpc/react';
import classNames from 'classnames';
import { Funnel_Display } from 'next/font/google';

export const metadata: Metadata = {
    title: 'Sign in',
    description: 'Generated by create-t3-app',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const funnelDisplay = Funnel_Display({
    subsets: ['latin'],
    variable: '--font-funnelDisplay',
    fallback: ['sans-serif'],
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${funnelDisplay.variable} ${GeistSans.variable}`}>
            <body className={classNames('bg-stone-50 text-xs')}>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
