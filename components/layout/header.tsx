"use client";

import { useLocale } from "@/lib/i18n/locale-context";
import LanguageSwitcher from "@/components/common/language-switcher";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const NAV_KEYS = [
  { key: "home" as const, href: "#home" },
  { key: "couple" as const, href: "#couple" },
  { key: "loveStory" as const, href: "#love-story" },
  { key: "album" as const, href: "#album" },
  { key: "guestbook" as const, href: "#guestbook" },
  // { key: "weddingGift" as const, href: "#wedding-gift" },
] as const;

export default function Header() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <a
          href="#home"
          className={cn(
            "font-serif text-xl font-semibold tracking-wide transition-colors",
            scrolled ? "text-primary" : "text-white"
          )}
        >
          V <span className="text-accent">♥</span> H
        </a>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_KEYS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                scrolled ? "text-foreground/70" : "text-white/90"
              )}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
