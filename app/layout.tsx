import type { Metadata } from "next";
import { Great_Vibes, Quicksand } from "next/font/google";
import { BackgroundAudio } from "@/components/layout/background-audio";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Anh Vũ & Cẩm Hà",
  description:
    "Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng tôi.",
  icons: {
    icon: "/wedding.png",
  },
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
      className={`${greatVibes.variable} ${quicksand.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
        <BackgroundAudio />
      </body>
    </html>
  );
}
