"use client";
import { useState, useEffect } from "react";
import type { AppRouter } from "@/server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { trpc } from "../_trpc/client";

type NewProduct = inferRouterInputs<AppRouter>["product"]["create"];
type Product = inferRouterOutputs<AppRouter>["product"]["getById"];


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  productToEdit?: Product | null;
};

export default function ProductModal({ isOpen, onClose, refetch, productToEdit }: ModalProps) {
  const createProduct = trpc.product.create.useMutation({ onSettled: refetch });
  const updateProduct = trpc.product.update.useMutation({ onSettled: refetch });
  const [productName, setProductName] = useState(productToEdit?.name || "");
  const [description, setDescription] = useState(productToEdit?.description || "");
  const [image, setImage] = useState(productToEdit?.image || "foo");
  const [price, setPrice] = useState(productToEdit?.price || 0);

  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.name);
      setDescription(productToEdit.description);
      setImage(productToEdit.image);
      setPrice(productToEdit.price);
    }
  }, [productToEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product: NewProduct = {
      name: productName,
      description,
      image,
      price,
    };

    if (productToEdit) {
      updateProduct.mutate({ ...product, id: productToEdit.id });
    } else {
      createProduct.mutate(product);
    }

    onClose();
    //resetValues();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      //resetValues();
    }
  };

  const resetValues = () => {
    setProductName("");
    setDescription("");
    setImage("");
    setPrice(0);
  }

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
     >
      <div className="w-[408px] h-auto relative bg-white rounded-sm border border-white p-6">
        <h2 className="text-[#1e1e1e] text-xl font-semibold font-['Inter'] mb-4">
          {productToEdit ? "Editar Produto" : "Criar produto"}
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
              required
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
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[132px] rounded-sm border border-[#e9e9e9] pl-4 pr-4 pt-2 text-[#a0a0a0] mt-2"
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
                onChange={(e) => alert("WIP")}
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
              step="0.01"
              placeholder="R$ 00.00"
              value={price || ""}
              onChange={(e) => setPrice(parseFloat(parseFloat(e.target.value).toFixed(2)))}
              required
              className="w-full h-10 rounded-sm border border-[#e9e9e9] pl-4 text-[#a0a0a0] mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-[#039adc] rounded-[5px] text-white text-sm font-semibold mt-4"
          >
            {productToEdit ? "Editar Produto" : "Criar produto"}
          </button>
        </form>
      </div>
    </div>
  );
}
