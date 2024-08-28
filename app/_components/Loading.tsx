export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center bg-[#f6f6f6] p-6 rounded-md">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00e640] mb-6"></div>
      <h1 className="text-xl font-semibold text-[#292929]">Carregando...</h1>
    </div>
  );
}
