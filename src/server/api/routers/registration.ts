import { createTRPCRouter, publicProcedure } from "../trpc";
import z from 'zod'

export const sellerRouter = createTRPCRouter({


    sellerInfo:
        publicProcedure
            .input(z.object({
                userName: z.string()
            }))
            .query(async ({ ctx, input }) => {
                try {
                    return await ctx.db.sellerInfo.findUnique({
                        where: {
                            userName: input.userName
                        }
                    })
                } catch (error) {
                    return null
                }
            })
})