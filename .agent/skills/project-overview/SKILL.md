---
name: project-overview
description: Tổng quan kiến trúc và convention cho project wedding-website Next.js monolith
---

# 🏗️ Project Overview — Wedding Website

## Tổng quan

Đây là một **monolith frontend** wedding website xây dựng trên **Next.js 15+ (App Router)** với kiến trúc **component-based**. Website phục vụ cho đám cưới, bao gồm các tính năng: hiển thị thông tin, gửi lời chúc, xác nhận tham dự (RSVP).

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | ^15.5.14 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| UI Components | Shadcn UI | latest |
| Database | PostgreSQL (Prisma Postgres / Supabase) | — |
| ORM | Prisma | ^7.6.0 |
| Deployment | Vercel | — |
| React | React 19 | 19.2.4 |

## Cấu trúc thư mục chuẩn

```
wedding-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (landing)
│   ├── globals.css               # Global styles + Tailwind
│   ├── favicon.ico
│   ├── generated/prisma/         # Prisma Client generated
│   ├── (routes)/                 # Route groups
│   │   ├── wishes/
│   │   │   └── page.tsx
│   │   └── rsvp/
│   │       └── page.tsx
│   └── api/                      # API Routes (Route Handlers)
│       ├── wishes/
│       │   └── route.ts
│       └── rsvp/
│           └── route.ts
├── components/                   # Reusable UI components
│   ├── ui/                       # Shadcn UI components (auto-generated)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── sections/                 # Page sections (large blocks)
│   │   ├── hero-section.tsx
│   │   ├── couple-section.tsx
│   │   ├── timeline-section.tsx
│   │   ├── gallery-section.tsx
│   │   ├── wishes-section.tsx
│   │   └── rsvp-section.tsx
│   ├── common/                   # Shared small components
│   │   ├── countdown-timer.tsx
│   │   ├── scroll-to-top.tsx
│   │   ├── loading-spinner.tsx
│   │   └── section-heading.tsx
│   └── layout/                   # Layout components
│       ├── header.tsx
│       ├── footer.tsx
│       └── navigation.tsx
├── lib/                          # Shared utilities & configs
│   ├── prisma.ts                 # Prisma client singleton
│   ├── utils.ts                  # Helper functions (cn, formatDate...)
│   ├── validations.ts            # Zod schemas for form validation
│   └── constants.ts              # App constants (wedding date, names...)
├── hooks/                        # Custom React hooks
│   ├── use-countdown.ts
│   ├── use-intersection.ts
│   └── use-media-query.ts
├── types/                        # TypeScript type definitions
│   └── index.ts
├── public/                       # Static assets
│   ├── images/                   # Wedding images (optimized WebP)
│   ├── fonts/                    # Custom fonts (if any)
│   └── icons/
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/
├── prisma.config.ts
├── next.config.ts
├── tailwind.config.ts            # (nếu cần custom Tailwind v4)
├── tsconfig.json
├── postcss.config.mjs
├── package.json
└── .env                          # Environment variables
```

## Quy tắc chung

### 1. Naming Convention
- **Files/Folders**: `kebab-case` (ví dụ: `hero-section.tsx`, `use-countdown.ts`)
- **Components**: `PascalCase` (ví dụ: `HeroSection`, `CountdownTimer`)
- **Functions/Variables**: `camelCase` (ví dụ: `formatDate`, `isAttending`)
- **Constants**: `UPPER_SNAKE_CASE` (ví dụ: `WEDDING_DATE`, `API_BASE_URL`)
- **Types/Interfaces**: `PascalCase` với prefix mô tả (ví dụ: `WishFormData`, `RSVPResponse`)

### 2. Component Pattern
- Mỗi component 1 file, export default
- Props interface đặt ngay trên component
- Sử dụng `"use client"` directive CHỈ khi component cần client-side interactivity
- Mặc định tất cả components là **Server Components** trừ khi cần state/effects/browser APIs

### 3. Styling
- Sử dụng **Tailwind CSS v4** (import-based, không cần tailwind.config)
- Custom theme tokens đặt trong `globals.css` trong block `@theme inline {}`
- Sử dụng `cn()` utility (from `lib/utils.ts`) để merge classNames
- Shadcn UI components nằm trong `components/ui/`

### 4. Data Fetching
- **Server-side**: Fetch trực tiếp trong Server Components hoặc Route Handlers
- **Client-side**: Sử dụng `fetch()` với API Routes khi cần mutation
- Prisma client chỉ được sử dụng ở **server-side** (Route Handlers, Server Components, Server Actions)

### 5. Database
- Schema định nghĩa trong `prisma/schema.prisma`
- Generated client output tại `app/generated/prisma/`
- Prisma client singleton pattern tại `lib/prisma.ts`
- Luôn chạy `npx prisma generate` sau khi thay đổi schema
- Luôn chạy `npx prisma db push` hoặc `npx prisma migrate dev` để sync DB

### 6. API Routes (Route Handlers)
- Đặt trong `app/api/[resource]/route.ts`
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`
- Validate input với Zod schema trước khi xử lý
- Trả về `NextResponse.json()` với status code phù hợp
- Luôn wrap trong try-catch, trả về error message rõ ràng

### 7. Form Handling
- Validate client-side + server-side (dual validation)
- Sử dụng Zod schemas (shared giữa client và server)
- Hiển thị loading state và error/success messages

### 8. SEO & Performance
- Mỗi page phải export `metadata` object (title, description, openGraph)
- Sử dụng `next/image` cho tất cả images (auto-optimize)
- Ưu tiên WebP format cho images
- Lazy load sections không ở viewport ban đầu
- Sử dụng `loading="lazy"` hoặc `priority` attribute hợp lý

### 9. Environment Variables
- `.env` cho local development
- `.env.local` cho local overrides (gitignored)
- Prefix `NEXT_PUBLIC_` cho client-side env vars
- Database URL và sensitive keys KHÔNG được prefix `NEXT_PUBLIC_`
