"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const { t, locale } = useLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState(1);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError(t.validation.nameRequired);
      return;
    }
    if (isAttending === null) {
      setError(t.validation.attendanceRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(API_ENDPOINTS.rsvp, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-locale": locale 
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim() || undefined,
          isAttending,
          guestsCount: isAttending ? guestsCount : 0,
          note: note.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setName("");
        setPhone("");
        setIsAttending(null);
        setGuestsCount(1);
        setNote("");
      }, 2500);
    } catch {
      setError(t.rsvp.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 md:p-8 animate-fade-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
        >
          ✕
        </button>

        <h2 className="font-serif text-2xl text-primary text-center mb-6">
          {t.rsvp.title}
        </h2>

        {success ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-green-600 font-medium">{t.rsvp.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.rsvp.namePlaceholder}
              disabled={isSubmitting}
              className="w-full border-b-2 border-border bg-transparent py-2 px-1 text-sm focus:border-primary focus:outline-none transition-colors"
            />

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.rsvp.phonePlaceholder}
              disabled={isSubmitting}
              className="w-full border-b-2 border-border bg-transparent py-2 px-1 text-sm focus:border-primary focus:outline-none transition-colors"
            />

            {/* Attendance selection */}
            <div className="space-y-2">
              <label
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                  isAttending === true
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <input
                  type="radio"
                  name="attendance"
                  checked={isAttending === true}
                  onChange={() => setIsAttending(true)}
                  className="accent-primary"
                />
                <span className="text-sm font-medium">{t.rsvp.attending}</span>
              </label>

              <label
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                  isAttending === false
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                <input
                  type="radio"
                  name="attendance"
                  checked={isAttending === false}
                  onChange={() => setIsAttending(false)}
                  className="accent-accent"
                />
                <span className="text-sm font-medium">{t.rsvp.notAttending}</span>
              </label>
            </div>

            {/* Guests count - only show if attending */}
            {isAttending && (
              <div className="flex items-center gap-3">
                <label className="text-sm text-foreground/70">{t.rsvp.guestsCount}:</label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="border border-border rounded-lg px-3 py-1.5 text-sm bg-white focus:border-primary focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            )}

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.rsvp.notePlaceholder}
              rows={3}
              disabled={isSubmitting}
              className="w-full border-b-2 border-border bg-transparent py-2 px-1 text-sm focus:border-primary focus:outline-none transition-colors resize-none"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wider hover:bg-primary-dark transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "..." : t.rsvp.submitButton}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
