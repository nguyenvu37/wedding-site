"use client";

import { useLocale } from "@/lib/i18n/locale-context";

interface WeddingGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WeddingGiftModal({ isOpen, onClose }: WeddingGiftModalProps) {
  const { t } = useLocale();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 md:p-8 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
        >
          ✕
        </button>

        <h2 className="font-serif text-2xl text-primary text-center mb-3">
          {t.weddingGift.title}
        </h2>

        <p className="text-center text-sm text-muted-foreground mb-8">
          {t.weddingGift.description}
        </p>

        {/* Bank info cards */}
        <div className="space-y-4">
          {/* Groom bank */}
          <div className="rounded-xl border border-border p-5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {t.couple.groom}
            </p>
            <p className="font-semibold text-foreground">{t.names.groomFull}</p>
            <p className="text-sm text-foreground/70 mt-1">{t.names.groomBank}</p>
            <p className="text-lg font-mono font-bold text-primary mt-1 tracking-wider">
              {t.names.groomAccountNumber}
            </p>
            {/* QR placeholder */}
            <div className="mt-3 mx-auto w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">{t.weddingGift.qrScan}</span>
            </div>
          </div>

          {/* Bride bank */}
          <div className="rounded-xl border border-border p-5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {t.couple.bride}
            </p>
            <p className="font-semibold text-foreground">{t.names.brideFull}</p>
            <p className="text-sm text-foreground/70 mt-1">{t.names.brideBank}</p>
            <p className="text-lg font-mono font-bold text-primary mt-1 tracking-wider">
              {t.names.brideAccountNumber}
            </p>
            <div className="mt-3 mx-auto w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">{t.weddingGift.qrScan}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-lg border border-border text-sm font-medium text-foreground/70 hover:bg-secondary transition-colors"
        >
          {t.weddingGift.close}
        </button>
      </div>
    </div>
  );
}
