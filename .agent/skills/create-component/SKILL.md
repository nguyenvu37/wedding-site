---
name: create-component
description: Hướng dẫn tạo component mới theo chuẩn project wedding-website
---

# 🧩 Tạo Component Mới

## Phân loại Component

| Loại | Thư mục | Mô tả | Ví dụ |
|------|---------|--------|-------|
| UI | `components/ui/` | Primitive UI (Shadcn) | Button, Input, Dialog |
| Section | `components/sections/` | Block lớn trên page | HeroSection, GallerySection |
| Common | `components/common/` | Small reusable | CountdownTimer, SectionHeading |
| Layout | `components/layout/` | Layout wrappers | Header, Footer, Navigation |

## Template — Server Component (Mặc định)

```tsx
// components/sections/example-section.tsx
import { cn } from "@/lib/utils";

interface ExampleSectionProps {
  className?: string;
  title: string;
  description?: string;
}

export default function ExampleSection({
  className,
  title,
  description,
}: ExampleSectionProps) {
  return (
    <section
      id="example"
      className={cn(
        "relative w-full py-20 px-4 md:px-8 lg:px-16",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        {description && (
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            {description}
          </p>
        )}
        {/* Content here */}
      </div>
    </section>
  );
}
```

## Template — Client Component

```tsx
// components/common/countdown-timer.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  className?: string;
  targetDate: string; // ISO date string
}

export default function CountdownTimer({
  className,
  targetDate,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn("flex gap-4 justify-center", className)}>
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-4xl font-bold tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-sm text-muted-foreground capitalize">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
```

## Template — Form Component (Client)

```tsx
// components/sections/wishes-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { wishSchema, type WishFormData } from "@/lib/validations";

interface WishesFormProps {
  className?: string;
  onSuccess?: () => void;
}

export default function WishesForm({ className, onSuccess }: WishesFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      content: formData.get("content") as string,
    };

    // Client-side validation
    const result = wishSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Dữ liệu không hợp lệ");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error ?? "Có lỗi xảy ra");
      }

      setSuccess(true);
      e.currentTarget.reset();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4 w-full max-w-md mx-auto", className)}
    >
      <Input
        name="name"
        placeholder="Tên của bạn"
        required
        disabled={isSubmitting}
      />
      <Textarea
        name="content"
        placeholder="Lời chúc của bạn..."
        rows={4}
        required
        disabled={isSubmitting}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">
          Cảm ơn bạn đã gửi lời chúc! 💕
        </p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}
      </Button>
    </form>
  );
}
```

## Quy tắc khi tạo Component

### ✅ PHẢI
1. Luôn định nghĩa **Props interface** riêng biệt phía trên component
2. Luôn nhận `className?: string` để cho phép custom styling từ parent
3. Sử dụng `cn()` từ `@/lib/utils` để merge classNames
4. Mỗi section phải có `id` attribute unique để hỗ trợ scroll-to navigation
5. Export default (1 component per file)
6. Đặt `"use client"` directive ở dòng đầu tiên NẾU component cần:
   - `useState`, `useEffect`, `useRef`...
   - Event handlers (onClick, onSubmit...)
   - Browser APIs (window, document...)
   - Third-party client libraries
7. Sử dụng semantic HTML (`section`, `article`, `nav`, `header`, `footer`...)
8. Responsive: mobile-first với Tailwind breakpoints (`md:`, `lg:`, `xl:`)

### ❌ KHÔNG
1. **KHÔNG** đặt `"use client"` nếu component chỉ render static content
2. **KHÔNG** import Prisma client trực tiếp trong client components
3. **KHÔNG** hardcode text/strings — đặt trong `lib/constants.ts`
4. **KHÔNG** inline style — luôn dùng Tailwind classes
5. **KHÔNG** tạo component quá lớn (>200 lines) — chia nhỏ ra

## Cách thêm Shadcn UI component

```bash
# Thêm component mới từ Shadcn
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add dialog
npx shadcn@latest add card
npx shadcn@latest add toast
```

Components sẽ được tạo tự động trong `components/ui/`.
