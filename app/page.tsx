"use client";
import { useState } from "react";
import { trpc } from "./_trpc/client";
import ProductCard from "./_components/ProductCard";
import SideBar from "./_components/SideBar";
import ProductModal from "./_components/ProductModal";
import Loading from "./_components/Loading";

export default function Home() {
  const getProducts = trpc.product.get.useQuery();
  const products = getProducts.data;
  const refetch = () => getProducts.refetch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-300 flex items-center px-4">
          <button
            className="sm:hidden text-[#039adc] xs"
            onClick={() => setIsSidebarOpen(true)}
          >
            &#9776;
          </button>
        </header>
        {products ? (
          <div className="flex-1 p-4 overflow-y-auto flex flex-col items-center">
            <div className="flex items-center p-4 space-x-5 self-start">
              <h1 className="text-gray-800 text-2xl font-semibold">Produtos</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white text-sm font-semibold py-3 px-5 rounded-lg hover:bg-blue-700"
              >
                Criar
              </button>
            </div>
            <div className="flex flex-col">
              <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    refetch={refetch}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />
    </main>
  );
}
