"use client";
import { useState, useEffect, ChangeEvent } from "react";
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

export default function ProductModal({
  isOpen,
  onClose,
  refetch,
  productToEdit,
}: ModalProps) {
  const createProduct = trpc.product.create.useMutation({ onSettled: refetch });
  const updateProduct = trpc.product.update.useMutation({ onSettled: refetch });
  const uploadImage = trpc.upload.sendImage.useMutation();
  const [productName, setProductName] = useState(productToEdit?.name || "");
  const [description, setDescription] = useState(
    productToEdit?.description || ""
  );
  const [price, setPrice] = useState(productToEdit?.price || 0);
  const [image, setImage] = useState(productToEdit?.image || "");
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<{ image: string | null }>({ image: null });

  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.name);
      setDescription(productToEdit.description);
      setImage(productToEdit.image);
      setPrice(productToEdit.price);
    }
  }, [productToEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product: NewProduct = {
      name: productName,
      description,
      image,
      price,
    };
    if (file) {
      const url = await handleFileUpload(file);
      if (!url) return;
      product.image = url;
    }

    if (productToEdit) {
      updateProduct.mutate({ ...product, id: productToEdit.id });
    } else {
      createProduct.mutate(product);
    }

    onClose();
  };

  const handleFileUpload = async (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = async () => {
        const base64String = reader.result?.toString().split(',')[1];
  
        if (base64String) {
          const filename = file.name;
  
          try {
            const url = await uploadImage.mutateAsync({ file: base64String, filename });
            resolve(url);
          } catch (error) {
            console.error("Error uploading image:", error);
            reject(null);
          }
        } else {
          reject(null);
        }
      };
  
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(null);
      };
  
      reader.readAsDataURL(file);
    });
  };
  

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        return alert("File size too big (max 50MB)");
      } else {
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setData((prev) => ({ ...prev, image: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div className="w-[408px] h-auto relative bg-white rounded-sm border border-white p-6">
        <h2 className="text-[#1e1e1e] text-xl font-semibold mb-4">
          {productToEdit ? "Editar Produto" : "Criar produto"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-[#888888] text-sm font-normal"
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
              className="block text-[#888888] text-sm font-normal"
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
              className="block text-[#888888] text-sm font-normal"
            >
              Thumbnail
            </label>
            <div className="relative w-full h-[127px] mt-2">
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={onChangePicture}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-full bg-[#f8f8f8] rounded-sm border border-[#039adc] flex items-center justify-center">
                {data.image || image ? (
                  <img
                    src={data.image || image}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover rounded-sm"
                  />
                ) : (
                  <span className="text-[#039adc] text-sm font-normal">
                    Upload
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-[#888888] text-sm font-normal"
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
              onChange={(e) =>
                setPrice(parseFloat(parseFloat(e.target.value).toFixed(2)))
              }
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
