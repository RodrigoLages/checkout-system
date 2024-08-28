import { router } from "./trpc";
import { productRouter } from "./router/product";
import { orderRouter } from "./router/order";
import { uploadRouter } from "./router/upload";

export const appRouter = router({
  product: productRouter,
  order: orderRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;
