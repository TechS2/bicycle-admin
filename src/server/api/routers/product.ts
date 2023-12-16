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
        } catch (error) {
          throw new TRPCError({ message: "Error in Saving Product", code: "BAD_REQUEST" })
        }
      }),
  insertOneByFile:
    protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.string(),
        size: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        console.log(input)
        try {
          const randomNumber = Math.floor(Math.random() * 999999) + 1;
          const productCode = `P${randomNumber}`;
          const result: UploadApiResponse = await cloudinary.uploader.upload(input.image);
          if(!result) return 
          input.image = result.secure_url
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
        } catch (error) {
          throw new TRPCError({ message: "Error in Saving Product", code: "BAD_REQUEST" })
        }
      }),
  editProduct:
    protectedProcedure
      .input(z.object({
        productId: z.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.string(),
        size: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {


          await ctx.db.product.update({
            where: {
              id: input.productId
            },
            data: {
              name: input.name,
              description: input.description,
              image: input.image,
              price: input.price,
              size: input.size,
            }
          })
        } catch (error) {
          throw new TRPCError({ message: "Error in Saving Product", code: "BAD_REQUEST" })
        }
      }),
  getAllProducts:
    protectedProcedure
      .query(async ({ ctx }) => {
        return await ctx.db.product.findMany()
      }),
  deleteProduct:
    protectedProcedure
      .input(z.object({
        productId: z.number()
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          return await ctx.db.product.delete({
            where: {
              id: input.productId
            }
          })
        } catch (error) {
          throw new TRPCError({ message: "Error in Deleting Product", code: "BAD_REQUEST" })
        }
      }),
  toogleStatus:
    protectedProcedure
      .input(z.object({
        productId: z.number(),
        status: z.boolean()
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          return await ctx.db.product.update({
            where: {
              id: input.productId
            },
            data: {
              active: !input.status
            }
          })
        } catch (error) {
          throw new TRPCError({ message: "Error in Updating Product", code: "BAD_REQUEST" })
        }
      })
});
