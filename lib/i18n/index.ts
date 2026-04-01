export { default as vi } from "./vi";
export { default as en } from "./en";
export { default as ja } from "./ja";
export type { Translations } from "./vi";

import vi from "./vi";
import en from "./en";
import ja from "./ja";

export type Locale = "vi" | "en" | "ja";

export const locales: Locale[] = ["vi", "en", "ja"];
export const defaultLocale: Locale = "vi";

const translations: Record<Locale, typeof vi> = { vi, en, ja };

export function getTranslations(locale?: string | null) {
  if (locale && locales.includes(locale as Locale)) {
    return translations[locale as Locale];
  }
  return translations[defaultLocale];
}
