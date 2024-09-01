"use client";
import { useRef, useState } from "react";
import { trpc } from "../_trpc/client";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transactionData?: {
    qr_code?: string | undefined;
    qr_code_base64?: string | undefined;
  };
};

export default function CheckoutModal({
  isOpen,
  onClose,
  transactionData,
}: ModalProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isClicked, setClicked] = useState(false);
  const dataUrl = `data:image/jpeg;base64,${transactionData?.qr_code_base64}`;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopy = () => {
    setClicked(true);

    navigator.clipboard
      .writeText(transactionData?.qr_code || "")
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-sm border border-white relative p-6">
        <div className="text-xl font-semibold text-[#1e1e1e] mb-4">
          Pagar via pix
        </div>
        <div className="w-[355px] h-[0px] border-b border-[#e9e9e9] mb-4"></div>

        <div className="w-[355px] h-[355px] rounded-[5px] border border-[#b1b1b1] flex items-center justify-center mb-4">
          <img src={dataUrl} alt="" />
        </div>

        <div className="w-full text-sm text-[#888888] font-normal mb-4">
          Pix copia e cola
        </div>

        <div className="flex justify-between">
          <div className="w-[207px] h-10 mb-4">
            <div className="w-full h-full bg-white rounded-sm border border-[#039adc] flex items-center px-2.5">
              <span className="text-[#a0a0a0] truncate">
                {transactionData?.qr_code}
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCopy}
              className="w-[142px] h-10 bg-[#039adc] rounded-[5px] text-white text-sm font-semibold"
            >
              {isClicked ? "Chave copiada!" : "Copiar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
