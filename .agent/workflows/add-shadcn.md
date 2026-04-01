---
description: Thêm Shadcn UI component mới vào project
---

# Add Shadcn Component Workflow

// turbo-all

## Bước 1: Thêm component từ Shadcn registry

Thay `[component-name]` bằng tên component cần thêm (ví dụ: button, input, dialog, card, toast, form):

```bash
cd wedding-website && npx shadcn@latest add [component-name]
```

## Components thường dùng

```bash
cd wedding-website && npx shadcn@latest add button
cd wedding-website && npx shadcn@latest add input
cd wedding-website && npx shadcn@latest add textarea
cd wedding-website && npx shadcn@latest add card
cd wedding-website && npx shadcn@latest add dialog
cd wedding-website && npx shadcn@latest add toast
cd wedding-website && npx shadcn@latest add form
cd wedding-website && npx shadcn@latest add label
cd wedding-website && npx shadcn@latest add select
cd wedding-website && npx shadcn@latest add checkbox
```

Components sẽ được tạo trong `components/ui/`.

## Bước 2: Import và sử dụng

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```
