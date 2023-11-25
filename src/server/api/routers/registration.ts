import { createTRPCRouter, publicProcedure } from "../trpc";
import z from 'zod'
import { hash } from 'bcrypt'

export const sellerRouter = createTRPCRouter({

    createSeller:
        publicProcedure
            .input(z.object({
                userName: z.string(),
                password: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                const encyrptedPassword = await hash(input.password, 10)
                try {

                    await ctx.db.sellerInfo.create({
                        data: {
                            userName: input.userName,
                            password: encyrptedPassword
                        }
                    })
                } catch (error) {
                    throw error
                }
            }),

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