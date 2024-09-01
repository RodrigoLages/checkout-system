import { procedure, router } from "../trpc";
import { z } from "zod";
import prisma from "@/prisma/prisma";
import { createPayment } from "@/util/paymentFunctions";

export const orderRouter = router({
  create: procedure
    .input(
      z.object({
        productId: z.string(),
        customerName: z.string(),
        customerPhone: z.string(),
        customerCPF: z.string(),
        customerEmail: z.string().email(),
        status: z.enum(["PENDING", "APPROVED"]),
        paymentMethod: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, qr_code, qr_code_base64 } = await createPayment(input);

      const order = await prisma.order.create({
        data: { paymentId: id.toString(), ...input },
      });
      return { ...order, transaction_data: { qr_code, qr_code_base64 } };
    }),

  getAll: procedure.query(async () => {
    const orders = await prisma.order.findMany({
      include: {
        product: true,
      },
    });
    return orders;
  }),

  getById: procedure.input(z.string()).query(async ({ input }) => {
    const order = await prisma.order.findUnique({
      where: { id: input },
      include: {
        product: true,
      },
    });
    return order;
  }),

  update: procedure
    .input(
      z.object({
        id: z.string(),
        productId: z.string().optional(),
        customerName: z.string().optional(),
        customerPhone: z.string().optional(),
        customerCPF: z.string().optional(),
        customerEmail: z.string().email().optional(),
        status: z.enum(["PENDING", "APPROVED"]).optional(),
        paymentMethod: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const order = await prisma.order.update({
        where: { id },
        data,
      });
      return order;
    }),

  delete: procedure.input(z.string()).mutation(async ({ input }) => {
    await prisma.order.delete({
      where: { id: input },
    });
    return { success: true };
  }),
});
