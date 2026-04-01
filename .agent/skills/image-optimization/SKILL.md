---
name: image-optimization
description: Hướng dẫn tối ưu hóa hình ảnh cho wedding-website với Next.js Image
---

# 🖼️ Image Optimization

## Sử dụng `next/image`

```tsx
import Image from "next/image";

// Local image (trong /public/images/)
<Image
  src="/images/hero-wedding.webp"
  alt="Ảnh cưới"
  width={1200}
  height={800}
  priority           // Cho ảnh above-the-fold (hero)
  className="object-cover rounded-2xl"
/>

// Fill mode (responsive container)
<div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
  <Image
    src="/images/couple.webp"
    alt="Couple photo"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
</div>
```

## Tổ chức ảnh

```
public/images/
├── hero/           # Ảnh hero banner
├── gallery/        # Ảnh gallery
├── couple/         # Ảnh cặp đôi
├── icons/          # Icons/decorations
└── og-image.jpg    # OpenGraph image (1200x630)
```

## Quy tắc

1. **Format**: Ưu tiên WebP, fallback JPEG
2. **Size**: Max 500KB per image, lý tưởng < 200KB
3. **Dimensions**: Cung cấp `width` + `height` hoặc dùng `fill`
4. **`priority`**: CHỈ cho hero image / above-the-fold
5. **`sizes`**: Luôn set cho responsive images
6. **`alt`**: Mô tả rõ ràng bằng tiếng Việt
7. **Lazy loading**: Mặc định (không cần set cho below-fold images)

## Convert ảnh sang WebP

```bash
# Dùng sharp CLI
npx sharp-cli --input public/images/*.{jpg,png} --output public/images/ --format webp --quality 85
```

## next.config.ts

```typescript
const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
};
```
