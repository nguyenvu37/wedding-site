---
name: styling-tailwind
description: Hướng dẫn setup và sử dụng Tailwind CSS v4 + Shadcn UI cho wedding-website
---

# 🎨 Styling — Tailwind CSS v4 + Shadcn UI

## Setup Tailwind CSS v4

Project sử dụng **Tailwind CSS v4** (import-based, không file `tailwind.config.js` truyền thống).

### PostCSS Config

```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Global CSS

```css
/* app/globals.css */
@import "tailwindcss";

/* ===== CSS Variables + Theme Tokens ===== */
:root {
  /* Brand Colors — Wedding Theme */
  --background: #fefcf9;
  --foreground: #1a1a2e;
  --primary: #b8860b;           /* Gold */
  --primary-foreground: #ffffff;
  --secondary: #f5e6d3;         /* Cream */
  --secondary-foreground: #1a1a2e;
  --accent: #d4a373;            /* Warm Gold */
  --accent-foreground: #1a1a2e;
  --muted: #f0ebe3;
  --muted-foreground: #6b7280;
  --destructive: #ef4444;
  --border: #e5ddd0;
  --ring: #b8860b;
  --radius: 0.75rem;

  /* Typography */
  --font-heading: var(--font-playfair), "Playfair Display", serif;
  --font-body: var(--font-inter), "Inter", sans-serif;
}

/* Dark mode (optional) */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a1a2e;
    --foreground: #fefcf9;
    --primary: #d4a373;
    --muted: #2a2a3e;
    --muted-foreground: #9ca3af;
    --border: #3a3a4e;
  }
}

/* ===== Tailwind v4 Theme Mapping ===== */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --radius-default: var(--radius);
  --font-sans: var(--font-body);
  --font-serif: var(--font-heading);
}

/* ===== Base Styles ===== */
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body);
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

/* ===== Custom Animations ===== */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

## Utility: `cn()` Helper

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

> **Cần install**: `npm install clsx tailwind-merge`

## Shadcn UI Setup

### Cài đặt Shadcn

```bash
# Init Shadcn trong project
npx shadcn@latest init

# Chọn: 
# Style: Default
# Base color: Slate (hoặc custom)
# CSS variables: Yes
```

### Thêm components

```bash
npx shadcn@latest add button input textarea card dialog toast
npx shadcn@latest add form label select checkbox radio-group
```

### Shadcn components được lưu tại

```
components/ui/
├── button.tsx
├── input.tsx
├── textarea.tsx
├── card.tsx
├── dialog.tsx
├── toast.tsx
└── ...
```

## Wedding Design System

### Typography Scale

```tsx
{/* Heading chính — dùng font serif (Playfair Display) */}
<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
  Tên Cô Dâu & Chú Rể
</h1>

{/* Heading phụ */}
<h2 className="font-serif text-3xl md:text-4xl font-semibold">
  Section Title
</h2>

{/* Subtitle */}
<p className="font-sans text-lg md:text-xl text-muted-foreground">
  Subtitle text
</p>

{/* Body text */}
<p className="font-sans text-base leading-relaxed text-foreground/80">
  Body content
</p>

{/* Caption / Small text */}
<span className="text-sm text-muted-foreground">
  Caption
</span>
```

### Spacing Pattern cho Sections

```tsx
{/* Section chuẩn */}
<section className="py-16 md:py-24 lg:py-32 px-4 md:px-8">
  <div className="mx-auto max-w-6xl">
    {/* Content */}
  </div>
</section>

{/* Section với background */}
<section className="py-16 md:py-24 bg-secondary/30">
  <div className="mx-auto max-w-6xl px-4 md:px-8">
    {/* Content */}
  </div>
</section>
```

### Wedding-specific Components Styling

```tsx
{/* Card style — cho wishes/gallery */}
<div className="rounded-2xl border border-border/50 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow">

{/* Decorative divider */}
<div className="flex items-center gap-4 my-8">
  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  <span className="text-primary text-2xl">💍</span>
  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
</div>

{/* CTA Button */}
<button className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
  Xác nhận tham dự
</button>
```

### Responsive Breakpoints

| Breakpoint | Width | Dùng cho |
|-----------|-------|----------|
| Default | < 640px | Mobile |
| `sm:` | ≥ 640px | Small mobile landscape |
| `md:` | ≥ 768px | Tablet |
| `lg:` | ≥ 1024px | Desktop |
| `xl:` | ≥ 1280px | Large desktop |

### Animation on Scroll (Intersection Observer)

```tsx
// hooks/use-intersection.ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersection(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
```

Sử dụng:

```tsx
"use client";
import { useIntersection } from "@/hooks/use-intersection";
import { cn } from "@/lib/utils";

export default function AnimatedSection({ children }) {
  const { ref, isVisible } = useIntersection();
  
  return (
    <section
      ref={ref}
      className={cn(
        "opacity-0 translate-y-8 transition-all duration-700",
        isVisible && "opacity-100 translate-y-0"
      )}
    >
      {children}
    </section>
  );
}
```

## Quy tắc Styling

### ✅ PHẢI
1. Sử dụng CSS variables cho colors (theme-able)
2. Mobile-first responsive design
3. Sử dụng `cn()` để merge class names
4. Font serif cho headings, sans-serif cho body
5. Smooth transitions cho hover/focus states
6. Subtle animations (không lòe loẹt)

### ❌ KHÔNG
1. **KHÔNG** dùng inline styles
2. **KHÔNG** hardcode hex colors trong components — dùng CSS variables
3. **KHÔNG** quên responsive breakpoints
4. **KHÔNG** dùng animation quá nhiều gây lag
5. **KHÔNG** import CSS modules — dùng Tailwind classes
