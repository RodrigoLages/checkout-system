"use client";
import { useState } from "react";
import type { AppRouter } from "@/server";
import type { inferRouterInputs } from "@trpc/server";
import { trpc } from "../_trpc/client";

type Product = inferRouterInputs<AppRouter>["product"]["create"];

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function ProductModal({ isOpen, onClose, refetch }: ModalProps) {
  const createProduct = trpc.product.create.useMutation({ onSettled: refetch });
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("foo");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product: Product = {
      name: productName,
      description,
      image,
      price: parseFloat(price) || 0,
    };
    createProduct.mutate(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="w-[408px] h-auto relative bg-white rounded-sm border border-white p-6">
        <h2 className="text-[#1e1e1e] text-xl font-semibold font-['Inter'] mb-4">
          Criar produto
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-[#888888] text-sm font-normal font-['Inter']"
            >
              Nome do produto
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Nome"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full h-10 rounded-sm border border-[#e9e9e9] pl-4 text-[#a0a0a0] mt-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-[#888888] text-sm font-normal font-['Inter']"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[132px] rounded-sm border border-[#e9e9e9] pl-4 pr-4 text-[#a0a0a0] mt-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-[#888888] text-sm font-normal font-['Inter']"
            >
              Thumbnail
            </label>
            <div className="relative w-full h-[127px] mt-2">
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={(e) => setImage(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-full bg-[#f8f8f8] rounded-sm border border-[#039adc] flex items-center justify-center">
                <span className="text-[#039adc] text-sm font-normal font-['Inter']">
                  Upload
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-[#888888] text-sm font-normal font-['Inter']"
            >
              Preço
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="R$ 00.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-10 rounded-sm border border-[#e9e9e9] pl-4 text-[#a0a0a0] mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-[#039adc] rounded-[5px] text-white text-sm font-semibold mt-4"
          >
            Criar produto
          </button>
        </form>
      </div>
    </div>
  );
}
