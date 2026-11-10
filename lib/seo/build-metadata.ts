import type { Metadata } from "next";

import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { getDictionary, localePath, locales, type Locale } from "@/lib/i18n";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** hreflang map for one page: every locale's URL plus x-default (`/`, which redirects by language). */
export function languageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[getDictionary(l).meta.htmlLang] = `${siteUrl}${localePath(l, path)}`;
  languages["x-default"] = `${siteUrl}${path || "/"}`;
  return languages;
}

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: Locale;
  /** Path after the locale prefix, e.g. `/projects/fitlog`. Empty for the home page. */
  path?: string;
  /** Page title; the home page uses the site title. */
  title?: string;
  description?: string;
}): Metadata {
  const t = getDictionary(locale);
  const siteTitle = `${t.profile.name} | ${t.profile.role}`;
  const desc = description ?? t.profile.tagline;
  const url = `${siteUrl}${localePath(locale, path)}`;
  const ogTitle = title ? `${title} | ${t.profile.name}` : siteTitle;
  // Listed explicitly: a nested page's own `openGraph` replaces the parent's, image included.
  const ogImage = { url: `${siteUrl}${localePath(locale, "/opengraph-image")}`, width: 1200, height: 630, alt: siteTitle };

  return {
    title: title ? { absolute: ogTitle } : { absolute: siteTitle },
    description: desc,
    keywords: t.meta.keywords,
    authors: [{ name: t.profile.name, url: siteUrl }],
    creator: t.profile.name,
    applicationName: t.profile.name,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: ogTitle,
      description: desc,
      type: title ? "article" : "profile",
      url,
      siteName: t.profile.name,
      locale: t.meta.htmlLang,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => getDictionary(l).meta.htmlLang),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: desc, images: [ogImage] },
    robots: { index: true, follow: true },
  };
}

/** schema.org Person for the home page, so search engines can show a profile result. */
export function personJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.profile.name,
    jobTitle: t.profile.role,
    description: t.profile.tagline,
    url: `${siteUrl}${localePath(locale)}`,
    image: `${siteUrl}${profile.avatar.src}`,
    sameAs: [profile.links.github, profile.links.linkedin],
    worksFor: { "@type": "Organization", name: "ATG Hospitality" },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
    address: { "@type": "PostalAddress", addressLocality: "Antalya", addressCountry: "TR" },
    knowsAbout: Object.values(skills).flatMap((group) => group.map((s) => s.name)),
    knowsLanguage: ["tr", "en"],
  };
}
