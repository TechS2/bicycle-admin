import { createTRPCRouter } from "@/server/api/trpc";
import { sellerRouter } from "./routers/registration";
import { paypalRouter } from "./routers/paypal";
import { productRouter } from "./routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    register:sellerRouter,
    paypal:paypalRouter,
    product:productRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
