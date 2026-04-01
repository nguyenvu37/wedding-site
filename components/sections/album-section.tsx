"use client";

import { useLocale } from "@/lib/i18n/locale-context";

const ALBUM_PLACEHOLDERS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  label: `Photo ${i + 1}`,
}));

export default function AlbumSection() {
  const { t } = useLocale();

  return (
    <section id="album" className="py-16 md:py-24 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <h2 className="font-serif text-3xl md:text-4xl italic text-primary text-center mb-4">
          {t.album.title}
        </h2>
        <div className="flex items-center justify-center gap-3 mb-14">
          <div className="w-20 ornament-line" />
          <div className="w-2 h-2 rounded-full bg-border" />
          <div className="w-20 ornament-line" />
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {ALBUM_PLACEHOLDERS.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 border border-border/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-8 h-8 mx-auto text-gray-300 mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                    />
                  </svg>
                  <span className="text-xs text-gray-400">{photo.label}</span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
