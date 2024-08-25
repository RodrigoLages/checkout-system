import Link from "next/link";

export default function SideBar() {
  return (
    <div className="w-[234px] h-screen bg-white border-r border-gray-300 flex flex-col">
      <div className="flex items-center justify-center p-4">
        <img src="/telmex-logo.svg" alt="Logo" />
      </div>
      <nav className="flex flex-col mt-4 ">
        <Link href="/">
          <div className="flex items-center mr-3 ml-3 p-2 bg-[#039adc] text-white text-sm font-semibold rounded-lg mb-2 hover:bg-blue-700">
            <div className="w-6 h-6 mr-3" /> {/* Adicionar icone dps */}
            Produtos
          </div>
        </Link>
        <Link href="/order">
          <div className="flex items-center mr-3 ml-3 p-2 bg-[#039adc] text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
            <div className="w-6 h-6 mr-3" /> {/* Adicionar icone dps */}
            Vendas
          </div>
        </Link>
      </nav>
    </div>
  );
}
