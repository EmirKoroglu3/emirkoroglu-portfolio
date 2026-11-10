"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  LOCALE_COOKIE_KEY,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_STORAGE_KEY,
} from "@/lib/i18n/constants";
import { getDictionary, swapLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

/** Remembered so that `/` sends returning visitors to the language they picked. */
function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // storage can be unavailable (private mode); the cookie is enough
  }
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`;
}

/** The locale comes from the URL (`/[locale]/…`); switching languages navigates to the same page in that language. */
export function I18nProvider({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      persistLocale(next);
      router.push(`${swapLocale(pathname, next)}${window.location.hash}`, { scroll: false });
    },
    [locale, pathname, router],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: getDictionary(locale) }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
