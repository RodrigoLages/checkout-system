import { router } from "./trpc";
import { productRouter } from "./router/product";
import { orderRouter } from "./router/order";

export const appRouter = router({
  product: productRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
