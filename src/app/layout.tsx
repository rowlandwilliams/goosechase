import '~/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import localFont from 'next/font/local';
import { TRPCReactProvider } from '~/trpc/react';
import classNames from 'classnames';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
    title: 'Sign in',
    description: 'Generated by create-t3-app',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const haas = localFont({
    src: '../fonts/NeueHaasDisplayRoman.ttf',
    display: 'swap',
    variable: '--font-haas',
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body className={classNames(inter.variable, haas.variable, 'bg-gray-100')}>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
