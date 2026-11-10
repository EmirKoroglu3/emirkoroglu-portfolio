"use client";

import type { Locale } from "@/lib/i18n";

import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";

export function AppProviders({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <ThemeProvider>
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </ThemeProvider>
  );
}
