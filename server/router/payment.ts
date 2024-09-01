import { procedure, router } from "../trpc";
import { boolean, z } from "zod";
import prisma from "@/prisma/prisma";
import {
  createPayment,
  verificarPagamento,
  requestRefund,
} from "@/util/paymentFunctions";

export const paymentRouter = router({
  webhook: procedure.input(z.any()).mutation(async ({ input }) => {
    console.log("entrou no webhook");
    console.log(input);
    return;
  }),

  verify: procedure.input(z.string()).query(async ({ input }) => {
    const data = await verificarPagamento(input);
    return data;
  }),

  refund: procedure.input(z.string()).query(async ({ input }) => {
    const data = await requestRefund(input);
    return data;
  }),

  // test: procedure.query(async () => {
  //   const data = await createPayment();
  //   return data;
  // }),
});
