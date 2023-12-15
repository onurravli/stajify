import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 mt-16">
      <div className="flex align-middle justify-center items-center flex-col-reverse md:flex-row">
        <div className="max-w-4xl flex flex-col items-start gap-2 md:gap-4">
          <span className="text-2xl md:text-6xl font-semibold text-gray-800">
            staj bulmak hiç bu kadar kolay olmamıştı!
          </span>
          <span className="text-xl md:text-3xl text-gray-800 mb-2">
            stajify ile aradığın staja ulaşabilir, kariyerine yön verebilirsin.
          </span>
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center align-middle justify-center gap-2 md:gap-4 mb-4">
            <button className="w-full md:w-auto bg-blue-600 text-white md:py-4 py-2 md:px-12 px-6 text-xl border border-transparent transition-all duration-200 hover:bg-blue-800">
              keşfet
            </button>
            <button className="w-full md:w-auto bg-transparent text-blue-600 md:py-4 py-2 md:px-12 px-6 text-xl border border-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white">
              daha fazlasını öğren
            </button>
          </div>
          <span>
            işveren misiniz?{" "}
            <a className="text-blue-600" href="#">
              bizimle iletişime geçin.
            </a>
          </span>
        </div>
        <Hero className="w-4/5 md:w-3/5 md:min-w-[400px] h-auto md:hidden" />
      </div>
    </main>
  );
}
