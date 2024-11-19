import { z } from 'zod';
import puppeteer from 'puppeteer';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { createSurfSessionScreenshot, getSessionScreenshotUrls, handleError } from './utils/utils';

export const surfSessionRouter = createTRPCRouter({
    surfSession: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const { id } = input;

        const session = await ctx.db.surfSession.findUnique({ where: { id, createdById: ctx.session.user.id } });

        if (!session) {
            throw new Error('Session not found or does not belong to the user');
        }

        return session;
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

    updateSurfSession: protectedProcedure
        .input(z.object({ id: z.string(), name: z.string().nullable() }))
        .mutation(async ({ input, ctx }) => {
            const { id, name } = input;

            try {
                // Update the surf session in the database
                const updatedSession = await ctx.db.surfSession.update({
                    where: { id, createdById: ctx.session.user.id },
                    data: {
                        name: name ?? `Untitled - ${new Date().toDateString()}`,
                    },
                });

                return updatedSession;
            } catch (error) {
                console.error('Error updating session:', error);
                throw new Error('Unable to update surf session');
            }
        }),

    deleteSurfSession: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input, ctx }) => {
        const { id } = input;

        try {
            // Verify if the session exists and belongs to the current user
            const session = await ctx.db.surfSession.findUnique({
                where: { id, createdById: ctx.session.user.id },
            });

            if (!session || session.createdById !== ctx.session.user.id) {
                throw new Error('Session not found or does not belong to the user');
            }

            // Delete the session from the database
            await ctx.db.surfSession.delete({ where: { id } });

            return { success: true, message: 'Surf session deleted successfully' };
        } catch (error) {
            console.error('Error deleting session:', error);
            throw new Error('Unable to delete surf session');
        }
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

    getSurfSessions: protectedProcedure.query(async ({ ctx }) => {
        const surfSessions = await ctx.db.surfSession.findMany({ where: { createdById: ctx.session.user.id } });

        return surfSessions;
    }),
});
