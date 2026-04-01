---
name: validation-zod
description: Hướng dẫn tạo validation schemas với Zod cho wedding-website
---

# ✅ Form Validation với Zod

## Setup

```bash
npm install zod
```

## Validation Schemas

File: `lib/validations.ts`

```typescript
import { z } from "zod";

// ===== Wish Schema =====
export const wishSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên").max(100).trim(),
  content: z.string().min(1, "Vui lòng nhập lời chúc").max(1000).trim(),
});
export type WishFormData = z.infer<typeof wishSchema>;

// ===== RSVP Schema =====
export const rsvpSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên").max(100).trim(),
  phone: z.string().regex(/^(0|\+84)\d{9,10}$/, "SĐT không hợp lệ").optional().or(z.literal("")),
  isAttending: z.boolean({ required_error: "Vui lòng chọn" }),
  guestsCount: z.number().int().min(1).max(10).default(1),
  note: z.string().max(500).optional().or(z.literal("")),
});
export type RSVPFormData = z.infer<typeof rsvpSchema>;
```

## Sử dụng

### Client-side
```tsx
const result = wishSchema.safeParse(data);
if (!result.success) {
  const errors = result.error.flatten().fieldErrors;
  return;
}
// result.data đã typed + validated
```

### Server-side (API Route)
```typescript
const result = wishSchema.safeParse(body);
if (!result.success) {
  return NextResponse.json(
    { error: "Dữ liệu không hợp lệ", details: result.error.flatten().fieldErrors },
    { status: 400 }
  );
}
```

## Quy tắc
- **Dual validation**: validate ở CẢ client và server
- Schemas đặt trong `lib/validations.ts` — shared
- Error messages bằng tiếng Việt
- Export cả schema và `z.infer<>` type
- Handle empty string cho optional: `.optional().or(z.literal(""))`
