import { procedure, router } from "../trpc";
import { z } from "zod";
import prisma from "@/prisma/prisma";
import { verifyPayment, requestRefund } from "@/util/paymentFunctions";

export const paymentRouter = router({
  webhook: procedure.input(z.any()).mutation(async ({ input }) => {
    const paymentId: string = input.data.id.toString();
    if (input.action === "payment.updated") {
      prisma.order
        .update({
          where: { paymentId },
          data: { status: "APPROVED" },
        })
        .then((res) => {
          console.log("Order updated");
        })
        .catch((error) => {
          console.log("Update failed: ", error);
        });
    }
    return;
  }),

  verify: procedure.input(z.string()).query(async ({ input }) => {
    const data = await verifyPayment(input);
    return data;
  }),

  refund: procedure.input(z.string()).query(async ({ input }) => {
    const data = await requestRefund(input);
    return data;
  }),
});
