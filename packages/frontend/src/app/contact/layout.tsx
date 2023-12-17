import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stajify | İletişim",
  description: "Staj bulmak hiç bu kadar kolay olmamıştı.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
