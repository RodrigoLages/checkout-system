// src/trpc/product.ts
import { procedure, router } from "../trpc";
import { z } from "zod";
import prisma from "@/prisma/prisma";

export const productRouter = router({
  createProduct: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const product = await prisma.product.create({
        data: input,
      });
      return product;
    }),

  getProducts: procedure.query(async () => {
    const products = await prisma.product.findMany();
    return products;
  }),

  getProductById: procedure.input(z.string()).query(async ({ input }) => {
    const product = await prisma.product.findUnique({
      where: { id: input },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }),

  updateProduct: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        price: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const product = await prisma.product.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
      return product;
    }),

  deleteProduct: procedure.input(z.string()).mutation(async ({ input }) => {
    const product = await prisma.product.delete({
      where: { id: input },
    });
    return product;
  }),
});
