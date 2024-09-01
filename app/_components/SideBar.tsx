import Link from "next/link";

export default function SideBar({
  isSidebarOpen,
  closeSidebar,
}: {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSidebar();
    }
  };

  return (
    <div
      onMouseDown={handleOutsideClick}
      className={`fixed z-40 inset-0 bg-black bg-opacity-25 sm:static sm:bg-transparent ${
        isSidebarOpen ? "block" : "hidden"
      } sm:flex sm:w-[234px] h-screen`}
    >
      <div
        className={`w-[234px] h-full bg-white border-r border-gray-300 flex flex-col transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 sm:justify-center">
          <img src="/telmex-logo.svg" alt="Logo" />
          <button className="sm:hidden" onClick={closeSidebar}>
            &times; {/* Close Icon */}
          </button>
        </div>
        <nav className="flex flex-col mt-4 ">
          <Link href="/">
            <div className="flex items-center mr-3 ml-3 p-2 bg-[#039adc] text-white text-sm font-semibold rounded-lg mb-2 hover:bg-blue-700">
              Produtos
            </div>
          </Link>
          <Link href="/order">
            <div className="flex items-center mr-3 ml-3 p-2 bg-[#039adc] text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
              Vendas
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}
