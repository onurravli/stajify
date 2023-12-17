import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Stajify | Anasayfa",
  description: "Staj bulmak hiç bu kadar kolay olmamıştı!",
  metadataBase: new URL("https://stajify.com"),
  keywords: [
    "Stajify",
    "staj",
    "bulma",
    "uygulama",
    "stajyer",
    "iş",
    "öğrenci",
    "kariyer",
    "gelişim",
    "iş deneyimi",
    "öğrenci stajları",
    "stajyerlik programı",
    "iş fırsatları",
    "meslek stajı",
    "stajyer bulma",
    "stajyerlik",
    "stajyer arama",
    "stajyer iş ilanları",
  ],
  openGraph: {
    title: "Stajify: Staj bulmak hiç bu kadar kolay olmamıştı!",
    description: "Stajify, öğrencilerin staj bulmasını kolaylaştıran bir uygulamadır.",
    url: "https://stajify.com",
    siteName: "Stajify",
    images: [
      {
        url: "https://stajify.com/og.png",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Stajify: Staj bulmak hiç bu kadar kolay olmamıştı!",
    description: "Stajify, öğrencilerin staj bulmasını kolaylaştıran bir uygulamadır.",
    images: ["https://stajify.com/og.png"],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "rgb(37, 99, 235)",
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
