import Button from "@/components/button";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-8 py-16 mt-8">
      <div className="flex align-middle justify-center items-center flex-col-reverse md:flex-row-reverse md:gap-24">
        <div className="max-w-4xl flex flex-col items-start gap-2 md:gap-4">
          <span className="text-2xl md:text-6xl font-semibold text-gray-800">
            staj bulmak hiç bu kadar kolay olmamıştı!
          </span>
          <span className="text-xl md:text-3xl text-gray-800 mb-2">
            stajify ile aradığın staja ulaşabilir, kariyerine yön verebilirsin.
          </span>
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center align-middle justify-center gap-2 md:gap-4 mb-4">
            <Button variant="primary">keşfet</Button>
            <Button variant="secondary">daha fazlasını öğren</Button>
          </div>
          <span>
            işveren misiniz?{" "}
            <a className="text-blue-600" href="#">
              bizimle iletişime geçin.
            </a>
          </span>
        </div>
        <Hero className="w-4/5 md:w-3/5 md:min-w-[400px] h-auto" />
      </div>
    </main>
  );
}
