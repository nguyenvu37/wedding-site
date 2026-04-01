"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  vi,
  en,
  ja,
  defaultLocale,
  type Locale,
  type Translations,
} from "@/lib/i18n";

const translations: Record<Locale, Translations> = { vi, en, ja };

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      document.documentElement.lang =
        newLocale === "vi" ? "vi" : newLocale === "ja" ? "ja" : "en";
    }
  }, []);

  const value: LocaleContextValue = {
    locale,
    t: translations[locale],
    setLocale,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
