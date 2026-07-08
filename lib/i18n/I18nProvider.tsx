"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import {
  LOCALE_COOKIE_KEY,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_STORAGE_KEY,
} from "@/lib/i18n/constants";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function persistLocale(locale: Locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`;
}

function readBrowserLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && isLocale(stored)) return stored;

  const cookieMatch = document.cookie.match(new RegExp(`${LOCALE_COOKIE_KEY}=([^;]+)`));
  if (cookieMatch?.[1] && isLocale(cookieMatch[1])) return cookieMatch[1];

  const browser = navigator.language.slice(0, 2);
  if (isLocale(browser)) return browser;

  return "en";
}

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const detected = readBrowserLocale();
    if (detected !== initialLocale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(detected);
      persistLocale(detected);
      router.refresh();
      return;
    }
    persistLocale(detected);
  }, [initialLocale, router]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      persistLocale(next);
      document.documentElement.lang = getDictionary(next).meta.htmlLang;
      router.refresh();
    },
    [router],
  );

  useEffect(() => {
    document.documentElement.lang = getDictionary(locale).meta.htmlLang;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: getDictionary(locale),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
