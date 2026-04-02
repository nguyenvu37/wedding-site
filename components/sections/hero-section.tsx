"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/locale-context";
import { formatDate } from "@/lib/utils";

const HERO_IMAGES = [
  "/images/hero/image4n2a3951.webp",
  "/images/hero/image4n2a4426.webp",
  "/images/hero/image4n2a4772.webp",
];

export default function HeroSection() {
  const { t, locale } = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE ?? "2026/04/30";

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length,
    );
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Slide backgrounds */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Wedding Image ${i + 1}`}
            fill
            className="object-cover object-[50%_40%]"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay để làm chìm ảnh, tăng focus cho chữ */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/40 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative leaf SVGs */}
      <svg
        className="absolute top-[20%] right-[18%] w-16 h-16 text-white/30"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M32 8 C40 16, 52 24, 56 40 C52 36, 44 32, 32 32 C20 32, 12 36, 8 40 C12 24, 24 16, 32 8Z" />
        <path d="M32 32 L32 56" />
      </svg>
      <svg
        className="absolute bottom-[30%] left-[15%] w-12 h-12 text-white/25 rotate-180"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M32 8 C40 16, 52 24, 56 40 C52 36, 44 32, 32 32 C20 32, 12 36, 8 40 C12 24, 24 16, 32 8Z" />
        <path d="M32 32 L32 56" />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
        {/* Decorative frame overlay */}
        <div className="relative backdrop-blur-[2px] px-8 py-10 md:px-20 md:py-14 max-w-xxl drop-shadow-xl rounded-sm transform translate-y-80">
          {/* Corner decorations */}
          {/* <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/60" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/60" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/60" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/60" /> */}

          {/* Names */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic tracking-wide leading-tight">
            {t.names.groom} {t.hero.heart} {t.names.bride}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base md:text-lg tracking-[0.2em] font-light">
            {t.hero.wereGettingMarried}
          </p>

          {/* Date */}
          <p className="mt-2 text-lg md:text-xl tracking-[0.3em] font-light">
            {formatDate(weddingDate, locale)}
          </p>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all z-41 cursor-pointer"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all z-41 cursor-pointer"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === i
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
