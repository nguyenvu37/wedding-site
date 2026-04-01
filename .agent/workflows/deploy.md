---
description: Deploy wedding-website lên Vercel production
---

# Deploy Workflow

## Bước 1: Kiểm tra build

// turbo
```bash
cd wedding-website && npm run build
```

Nếu có lỗi, sửa trước khi deploy.

## Bước 2: Kiểm tra lint

// turbo
```bash
cd wedding-website && npm run lint
```

## Bước 3: Chạy Prisma Migrations (nếu có thay đổi schema)

```bash
cd wedding-website && npx prisma migrate deploy
```

## Bước 4: Deploy lên Vercel

```bash
cd wedding-website && npx vercel --prod
```

Hoặc push lên GitHub branch `main` nếu đã connect Vercel với repo.

## Bước 5: Verify

Mở URL production và kiểm tra:
- [ ] Trang chủ load đúng
- [ ] Ảnh hiển thị
- [ ] Form gửi lời chúc hoạt động
- [ ] Form RSVP hoạt động
- [ ] Mobile responsive
