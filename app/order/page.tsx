import SideBar from "../_components/SideBar";

export default function Order() {
  return (
    <main className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-300 flex items-center px-4"></header>
        <div className="flex-1 p-4">
          <div className="flex items-center  p-4 space-x-5">
            <h1 className="text-gray-800 text-2xl font-semibold">Vendas</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
