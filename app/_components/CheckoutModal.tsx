"use client";
import { trpc } from "../_trpc/client";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CheckoutModal({ isOpen, onClose }: ModalProps) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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

        <div className="w-[355px] h-[290px] rounded-[5px] border border-[#b1b1b1] flex items-center justify-center mb-4">
          <span className="text-[#1f1f1f] text-sm">QRCODE</span>
        </div>

        <div className="w-full text-sm text-[#888888] font-normal mb-4">
          Pix copia e cola
        </div>

        <div className="flex justify-between">
          <div className="w-[207px] h-10 mb-4">
            <div className="w-full h-full bg-white rounded-sm border border-[#039adc] flex items-center px-2.5">
              <span className="text-[#a0a0a0]">link.com</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="w-[142px] h-10 bg-[#039adc] rounded-[5px] text-white text-sm font-semibold">
              Copiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
