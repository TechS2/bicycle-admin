import { TRPCError } from "@trpc/server";
import { type UploadApiResponse } from "cloudinary";
import { z } from "zod";
import cloudinary from "@/server/_config/cloudinary";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Product } from "@prisma/client";

export const productRouter = createTRPCRouter({

  //! .input(z.object({ file: z.instanceof(File) }))
  insertOne:
    protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        code: z.string(),
        price: z.string(),
        size: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const result: UploadApiResponse = await cloudinary.uploader.upload(input.image);
          input.image = result.secure_url
          await ctx.db.product.create({
            data: input
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
        const data: Product[] = await ctx.db.product.findMany()
        return data
      })
});
