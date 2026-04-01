<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Wedding Website — Agent Guidelines

## Project Type
Monolith Frontend, Component-Based Architecture

## Tech Stack
- **Framework**: Next.js 15+ (App Router) with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Database**: PostgreSQL (Prisma Postgres)
- **ORM**: Prisma 7
- **Deployment**: Vercel

## Agent Skills (`.agent/skills/`)

| Skill | Mô tả |
|-------|--------|
| `project-overview` | Tổng quan kiến trúc, folder structure, naming conventions |
| `create-component` | Tạo component mới (Server/Client/Form templates) |
| `create-api-route` | Tạo API Route Handler với Prisma + Zod validation |
| `create-page` | Tạo page mới với metadata, loading, error boundary |
| `database-prisma` | Prisma schema, queries, migration workflow |
| `styling-tailwind` | Tailwind CSS v4 + Shadcn UI + design system |
| `validation-zod` | Zod validation schemas (dual client/server) |
| `deployment-vercel` | Deploy checklist và config cho Vercel |
| `image-optimization` | Tối ưu hình ảnh với next/image |

## Workflows (`.agent/workflows/`)

| Workflow | Command | Mô tả |
|----------|---------|--------|
| `/dev` | Start dev server | Khởi động dev + Prisma |
| `/add-feature` | Add new feature | Component + API + DB workflow |
| `/deploy` | Deploy production | Build → Lint → Deploy Vercel |
| `/add-shadcn` | Add Shadcn component | Thêm UI component |

## Critical Rules
1. Default = **Server Component**. Chỉ dùng `"use client"` khi cần state/effects/browser APIs
2. Prisma chỉ chạy **server-side** — KHÔNG import trong client components
3. Validate input ở CẢ client và server (Zod)
4. Tất cả images dùng `next/image` component
5. Path alias: `@/*` → root directory
6. Prisma Client import: `import { PrismaClient } from "@/app/generated/prisma"`
7. `params` trong route handlers là **Promise** — phải `await`
