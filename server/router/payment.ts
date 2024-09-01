import { procedure, router } from "../trpc";
import { z } from "zod";
import prisma from "@/prisma/prisma";

export const paymentRouter = router({
  webhook: procedure.input(z.any()).mutation(async ({ input }) => {
    const paymentId: string = input.data.id.toString();
    if (input.action === "payment.updated") {
      prisma.order.update({
        where: { paymentId },
        data: { status: "APPROVED" },
      });
    }
    return;
  }),
});
