"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n/locale-context";

export default function CountdownSection() {
  const { t } = useLocale();
  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE ?? "2026/04/30";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculate() {
      const now = new Date().getTime();
      const target = new Date(weddingDate).getTime();
      const diff = target - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  const items = [
    { value: timeLeft.days, label: t.countdown.days },
    { value: timeLeft.hours, label: t.countdown.hours },
    { value: timeLeft.minutes, label: t.countdown.minutes },
    { value: timeLeft.seconds, label: t.countdown.seconds },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-16 ornament-line" />
          <svg className="w-5 h-5 text-primary/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="w-16 ornament-line" />
        </div>

        {/* Diamond countdown blocks */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              {/* Diamond shape */}
              <div className="diamond w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white shadow-sm">
                <div className="diamond-content text-center">
                  <span className="text-2xl md:text-4xl font-bold text-primary tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
              </div>
              {/* Label below */}
              <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-wider uppercase mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
