import { router } from "./trpc";
import { productRouter } from "./router/product";
import { orderRouter } from "./router/order";
import { uploadRouter } from "./router/upload";
import { paymentRouter } from "./router/payment";

export const appRouter = router({
  product: productRouter,
  order: orderRouter,
  upload: uploadRouter,
  payment: paymentRouter
});

export type AppRouter = typeof appRouter;
