"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import type { AppRouter } from "@/server";
import type { inferRouterInputs } from "@trpc/server";
import { trpc } from "../_trpc/client";
import CheckoutModal from "./CheckoutModal";
import isValidCPF from "@/util/isValidCPF";

type NewOrder = inferRouterInputs<AppRouter>["order"]["create"];
type TransactionData = {
  qr_code?: string | undefined;
  qr_code_base64?: string | undefined;
};

export default function ChekoutForm({
  productId,
  productPrice,
}: {
  productId: string;
  productPrice: number;
}) {
  // Variables
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [transactionData, setTransactionData] = useState<TransactionData>();
  const [orderData, setOrderData] = useState<NewOrder>({
    productId,
    paymentMethod: "pix",
    status: "PENDING",
    customerName: "",
    customerEmail: "",
    customerCPF: "",
    customerPhone: "",
  });

  // trpc methods
  const createOrder = trpc.order.create.useMutation({
    onSuccess: (data) => {
      setOrderId(data.id);
      setIsModalOpen(true);
      setTransactionData(data.transaction_data);
    },
  });
  const getOrder = trpc.order.getById.useQuery(orderId, {
    enabled: Boolean(orderId),
    refetchInterval: 5000, // uso de pooling devido ao tempo e simplicidade, mas um websocket seria mais performatico
  });
  const order = getOrder.data;

  // Functions
  useEffect(() => {
    if (order?.status === "APPROVED") router.push("/thank-you");
  }, [router, order]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (transactionData) setIsModalOpen(true);
    if (!isValidCPF(orderData.customerCPF)) {
      return alert("Insira um CPF válido");
    }
    createOrder.mutate(orderData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl w-full flex flex-col lg:flex-row justify-around items-center gap-8 p-4"
      >
        <div className="w-full lg:w-[452px] bg-white rounded-[5px] border border-[#e4e4e4] p-6">
          <div className="text-[#5e5e5e] text-xl font-bold">
            Dados cadastrais
          </div>
          <div className="text-black text-[13px] font-light mb-4">
            Complete os dados de cadastro
          </div>
          <div className="w-[35px] h-[35px] bg-[#11499c] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
            1
          </div>
          <div className="border border-[#c9c9c9] mb-6"></div>

          <div className="mb-6">
            <label
              className="block text-[#292929] text-base font-semibold"
              htmlFor="fullName"
            >
              Nome completo
            </label>
            <input
              id="fullName"
              type="text"
              name="customerName"
              required
              className="w-full bg-white/90 rounded-[10px] border border-[#e6e6e6] p-3 text-[#3e3e3e] text-sm font-light"
              placeholder="Seu nome completo"
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-[#292929] text-base font-semibold"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="customerEmail"
              required
              className="w-full bg-white/90 rounded-[10px] border border-[#e6e6e6] p-3 text-[#3e3e3e] text-sm font-light"
              placeholder="Seu e-mail válido"
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-[#292929] text-base font-semibold"
              htmlFor="cpf"
            >
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              name="customerCPF"
              required
              className="w-full bg-white/90 rounded-[10px] border border-[#e6e6e6] p-3 text-[#3e3e3e] text-sm font-light"
              placeholder="000.000.000-00"
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-[#292929] text-base font-semibold"
              htmlFor="phone"
            >
              Telefone
            </label>
            <input
              id="phone"
              type="text"
              name="customerPhone"
              required
              className="w-full bg-white/90 rounded-[10px] border border-[#e6e6e6] p-3 text-[#3e3e3e] text-sm font-light"
              placeholder="00 0000 0000"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full lg:w-[508px] bg-white rounded-[5px] border border-[#e4e4e4] p-6">
          <div className="text-[#5e5e5e] text-xl font-bold">
            Dados de pagamento
          </div>
          <div className="text-black text-[13px] font-light mb-4">
            Complete os dados de pagamento
          </div>
          <div className="w-[34.14px] h-[35px] bg-[#11499c] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
            2
          </div>
          <div className="border border-[#c9c9c9] mb-6"></div>

          <div className="text-[#292929] text-base font-semibold mb-2">
            Preço
          </div>
          <div className="text-[#3e3e3e] text-2xl font-light mb-6">
            {`R$ ${productPrice.toFixed(2)}`}
          </div>

          <div className="w-full bg-[#ece8e8] rounded-[10px] flex items-center justify-center gap-2 p-4 mb-6">
            <img
              className="w-[23px] h-[23px]"
              src="/pix-icone.svg"
              alt="Pix Icon"
            />
            <div className="text-[#020202] text-[13px] font-semibold">PIX</div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00e640] rounded-[10px] p-4 text-center text-white text-base font-semibold mb-6"
          >
            Comprar agora
          </button>

          <div className="text-[#131313] text-[11px] font-light text-center mb-6">
            Ambiente criptografado e 100% seguro.
          </div>

          <div className="flex justify-evenly">
            <img
              className="w-[147px] h-16"
              src="/compra-1.svg"
              alt="Placeholder"
            />
            <img
              className="w-[147px] h-16"
              src="/compra-2.svg"
              alt="Placeholder"
            />
          </div>
        </div>
      </form>
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactionData={transactionData}
      />
    </div>
  );
}
