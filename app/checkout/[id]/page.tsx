"use client";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import Loading from "@/app/_components/Loading";
import ChekoutForm from "@/app/_components/CheckoutForm";

export default function Checkout({ params }: { params: { id: string } }) {
  const getProduct = trpc.product.getById.useQuery(params.id);

  return (
    <div className="w-full min-h-screen bg-[#f6f6f6] flex flex-col items-center justify-center">
      {getProduct.error ? (
        <div className="flex flex-col items-center justify-center w-full h-full text-center bg-[#f6f6f6] p-6 rounded-md">
          <h1 className="text-2xl font-bold text-[#292929] mb-4">
            Produto não encontrado
          </h1>
          <p className="text-base text-[#5e5e5e] mb-6">
            O produto que você está procurando não foi encontrado. Verifique o
            link ou tente novamente mais tarde.
          </p>
          <Link href="/">
            <button className="px-4 py-2 bg-[#00e640] text-white rounded-md font-semibold hover:bg-[#00c932]">
              Voltar para a página inicial
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {getProduct.data ? (
            <ChekoutForm
              productId={params.id}
              productPrice={getProduct.data.price}
            />
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
}
