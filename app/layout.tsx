import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Anh Vũ & Cẩm Hà",
  description:
    "Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng tôi.",
  openGraph: {
    title: "Wedding Anh Vũ & Cẩm Hà",
    description: "Thiệp mời đám cưới online — We're Getting Married!",
    type: "website",
    locale: "vi_VN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
