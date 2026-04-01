---
name: create-page
description: Hướng dẫn tạo page mới trong Next.js App Router cho wedding-website
---

# 📄 Tạo Page Mới (Next.js App Router)

## Cấu trúc Route

```
app/
├── page.tsx                    # / (Home - landing page)
├── layout.tsx                  # Root layout (wrap tất cả pages)
├── loading.tsx                 # Loading UI cho cả app
├── error.tsx                   # Error boundary cho cả app
├── not-found.tsx               # Custom 404 page
└── api/                        # API routes
    └── ...
```

> **Lưu ý**: Vì đây là wedding single-page website, tất cả sections thường nằm trên 1 page duy nhất (`app/page.tsx`). Sử dụng scroll-to-section navigation thay vì multiple pages.

## Template — Landing Page (Single Page)

```tsx
// app/page.tsx
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/sections/hero-section";
import CoupleSection from "@/components/sections/couple-section";
import TimelineSection from "@/components/sections/timeline-section";
import GallerySection from "@/components/sections/gallery-section";
import WishesSection from "@/components/sections/wishes-section";
import RSVPSection from "@/components/sections/rsvp-section";
import Footer from "@/components/layout/footer";

export default async function HomePage() {
  // Server-side data fetch
  const wishes = await prisma.wish.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <>
      <HeroSection />
      <CoupleSection />
      <TimelineSection />
      <GallerySection />
      <WishesSection initialWishes={wishes} />
      <RSVPSection />
      <Footer />
    </>
  );
}
```

## Template — Root Layout

```tsx
// app/layout.tsx
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
  title: "Đám Cưới Tên Chú Rể & Tên Cô Dâu",
  description:
    "Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày trọng đại.",
  openGraph: {
    title: "Đám Cưới Tên Chú Rể & Tên Cô Dâu",
    description: "Thiệp mời đám cưới online",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding Invitation",
      },
    ],
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
```

## Template — Loading UI

```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Đang tải...
        </p>
      </div>
    </div>
  );
}
```

## Template — Error Boundary

```tsx
// app/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Oops! Có lỗi xảy ra</h2>
      <p className="text-muted-foreground">
        Vui lòng thử lại hoặc liên hệ chúng tôi.
      </p>
      <Button onClick={reset}>Thử lại</Button>
    </div>
  );
}
```

## Template — Custom 404

```tsx
// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Không tìm thấy trang</h2>
      <p className="text-muted-foreground">
        Trang bạn tìm kiếm không tồn tại.
      </p>
      <Button asChild>
        <Link href="/">Về trang chủ</Link>
      </Button>
    </div>
  );
}
```

## Metadata & SEO

### Mỗi page phải có Metadata

```tsx
// Static metadata
export const metadata: Metadata = {
  title: "Tiêu đề trang | Đám Cưới A & B",
  description: "Mô tả ngắn gọn về trang",
};

// Dynamic metadata (nếu cần)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Chi tiết | Đám Cưới A & B`,
  };
}
```

## Quy tắc Page

### ✅ PHẢI
1. Export `metadata` hoặc `generateMetadata` cho mỗi page
2. Page component mặc định là **Server Component** (async function)
3. Fetch data trực tiếp trong page component (không cần useEffect)
4. Sử dụng `<Suspense>` boundary cho các phần tải chậm
5. Truyền data xuống client components qua props
6. Set `lang="vi"` trên `<html>` tag (trong layout.tsx)
7. Sử dụng `scroll-smooth` class trên `<html>` tag

### ❌ KHÔNG
1. **KHÔNG** đặt `"use client"` trên page.tsx trừ khi thực sự cần
2. **KHÔNG** fetch data ở client nếu có thể fetch ở server
3. **KHÔNG** quên metadata/SEO tags
4. **KHÔNG** đặt global state ở page level — dùng context hoặc URL params
