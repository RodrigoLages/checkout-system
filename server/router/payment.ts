import { procedure, router } from "../trpc";
import { z } from "zod";
import prisma from "@/prisma/prisma";

export const paymentRouter = router({
  webhook: procedure.input(z.any()).mutation(async ({ input }) => {
    const paymentId: string = input.data.id.toString();
    if (input.action === "payment.updated") {
      console.log("entrou no if");
      prisma.order
        .update({
          where: { paymentId },
          data: { status: "APPROVED" },
        })
        .then((res) => {
          console.log("pdate deu bom");
        })
        .catch((error) => {
          console.log("update dum, ruim", error);
        });
    }
    return;
  }),
});
