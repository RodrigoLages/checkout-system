import { procedure, router } from "./trpc";

export const appRouter = router({
  getTest: procedure.query(async () => {
    return [10, 20, 30];
  }),
});

export type AppRouter = typeof appRouter;
