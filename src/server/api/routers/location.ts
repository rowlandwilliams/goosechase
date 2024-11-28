import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const locationRouter = createTRPCRouter({
    locations: protectedProcedure.query(async ({ ctx }) => {
        const locations = await ctx.db.location.findMany();

        return locations;
    }),
});
