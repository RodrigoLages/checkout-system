import { procedure, router } from "../trpc";
import { z } from "zod";
import prisma from "@/prisma/prisma";
import { deleteBlob } from "@/util/blobFunctions";

export const productRouter = router({
  create: procedure
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

  get: procedure.query(async () => {
    const products = await prisma.product.findMany();
    return products;
  }),

  getById: procedure.input(z.string()).query(async ({ input }) => {
    const product = await prisma.product.findUnique({
      where: { id: input },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }),

  update: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        price: z.number().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const prev = await prisma.product.findUnique({
        where: { id: input.id }
      });
      
      if (!prev) throw new Error("Product not found");
      const product = await prisma.product.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });

      if (prev.image !== product.image) {
        deleteBlob(prev.image);
      }
      return product;
    }),

  delete: procedure.input(z.string()).mutation(async ({ input }) => {
    const product = await prisma.product.delete({
      where: { id: input },
    });
    deleteBlob(product.image);
    return product;
  }),
});
