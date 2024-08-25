"use client";
import { trpc } from "../_trpc/client";
import type { AppRouter } from "@/server";
import type { inferRouterOutputs } from "@trpc/server";

type Product = inferRouterOutputs<AppRouter>["product"]["get"][number];

export default function ProductCard({
  product,
  refetch,
}: {
  product: Product;
  refetch: () => void;
}) {
  const deleteProduct = trpc.product.delete.useMutation({ onSettled: refetch });

  return (
    <div className="w-full max-w-xs bg-white rounded-lg border border-gray-300 shadow-md overflow-hidden">
      <img
        className="w-full h-40 object-cover"
        src="https://via.placeholder.com/253x153"
        alt={product.name}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <div className="mt-2 text-gray-600 text-sm">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-md border border-blue-300">
            <div className="text-sm font-normal">Link de checkout</div>
            <a href="#" className="block text-blue-600 text-sm mt-1">
              link.com
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-md text-sm font-semibold">
          Editar
        </button>
        <button
          onClick={() => deleteProduct.mutate(product.id)}
          className="bg-red-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
