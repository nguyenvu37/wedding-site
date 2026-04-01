"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/i18n/locale-context";
import { locales, type Locale } from "@/lib/i18n";

const FLAG_EMOJI: Record<Locale, string> = {
  vi: "🇻🇳",
  en: "🇬🇧",
  ja: "🇯🇵",
};

export default function LanguageSwitcher() {
  const { locale, t, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg border border-border/50"
        aria-label="Change language"
      >
        <span className="text-base">{FLAG_EMOJI[locale]}</span>
        <span className="hidden sm:inline text-foreground/80">
          {t.language[locale]}
        </span>
        <svg
          className={`h-3.5 w-3.5 text-foreground/60 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-xl border border-border/50 overflow-hidden animate-fade-in">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                locale === loc
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70"
              }`}
            >
              <span className="text-base">{FLAG_EMOJI[loc]}</span>
              <span>{t.language[loc]}</span>
              {locale === loc && (
                <svg className="ml-auto h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
