import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { hash } from 'bcryptjs';
import { db } from '@/server/db';

export const userFlowRouter = createTRPCRouter({
    signUp: publicProcedure
        .input(z.object({ name: z.string(), email: z.string().email(), password: z.string().min(8) }))
        .mutation(async ({ input }) => {
            try {
                const { name, email, password } = input;

                console.log(name, 'YOOOOOOOOO');

                const existingUser = await db.user.findUnique({
                    where: { email },
                });

                if (existingUser) {
                    throw new Error('Email is already in use.');
                }

                const hashedPassword = await hash(password, 10);

                const newUser = await db.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                });

                return { id: newUser.id, name: newUser.name, email: newUser.email };
            } catch (error) {
                console.log(error);
                throw new Error('Error creating user');
            }
        }),
});
