import { de } from "./dictionaries/de";
import { en } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";
import { tr } from "./dictionaries/tr";

import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale, NavId } from "./types";
export { locales } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, tr, de, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
  de: "DE",
  ru: "RU",
};

export { LOCALE_COOKIE_KEY, LOCALE_COOKIE_MAX_AGE, LOCALE_STORAGE_KEY, THEME_STORAGE_KEY } from "./constants";

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "tr" || value === "de" || value === "ru";
}
