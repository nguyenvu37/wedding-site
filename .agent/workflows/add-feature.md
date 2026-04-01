---
description: Quy trình thêm feature mới (component + API + validation) cho wedding-website
---

# Add Feature Workflow

## Bước 1: Xác định loại feature

- Cần database model mới? → Bước 2
- Chỉ cần component UI? → Bước 4
- Cần API endpoint? → Bước 3

## Bước 2: Thêm Database Model

1. Đọc skill `database-prisma` tại `.agent/skills/database-prisma/SKILL.md`
2. Thêm model vào `prisma/schema.prisma`
3. Chạy:

```bash
cd wedding-website && npx prisma generate
```

```bash
cd wedding-website && npx prisma db push
```

4. Tạo Zod validation schema trong `lib/validations.ts` (xem skill `validation-zod`)

## Bước 3: Tạo API Route

1. Đọc skill `create-api-route` tại `.agent/skills/create-api-route/SKILL.md`
2. Tạo file `app/api/[resource]/route.ts`
3. Import Prisma client từ `@/lib/prisma`
4. Import validation schema từ `@/lib/validations`

## Bước 4: Tạo Component

1. Đọc skill `create-component` tại `.agent/skills/create-component/SKILL.md`
2. Xác định loại component:
   - Section → `components/sections/`
   - Common UI → `components/common/`
   - Layout → `components/layout/`
3. Tạo file theo naming convention: `kebab-case.tsx`
4. Style theo skill `styling-tailwind`

## Bước 5: Tích hợp

1. Import component vào page (`app/page.tsx`)
2. Truyền data từ server vào component qua props
3. Test trên dev server

## Bước 6: Verify

// turbo
```bash
cd wedding-website && npm run build
```

Đảm bảo build thành công không lỗi.
