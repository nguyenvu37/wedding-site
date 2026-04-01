---
description: Khởi động dev server và Prisma Studio cho development
---

# Dev Server Workflow

// turbo-all

## Bước 1: Generate Prisma Client

```bash
cd wedding-website && npx prisma generate
```

## Bước 2: Chạy dev server

```bash
cd wedding-website && npm run dev
```

Dev server chạy tại `http://localhost:3000`

## Bước 3 (Optional): Mở Prisma Studio

```bash
cd wedding-website && npx prisma studio
```

Prisma Studio chạy tại `http://localhost:5555`
