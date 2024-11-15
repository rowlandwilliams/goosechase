import { z } from 'zod';
import puppeteer from 'puppeteer';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { createSurfSessionScreenshot, getSessionScreenshotUrls, handleError } from './utils/utils';

export const surfSessionRouter = createTRPCRouter({
    surfSession: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const { id } = input;

        const session = await ctx.db.surfSession.findUnique({ where: { id, createdById: ctx.session.user.id } });

        return session;
    }),

    updateSurfSession: protectedProcedure
        .input(z.object({ id: z.string(), name: z.string().nullable() }))
        .mutation(async ({ input, ctx }) => {
            const { id, name } = input;

            try {
                // Update the surf session in the database
                const updatedSession = await ctx.db.surfSession.update({
                    where: { id },
                    data: {
                        name: name ?? `Untitled - ${new Date().toDateString()}`,
                    },
                });

                console.log('Updated session:', updatedSession);
                return updatedSession;
            } catch (error) {
                console.error('Error updating session:', error);
                throw new Error('Unable to update surf session');
            }
        }),

    createSurfSession: protectedProcedure
        .input(z.object({ id: z.string(), name: z.string().nullable() }))
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session.user.id;

            const newSession = await ctx.db.surfSession.create({
                data: {
                    id: input.id,
                    name: input.name ?? `Untitled - ${new Date().toDateString()}`,
                    location: 'suhuhu',
                    isDraft: true,
                    createdById: userId,
                },
            });

            return newSession;
        }),

    allScreenshots: protectedProcedure.query(async () => {
        try {
            const { urls } = await getSessionScreenshotUrls();

            return urls;
        } catch (error) {
            handleError({ error });
        }
    }),

    createScreenshot: protectedProcedure.input(z.object({ spotName: z.string() })).mutation(async ({ input }) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            await createSurfSessionScreenshot({ page, spotName: input.spotName });
        } catch (error) {
            handleError({ error });
        } finally {
            await browser.close();
        }

        return { success: true };
    }),

    getSurfSessions: protectedProcedure.query(async () => {
        return [
            { id: 1, name: 'Fraserburgh', rating: 1 },
            { id: 2, name: 'St Andrews', rating: 3 },
            { id: 3, name: 'Scarborough', rating: 5 },
            { id: 4, name: 'Thurso', rating: 2 },
        ];
    }),
});
