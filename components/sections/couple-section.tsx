"use client";

import { useLocale } from "@/lib/i18n/locale-context";

export default function CoupleSection() {
  const { t } = useLocale();

  return (
    <section id="couple" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-4">
          {/* Groom */}
          <div className="flex flex-col items-center text-center flex-1 max-w-sm">
            {/* Photo frame */}
            <div className="couple-frame w-48 h-48 md:w-56 md:h-56 mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                <span className="text-gray-400 text-xs font-medium">
                  {t.couple.groom}
                </span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-serif text-2xl md:text-3xl italic text-primary mb-3">
              {t.names.groomFull}
            </h3>

            {/* Parents */}
            <p className="text-sm text-foreground/70 leading-relaxed">
              <span>{t.couple.fatherOf}</span>{" "}
              <span className="font-semibold">{t.names.groomFather}</span>
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              <span>{t.couple.motherOf}</span>{" "}
              <span className="font-semibold">{t.names.groomMother}</span>
            </p>

            {/* Bio */}
            <p className="mt-4 text-sm text-foreground/60 leading-relaxed max-w-xs italic">
              &ldquo;{t.couple.groomBio}&rdquo;
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-4">
              {["facebook", "twitter", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social}
                >
                  {social === "facebook" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  )}
                  {social === "twitter" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  )}
                  {social === "instagram" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1.5"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Center couple photo */}
          <div className="flex-shrink-0 order-first lg:order-none">
            <div className="oval-frame w-64 h-80 md:w-72 md:h-96">
              <div className="w-full h-full rounded-[50%] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                <span className="text-gray-400 text-xs font-medium text-center px-4">
                  COUPLE PHOTO
                </span>
              </div>
            </div>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center text-center flex-1 max-w-sm">
            {/* Photo frame */}
            <div className="couple-frame w-48 h-48 md:w-56 md:h-56 mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                <span className="text-gray-400 text-xs font-medium">
                  {t.couple.bride}
                </span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-serif text-2xl md:text-3xl italic text-primary mb-3">
              {t.names.brideFull}
            </h3>

            {/* Parents */}
            <p className="text-sm text-foreground/70 leading-relaxed">
              <span>{t.couple.uncleOf}</span>{" "}
              <span className="font-semibold">{t.names.brideFather}</span>
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              <span>{t.couple.motherOf}</span>{" "}
              <span className="font-semibold">{t.names.brideMother}</span>
            </p>

            {/* Bio */}
            <p className="mt-4 text-sm text-foreground/60 leading-relaxed max-w-xs italic">
              &ldquo;{t.couple.brideBio}&rdquo;
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-4">
              {["facebook", "twitter", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social}
                >
                  {social === "facebook" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  )}
                  {social === "twitter" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  )}
                  {social === "instagram" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1.5"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
