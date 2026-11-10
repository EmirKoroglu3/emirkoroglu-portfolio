import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { AppProviders } from "@/components/providers/AppProviders";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { THEME_STORAGE_KEY } from "@/lib/i18n/constants";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

import "./studio.css";

// latin-ext for Turkish (İ, ş, ğ), cyrillic for Russian.
const sans = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

// Only /en, /tr, /de, /ru exist; everything is prerendered at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale });
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#151719" },
  ],
  colorScheme: "dark light",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(t==="light"?"light":"dark")}catch(e){document.documentElement.classList.add("dark")}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={t.meta.htmlLang} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="bg-bg text-text antialiased">
        <AppProviders locale={locale}>{children}</AppProviders>
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
