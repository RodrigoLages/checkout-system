"use client";
import SideBar from "../_components/SideBar";
import { trpc } from "../_trpc/client";
import Loading from "../_components/Loading";

export default function Order() {
  const getOrders = trpc.order.getAll.useQuery();
  const orders = getOrders.data;

  return (
    <main className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-300 flex items-center px-4"></header>
        {orders ? (
          <div className="flex-1 p-4">
            <div className="flex items-center p-4 space-x-5">
              <h1 className="text-gray-800 text-2xl font-semibold">Vendas</h1>
            </div>
            <div className="w-full max-w-7xl mx-auto p-10 bg-[#ffffff]">
              <div className="text-[#039ADC] text-2xl font-semibold mb-4">
                Produtos
              </div>
              <div className="bg-[#e9e9e9] rounded-t-lg py-2 px-4 grid grid-cols-7 text-[#595959] text-sm font-semibold">
                <span>Data</span>
                <span>Produto</span>
                <span>Cliente</span>
                <span>Valor</span>
                <span>Status</span>
                <span>CPF</span>
                <span>E-mail</span>
              </div>
              <div className="bg-white rounded-b-lg shadow-md border">
                {orders?.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-7 py-2 px-4 border-b border-[#e0e0e0] text-[#595959] text-sm"
                  >
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span>{order.product.name}</span>
                    <span>{order.customerName}</span>
                    <span>R$ {order.product.price.toFixed(2)}</span>
                    <span>
                      {order.status === "APPROVED" ? "Pago" : "Pendente"}
                    </span>
                    <span>{order.customerCPF}</span>
                    <span>{order.customerEmail}</span>
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
