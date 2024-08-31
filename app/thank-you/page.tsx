export default function Checkout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f6]">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="w-[184px] h-[184px]">
          <img src="/check.svg" alt="" />
        </div>
        <div className="text-center text-[#1e1e1e] text-xl font-semibold">
          Compra aprovada!
        </div>
      </div>
    </div>
  );
}
