"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

interface Wish {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface GuestbookSectionProps {
  initialWishes?: Wish[];
}

export default function GuestbookSection({ initialWishes = [] }: GuestbookSectionProps) {
  const { t, locale } = useLocale();
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const isFetchingRef = useRef(false);

  async function loadWishes(currentPage: number) {
    if (currentPage === 1) setIsLoading(true);
    else setIsFetchingNextPage(true);
    
    isFetchingRef.current = true;

    try {
      const res = await fetch(`${API_ENDPOINTS.wishes}?page=${currentPage}&limit=50`, {
        headers: { "x-locale": locale },
      });
      if (res.ok) {
        const { data, pagination } = await res.json();

        if (currentPage === 1) {
          setWishes(data);
        } else {
          setWishes((prev) => {
            const uniqueNewData = data.filter((w: Wish) => !prev.some((p) => p.id === w.id));
            return [...prev, ...uniqueNewData];
          });
        }

        setHasMore(currentPage < pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch wishes", error);
    } finally {
      setIsLoading(false);
      setIsFetchingNextPage(false);
      isFetchingRef.current = false;
    }
  }

  useEffect(() => {
    if (!initialWishes.length) {
      loadWishes(1);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 150) {
      if (hasMore && !isFetchingNextPage && !isLoading && !isFetchingRef.current) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadWishes(nextPage);
      }
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Client validation
    if (!name.trim()) {
      setError(t.validation.nameRequired);
      return;
    }
    if (name.trim().length > 100) {
      setError(t.validation.nameTooLong);
      return;
    }
    if (!content.trim()) {
      setError(t.validation.wishRequired);
      return;
    }
    if (content.trim().length > 1000) {
      setError(t.validation.wishTooLong);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(API_ENDPOINTS.wishes, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-locale": locale 
        },
        body: JSON.stringify({ name: name.trim(), content: content.trim() }),
      });

      if (!res.ok) {
        throw new Error(t.guestbook.errorMessage);
      }

      const { data } = await res.json();
      setWishes((prev) => [data, ...prev]);
      setName("");
      // setEmail("");
      setContent("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError(t.guestbook.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="guestbook" className="py-16 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title with decorative butterfly */}
        <div className="text-center mb-12">
          <div className="text-4xl mb-2">🦋</div>
          <h2 className="font-serif text-3xl md:text-4xl italic text-primary">
            {t.guestbook.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-20 ornament-line" />
            <div className="w-2 h-2 rounded-full bg-border" />
            <div className="w-20 ornament-line" />
          </div>
        </div>

        {/* Two-column layout: form + wishes list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Form */}
          <div className="guestbook-card rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.guestbook.namePlaceholder}
                  disabled={isSubmitting}
                  className="w-full border-b-2 border-border bg-transparent py-2 px-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.guestbook.emailPlaceholder}
                  disabled={isSubmitting}
                  className="w-full border-b-2 border-border bg-transparent py-2 px-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div> */}

              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t.guestbook.wishPlaceholder}
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full border-b-2 border-border bg-transparent py-2 px-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-600">{t.guestbook.successMessage}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full sm:w-auto px-8 py-2.5 rounded-lg text-sm font-semibold tracking-wider transition-all",
                  isSubmitting
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary-dark shadow-md hover:shadow-lg"
                )}
              >
                {isSubmitting ? "..." : t.guestbook.submitButton}
              </button>
            </form>
          </div>

          {/* Wishes list */}
          <div 
            className="guestbook-card rounded-lg p-6 md:p-8 max-h-[500px] overflow-y-auto"
            onScroll={handleScroll}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                <p className="text-sm text-muted-foreground animate-pulse">{t.messages.loadingWishes}</p>
              </div>
            ) : wishes.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm italic py-8">
                {t.guestbook.emptyState}
              </p>
            ) : (
              <div className="space-y-5">
                {wishes.map((wish) => (
                  <div key={wish.id} className="border-b border-border/50 pb-4 last:border-b-0">
                    <p className="font-semibold text-sm text-foreground">
                      {wish.name}
                    </p>
                    <p className="mt-1 text-sm text-foreground/70 italic leading-relaxed">
                      &ldquo;{wish.content}&rdquo;
                    </p>
                  </div>
                ))}
                
                {/* Loader spinner for next pages */}
                {isFetchingNextPage && (
                  <div className="flex justify-center py-4">
                    <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
