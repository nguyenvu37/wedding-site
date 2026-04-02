"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/locale-context";

const ALBUM_IMAGES = [
  "/images/album/image4n2a4087.jpg",
  "/images/album/image4n2a4109.jpg",
  "/images/album/image4n2a4141.jpg",
  "/images/album/image4n2a4156ok.jpg",
  "/images/album/image4n2a4168.jpg",
  "/images/album/image4n2a4199.jpg",
  "/images/album/image4n2a4205.jpg",
  "/images/album/image4n2a4219.jpg",
  "/images/album/image4n2a4232.jpg",
  "/images/album/image4n2a4300.jpg",
  "/images/album/image4n2a4310.jpg",
  "/images/album/image4n2a4335.jpg",
  "/images/album/image4n2a4388.jpg",
  "/images/album/image4n2a4617.jpg",
  "/images/album/image4n2a4705.jpg",
  "/images/album/image4n2a4824.jpg",
  "/images/album/image4n2a5215.jpg",
  "/images/album/image4n2a5303.jpg",
  "/images/album/image4n2a5322.jpg",
  "/images/album/image4n2a5458.jpg",
  "/images/album/image4n2a5462.jpg",
  "/images/album/image4n2a5474.jpg",
  "/images/album/image4n2a5503.jpg",
  "/images/album/image4n2a5511.jpg",
  "/images/album/image4n2a5511crop.jpg",
  "/images/album/image4n2a5536.jpg",
  "/images/album/qh_01448.jpg",
  "/images/album/qh_01682.jpg",
  "/images/album/qh_01711.jpg",
  "/images/album/qh_01715.jpg",
  "/images/album/qh_01897.jpg",
  "/images/album/qh_02046.jpg",
  "/images/album/qh_02209.jpg",
  "/images/album/qh_02299.jpg",
];

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 12;

export default function AlbumSection() {
  const { t } = useLocale();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const visibleImages = ALBUM_IMAGES.slice(0, visibleCount);
  const hasMore = visibleCount < ALBUM_IMAGES.length;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % ALBUM_IMAGES.length : null,
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + ALBUM_IMAGES.length) % ALBUM_IMAGES.length
        : null,
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const getMosaicClass = (index: number) => {
    // Mobile pattern (2 columns): 6 item cycle
    // Tall at 0, 4
    const isMobileTall = [0, 4].includes(index % 6);

    // Desktop pattern (3 columns): 12 item cycle
    // Tall at 0, 1, 5, 6, 8, 10
    const isDesktopTall = [0, 1, 5, 6, 8, 10].includes(index % 12);

    let classes = "group relative overflow-hidden rounded-xl cursor-pointer album-card shadow-sm col-span-1 w-full h-full ";

    if (isMobileTall && isDesktopTall) {
      classes += "row-span-2 aspect-2/3";
    } else if (!isMobileTall && !isDesktopTall) {
      classes += "row-span-1 aspect-auto";
    } else if (isMobileTall && !isDesktopTall) {
      classes += "row-span-2 aspect-2/3 md:row-span-1 md:aspect-auto";
    } else if (!isMobileTall && isDesktopTall) {
      classes += "row-span-1 aspect-auto md:row-span-2 md:aspect-2/3";
    }

    return classes;
  };

  return (
    <section id="album" className="py-16 md:py-24 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <h2 className="font-serif text-3xl md:text-4xl italic text-primary text-center mb-4">
          {t.album.title}
        </h2>
        <div className="flex items-center justify-center gap-3 mb-14">
          <div className="w-20 ornament-line" />
          <div className="w-2 h-2 rounded-full bg-border" />
          <div className="w-20 ornament-line" />
        </div>

        {/* Mosaic Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-dense gap-3 md:gap-4">
          {visibleImages.map((src, index) => (
            <div
              key={src}
              className={getMosaicClass(index)}
              onClick={() => openLightbox(index)}
              style={{ animationDelay: `${(index % LOAD_MORE_COUNT) * 60}ms` }}
            >
              {/* Skeleton loader */}
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 animate-pulse" />
              )}

              <Image
                src={src}
                alt={`Wedding photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
              />

              {/* Hover overlay with gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom shine effect on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-gold/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </div>
          ))}
        </div>

        {/* Load more button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + LOAD_MORE_COUNT, ALBUM_IMAGES.length),
                )
              }
              className="group relative px-8 py-3 rounded-full border-2 border-primary/30 text-primary font-medium tracking-wider text-sm hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">
                Xem thêm ({ALBUM_IMAGES.length - visibleCount} ảnh)
              </span>
              <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-medium tracking-wider text-sm">
                Xem thêm ({ALBUM_IMAGES.length - visibleCount} ảnh)
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md lightbox-backdrop" />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-light tracking-widest">
            {lightboxIndex + 1} / {ALBUM_IMAGES.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
            aria-label="Previous photo"
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

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] lightbox-image"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ALBUM_IMAGES[lightboxIndex]}
              alt={`Wedding photo ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              priority
            />
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
            aria-label="Next photo"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
