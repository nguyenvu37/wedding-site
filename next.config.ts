import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js tự động optimize ảnh sang WebP/AVIF
    formats: ["image/webp", "image/avif"],
    // Nếu sau này dùng ảnh từ CDN/Supabase Storage, thêm domain vào đây
    // remotePatterns: [
    //   { protocol: "https", hostname: "your-supabase-url.supabase.co" },
    // ],
  },
};

export default nextConfig;
