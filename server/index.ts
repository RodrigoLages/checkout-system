import { procedure, router } from "./trpc";
import { productRouter } from "./router/product";

export const appRouter = router({
  getTest: procedure.query(async () => {
    return [10, 20, 30];
  }),
  product: productRouter,
});

export type AppRouter = typeof appRouter;
