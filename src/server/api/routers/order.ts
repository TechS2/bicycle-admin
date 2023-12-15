import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from 'zod'


export const orderRouter = createTRPCRouter({

    getAllOrders:
        protectedProcedure
            .query(async ({ ctx }) => {
                const orders = await ctx.db.order.findMany({
                    include: {
                        OrderItem: true
                    }
                })
                return orders
            }),
    orderDetail:
        protectedProcedure
            .input(z.object({
                orderId: z.string()
            }))
            .query(async ({ ctx, input }) => {
                const order = await ctx.db.order.findUnique({
                    where: {
                        id: Number(input.orderId)
                    },
                    include: {
                        OrderItem: {
                            include: {
                                Product: true
                            },
                        },
                    }
                })
                return order
            })
})