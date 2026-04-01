"use client";

import { useLocale } from "@/lib/i18n/locale-context";

const STORY_META = [
  { date: "2020", icon: "☕" },
  { date: "2021", icon: "💕" },
  { date: "2023", icon: "💍" },
  { date: "2026", icon: "💒" },
];

export default function LoveStorySection() {
  const { t } = useLocale();

  return (
    <section id="love-story" className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        {/* Title */}
        <h2 className="font-serif text-3xl md:text-4xl italic text-primary text-center mb-4">
          {t.loveStory.title}
        </h2>
        <div className="flex items-center justify-center gap-3 mb-14">
          <div className="w-20 ornament-line" />
          <svg className="w-5 h-5 text-primary/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="w-20 ornament-line" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {STORY_META.map((meta, i) => {
              const item = t.loveStory.items[i];
              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${
                    i % 2 === 0 ? "" : "md:flex-row-reverse"
                  } md:mb-16`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <div className="bg-secondary/30 rounded-xl p-6 border border-border/30 hover:shadow-md transition-shadow">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">
                        {meta.date}
                      </span>
                      <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center icon */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center text-xl shadow-sm">
                    {meta.icon}
                  </div>

                  {/* Spacer for the other side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

