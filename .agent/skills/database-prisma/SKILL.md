---
name: database-prisma
description: Hướng dẫn làm việc với Prisma ORM và database schema cho wedding-website
---

# 🗄️ Database & Prisma ORM

## Database Schema

File: `prisma/schema.prisma`

### Schema hiện tại

```prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Wish {
  id        String   @id @default(cuid())
  name      String   // Tên người gửi
  content   String   // Nội dung lời chúc
  createdAt DateTime @default(now())
}

model RSVP {
  id          String   @id @default(cuid())
  name        String   // Tên khách mời
  phone       String?  // Số điện thoại
  isAttending Boolean  // Có tham gia hay không
  guestsCount Int      @default(1) // Số người đi cùng
  note        String?  // Ghi chú
  createdAt   DateTime @default(now())
}
```

## Prisma Client Singleton

File: `lib/prisma.ts`

```typescript
import { PrismaClient } from "@/app/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

> **QUAN TRỌNG**: Singleton pattern tránh tạo quá nhiều connection trong development mode (khi Next.js hot-reload).

## Prisma Config

File: `prisma.config.ts`

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

## Các lệnh Prisma thường dùng

### Development workflow

```bash
# 1. Sau khi thay đổi schema
npx prisma generate          # Tạo lại Prisma Client types

# 2. Push schema lên DB (KHÔNG tạo migration file — dùng cho prototyping)
npx prisma db push

# 3. Tạo migration (dùng cho production workflow)
npx prisma migrate dev --name <tên_migration>
# Ví dụ: npx prisma migrate dev --name add_wishes_table

# 4. Xem DB qua GUI
npx prisma studio

# 5. Reset DB (XÓA toàn bộ data)
npx prisma migrate reset

# 6. Seed data
npx prisma db seed
```

### Production deployment

```bash
# Chạy migrations trên production
npx prisma migrate deploy

# Generate client cho production build
npx prisma generate
```

## Thêm Model mới

### Quy trình

1. Thêm model vào `prisma/schema.prisma`
2. Chạy `npx prisma generate` để update types
3. Chạy `npx prisma db push` (dev) hoặc `npx prisma migrate dev` (staging/prod)
4. Tạo Zod validation schema tương ứng trong `lib/validations.ts`
5. Tạo API route trong `app/api/[resource]/route.ts`

### Convention cho Model

```prisma
model ModelName {
  // Primary key — luôn dùng cuid()
  id        String   @id @default(cuid())
  
  // Required fields
  name      String
  
  // Optional fields — dùng ?
  phone     String?
  
  // Default values
  count     Int      @default(0)
  isActive  Boolean  @default(true)
  
  // Timestamps — luôn có createdAt
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt    // Tự động cập nhật
  
  // Indexes (nếu cần query performance)
  @@index([createdAt])
}
```

## Prisma Query Patterns

### Trong Server Components

```tsx
// app/page.tsx (Server Component — KHÔNG cần "use client")
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  // Fetch trực tiếp trong Server Component
  const wishes = await prisma.wish.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div>
      {wishes.map((wish) => (
        <div key={wish.id}>
          <strong>{wish.name}</strong>: {wish.content}
        </div>
      ))}
    </div>
  );
}
```

### Trong Route Handlers

```typescript
// app/api/wishes/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  const wishes = await prisma.wish.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ data: wishes });
}
```

### Common queries

```typescript
// Tạo mới
const wish = await prisma.wish.create({
  data: { name: "...", content: "..." },
});

// Lấy danh sách với pagination
const wishes = await prisma.wish.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: "desc" },
});

// Đếm total
const total = await prisma.wish.count();

// Tìm theo id
const wish = await prisma.wish.findUnique({
  where: { id: "..." },
});

// Cập nhật
const updated = await prisma.wish.update({
  where: { id: "..." },
  data: { content: "new content" },
});

// Xóa
await prisma.wish.delete({
  where: { id: "..." },
});

// Batch operations
const [wishes, rsvps] = await Promise.all([
  prisma.wish.findMany(),
  prisma.rSVP.findMany({ where: { isAttending: true } }),
]);
```

## Lưu ý quan trọng

1. **Prisma Client chỉ chạy server-side** — KHÔNG import trong client components
2. **Generated output** tại `app/generated/prisma/` — thư mục này KHÔNG cần commit (gitignore)
3. **Connection string** trong `.env` — DATABASE_URL
4. **Model name `RSVP`** → Prisma method dùng `prisma.rSVP` (camelCase)
5. Sau mỗi lần thay đổi schema → **PHẢI chạy `npx prisma generate`** để cập nhật types
