"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/locale-context";

export default function EventsSection() {
  const { t } = useLocale();

  return (
    <section id="events" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <h2 className="font-serif text-4xl md:text-5xl italic text-foreground text-center mb-4">
          {t.events.title}
        </h2>
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="w-16 ornament-line" />
          <div className="text-accent animate-pulse-soft">♥</div>
          <div className="w-16 ornament-line" />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          {t.events.eventsList?.map((event: any, index: number) => {
            // Alternate rotations: left, right, right, left
            const rotationClass =
              index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]";
            const hoverRotationClass =
              index % 2 === 0 ? "hover:rotate-0" : "hover:rotate-0";

            return (
              <div
                key={event.id}
                className={`flex flex-col transform transition-all duration-500 ease-out ${rotationClass} ${hoverRotationClass}`}
              >
                {/* Polaroid Frame */}
                <div className="bg-white p-3 md:p-4 pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border/50 rounded-sm relative group">
                  {/* Image container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={event.image || "/images/album/image4n2a4087.jpg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Dress Code overlapping bottom center of image */}
                    {event.dressCode && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-sm border border-white/50 flex flex-col items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-foreground">
                          {t.events.dressCode}
                        </span>
                        <div className="flex gap-2">
                          {event.dressCode.map((color: string, idx: number) => (
                            <div
                              key={idx}
                              className="w-5 h-5 rounded-full border border-border/50 shadow-inner"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Details (Outside of Polaroid) */}
                <div className="mt-8 px-2 flex flex-col items-center text-center">
                  <h3 className="text-2xl md:text-3xl text-accent mb-4 tracking-wide uppercase">
                    {event.title}
                  </h3>

                  <div className="flex flex-col gap-2 mb-6">
                    <p className="font-semibold text-foreground/80 tracking-widest">
                      {event.time}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {event.location}
                    </p>
                  </div>

                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-sm text-foreground/70 border border-foreground/30 rounded-full px-6 py-2.5 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors tracking-widest uppercase font-medium"
                  >
                    {t.events.map}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
