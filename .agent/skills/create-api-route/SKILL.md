---
name: create-api-route
description: Hướng dẫn tạo API Route Handler chuẩn cho project wedding-website
---

# 🔌 Tạo API Route (Route Handler)

## Vị trí đặt file

```
app/api/
├── wishes/
│   └── route.ts          # GET (list) + POST (create)
├── wishes/[id]/
│   └── route.ts          # GET (detail) + PUT + DELETE
├── rsvp/
│   └── route.ts          # POST (submit RSVP)
└── health/
    └── route.ts          # GET (health check)
```

## Template — GET + POST Route

```typescript
// app/api/wishes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { wishSchema } from "@/lib/validations";

// GET /api/wishes — Lấy danh sách lời chúc
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const skip = (page - 1) * limit;

    const [wishes, total] = await Promise.all([
      prisma.wish.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.wish.count(),
    ]);

    return NextResponse.json({
      data: wishes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/wishes]", error);
    return NextResponse.json(
      { error: "Không thể tải danh sách lời chúc" },
      { status: 500 }
    );
  }
}

// POST /api/wishes — Tạo lời chúc mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate với Zod
    const result = wishSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const wish = await prisma.wish.create({
      data: result.data,
    });

    return NextResponse.json({ data: wish }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/wishes]", error);
    return NextResponse.json(
      { error: "Không thể tạo lời chúc" },
      { status: 500 }
    );
  }
}
```

## Template — Dynamic Route ([id])

```typescript
// app/api/wishes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/wishes/:id
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const wish = await prisma.wish.findUnique({
      where: { id },
    });

    if (!wish) {
      return NextResponse.json(
        { error: "Không tìm thấy lời chúc" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: wish });
  } catch (error) {
    console.error(`[GET /api/wishes/${(await params).id}]`, error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra" },
      { status: 500 }
    );
  }
}

// DELETE /api/wishes/:id
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.wish.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Đã xóa thành công" });
  } catch (error) {
    console.error(`[DELETE /api/wishes/${(await params).id}]`, error);
    return NextResponse.json(
      { error: "Không thể xóa" },
      { status: 500 }
    );
  }
}
```

## Template — RSVP Route

```typescript
// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rsvpSchema } from "@/lib/validations";

// POST /api/rsvp — Submit RSVP
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = rsvpSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rSVP.create({
      data: result.data,
    });

    return NextResponse.json({ data: rsvp }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/rsvp]", error);
    return NextResponse.json(
      { error: "Không thể gửi xác nhận tham dự" },
      { status: 500 }
    );
  }
}
```

## Quy tắc API Route

### ✅ PHẢI
1. Luôn **validate input** với Zod trước khi xử lý
2. Luôn **wrap trong try-catch** với error logging
3. Trả về **response format thống nhất**: `{ data: ... }` hoặc `{ error: "...", details?: ... }`
4. Sử dụng **HTTP status codes** đúng chuẩn:
   - `200` — OK
   - `201` — Created
   - `400` — Bad Request (validation error)
   - `404` — Not Found
   - `500` — Internal Server Error
5. Log error kèm context: `console.error("[METHOD /api/resource]", error)`
6. Trong Next.js 15+, `params` là **Promise** — phải `await params` trước khi dùng

### ❌ KHÔNG
1. **KHÔNG** expose sensitive data (passwords, internal IDs nếu không cần)
2. **KHÔNG** để Prisma errors raw leak ra client — luôn trả message thân thiện
3. **KHÔNG** hardcode database queries phức tạp — tách ra `lib/` nếu cần reuse
4. **KHÔNG** quên handle edge cases (empty body, missing fields...)
5. **KHÔNG** hardcode URL string như `/api/wishes` trực tiếp trên các component. Thay vào đó, tạo config ở `lib/api-endpoints.ts` và import `API_ENDPOINTS.wishes` để gọi.

## API Response Format chuẩn

```typescript
// Success — Single item
{ data: { id: "...", name: "..." } }

// Success — List with pagination
{
  data: [...],
  pagination: { page: 1, limit: 20, total: 100, totalPages: 5 }
}

// Error
{
  error: "Mô tả lỗi thân thiện",
  details?: { fieldName: ["Chi tiết lỗi"] }
}
```
