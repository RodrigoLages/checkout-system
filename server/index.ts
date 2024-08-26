import { procedure, router } from "./trpc";
import { productRouter } from "./router/product";

export const appRouter = router({
  product: productRouter,
});

export type AppRouter = typeof appRouter;
