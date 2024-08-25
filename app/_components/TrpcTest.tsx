"use client";
import { trpc } from "../_trpc/client";

export default function TrpcTest() {
  const getTest = trpc.getTest.useQuery();
  const product = trpc.product.getProducts.useQuery();
  if (product.data) {
    product.data.map((p) => {
      console.log(p.id);
    });
  }
  return (
    <div>
      <div>{JSON.stringify(product.data)}</div>
    </div>
  );
}
