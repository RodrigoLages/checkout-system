"use client";
import { useState } from "react";
import SideBar from "../_components/SideBar";
import { trpc } from "../_trpc/client";
import Loading from "../_components/Loading";

export default function Order() {
  const getOrders = trpc.order.getAll.useQuery();
  const orders = getOrders.data;

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
        {orders ? (
          <div className="flex-1 p-4">
            <div className="flex items-center p-4 space-x-5">
              <h1 className="text-gray-800 text-2xl font-semibold">Vendas</h1>
            </div>
            <div className="w-full max-w-7xl mx-auto p-10 bg-[#ffffff]">
              <div className="text-[#039ADC] text-2xl font-semibold mb-4">
                Produtos
              </div>
              <div className="bg-[#e9e9e9] rounded-t-lg py-2 px-4 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 text-[#595959] text-sm font-semibold min-w-fit">
                <span className="hidden md:inline">Data</span>
                <span>Produto</span>
                <span>Cliente</span>
                <span>Valor</span>
                <span>Status</span>
                <span className="hidden lg:inline">CPF</span>
                <span className="hidden xl:inline">E-mail</span>
              </div>
              <div className="bg-white rounded-b-lg shadow-md border">
                {orders?.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 py-2 px-4 border-b border-[#e0e0e0] text-[#595959] text-sm"
                  >
                    <span className="hidden md:inline truncate">
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="truncate">{order.product.name}</span>
                    <span className="truncate">{order.customerName}</span>
                    <span className="truncate">
                      R$ {order.product.price.toFixed(2)}
                    </span>
                    <span className="truncate">
                      {order.status === "APPROVED" ? "Pago" : "Pendente"}
                    </span>
                    <span className="hidden lg:inline truncate">
                      {order.customerCPF}
                    </span>
                    <span className="hidden xl:inline truncate">
                      {order.customerEmail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
}
