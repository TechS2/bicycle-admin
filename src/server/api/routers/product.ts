import { TRPCError } from "@trpc/server";
import { type UploadApiResponse } from "cloudinary";
import { z } from "zod";
import cloudinary from "@/server/_config/cloudinary";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({

  insertOne:
    protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.string(),
        size: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const result: UploadApiResponse = await cloudinary.uploader.upload(input.image);
          input.image = result.secure_url

          const randomNumber = Math.floor(Math.random() * 999999) + 1;
          const productCode = `P${randomNumber}`;

          await ctx.db.product.create({
            data: {
              name: input.name,
              description: input.description,
              image: input.image,
              price: input.price,
              size: input.size,
              code: productCode.substring(0, 6)
            }
          })
          return "Saved"
        } catch (error) {
          console.log(error)
          throw new TRPCError({ message: "Error in Saving category", code: "BAD_REQUEST" })
        }
      }),

  getAllProducts:
    protectedProcedure
      .query(async ({ ctx }) => {
        return  await ctx.db.product.findMany()
      }),
  getTesting:
      publicProcedure
      .query(async ({ ctx }) => {
        return  await ctx.db.product.findMany()
      }),
});
