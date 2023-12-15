import { hash } from "bcrypt";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
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
            }),
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
                    console.error(error)
                    throw error
                }
            }),
    updatePassword:
        protectedProcedure
        .input(z.object({
            updatedPassword:z.string(),
            userName:z.string()
        }))
        .mutation(async ({ctx,input})=>{
            
            const encyrptedPassword = await hash(input.updatedPassword,10)

            await ctx.db.sellerInfo.update({
                where:{
                    userName:input.userName
                },
                data:{
                    password:encyrptedPassword
                }
            })
        })

})