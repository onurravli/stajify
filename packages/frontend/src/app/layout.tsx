import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Stajify | Anasayfa",
  description: "Staj bulmak hiç bu kadar kolay olmamıştı.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
