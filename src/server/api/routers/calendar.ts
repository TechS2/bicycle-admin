/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createTRPCRouter, publicProcedure } from "../trpc";

export const calendarRouter = createTRPCRouter({

    getCalendar:
        publicProcedure
            .query(async ({ ctx }) => {
                try {
                    return await ctx.db.event.findMany()
                } catch (error) {
                    console.log(error)
                }
            }),
})