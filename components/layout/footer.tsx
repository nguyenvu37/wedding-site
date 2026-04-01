"use client";

import { useLocale } from "@/lib/i18n/locale-context";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="py-10 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Couple names */}
        <p className="font-serif text-2xl md:text-3xl italic tracking-wide">
          {t.footer.coupleNames}
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="w-12 h-px bg-primary-foreground/30" />
          <span className="text-primary-foreground/60">♥</span>
          <div className="w-12 h-px bg-primary-foreground/30" />
        </div>

        {/* Made with love */}
        <p className="text-sm text-primary-foreground/60">
          {t.footer.madeWith} ❤️ {t.footer.forOurWedding}
        </p>

        <p className="text-xs text-primary-foreground/40 mt-3">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
