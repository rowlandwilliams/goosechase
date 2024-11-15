import { PrismaAdapter } from '@auth/prisma-adapter';
import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/server/db';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

export const authConfig = {
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials) => {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                try {
                    // Search for the user by email
                    const user = await db.user.findUnique({
                        where: { email },
                    });

                    // Check if user exists and if the password matches
                    if (user && (await bcrypt.compare(password, user.password))) {
                        return { id: user.id, name: user.name, email: user.email };
                    }

                    // If user doesn't exist or password is incorrect, return null
                    return null;
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            },
        }),
    ],
    adapter: PrismaAdapter(db),
    callbacks: {
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as string,
            };
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
} satisfies NextAuthConfig;
