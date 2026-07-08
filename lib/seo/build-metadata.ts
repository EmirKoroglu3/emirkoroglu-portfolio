import type { Metadata } from "next";

import { getDictionary, type Locale } from "@/lib/i18n";

export function buildSiteMetadata(locale: Locale, siteUrl: string): Metadata {
  const t = getDictionary(locale);
  const title = `${t.profile.name} | ${t.profile.role}`;

  return {
    title: {
      default: title,
      template: `%s | ${t.profile.name}`,
    },
    description: t.profile.tagline,
    keywords: t.meta.keywords,
    authors: [{ name: t.profile.name }],
    creator: t.profile.name,
    applicationName: t.profile.name,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
      languages: {
        en: siteUrl,
        tr: siteUrl,
        de: siteUrl,
        ru: siteUrl,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      title,
      description: t.profile.tagline,
      type: "website",
      url: siteUrl,
      siteName: t.profile.name,
      locale: t.meta.htmlLang,
      alternateLocale: ["en", "tr", "de", "ru"].filter((l) => l !== t.meta.htmlLang),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.profile.tagline,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
