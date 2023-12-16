import Button from "@/components/button";
import Hero from "@/components/hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-8 py-24 mt-0">
      <div className="w-full md:max-w-7xl h-auto flex flex-col md:flex-row items-center align-middle justify-center md:gap-16">
        <Hero className="max-w-xs md:max-w-md w-full h-auto" />
        <div className="flex flex-col items-stat justify-center gap-4">
          <span className="text-4xl md:text-6xl font-semibold text-gray-800">
            staj bulmak hiç bu kadar kolay olmamıştı!
          </span>
          <span className="text-2xl md:text-3xl font-normal text-gray-800">
            stajify ile aradığın staja ulaşabilir, kariyerine güzel bir başlangıç yapabilirsin.
          </span>
          <div className="flex flex-col md:flex-row w-full items-center justify-start gap-4 mt-4">
            <Button variant="primary">keşfet</Button>
            <Button variant="secondary">daha fazlası</Button>
          </div>
          <span className="mt-4">
            işveren misiniz?{" "}
            <Link className="text-blue-600" href="#">
              bizimle iletişime geçin.
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}
