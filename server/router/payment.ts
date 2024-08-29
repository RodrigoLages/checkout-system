import { procedure, router } from "../trpc";
import { boolean, z } from "zod";
import prisma from "@/prisma/prisma";

export const paymentRouter = router({
  webhook: procedure
    .input(
      z.object({
        id: z.number(),
        live_mode: z.boolean(),
        type: z.string(),
        date_created: z.string(),
        user_id: z.number(),
        api_version: z.string(),
        action: z.string(),
        data: z.object({ id: z.string() }),
      })
    ).mutation(async ({ input }) => {
      console.log("foooi")
      console.log(input)
      return;
    }),
});
