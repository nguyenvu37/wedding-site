---
name: deployment-vercel
description: Hướng dẫn deploy wedding-website lên Vercel
---

# 🚀 Deployment — Vercel

## Pre-deployment Checklist

1. ✅ `npm run build` chạy thành công (không error)
2. ✅ Environment variables đã set trên Vercel Dashboard
3. ✅ Prisma Client đã generate (`npx prisma generate`)
4. ✅ Database migrations đã chạy (`npx prisma migrate deploy`)
5. ✅ Images đã optimize (WebP format)
6. ✅ Metadata/SEO đã config đầy đủ

## Environment Variables trên Vercel

| Variable | Mô tả | Ví dụ |
|----------|--------|-------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NEXT_PUBLIC_SITE_URL` | URL website | `https://wedding.vercel.app` |

## Build & Deploy Commands

```bash
# Test build locally
npm run build

# Vercel CLI deploy
npx vercel --prod

# Hoặc connect GitHub repo → auto deploy
```

## next.config.ts cho Production

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      // Thêm domains cho remote images nếu cần
    ],
  },
  // Bật compression
  compress: true,
};

export default nextConfig;
```

## Postbuild Script (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "eslint",
    "postinstall": "prisma generate"
  }
}
```

> `postinstall` đảm bảo Prisma Client được generate trên Vercel.

## Performance Optimization

1. **Images**: Dùng `next/image` + WebP format
2. **Fonts**: `next/font` với `display: "swap"`
3. **Code splitting**: Next.js tự xử lý
4. **Static generation**: Pages không có dynamic data sẽ được pre-render
5. **API caching**: Dùng `revalidate` hoặc `cache` options
