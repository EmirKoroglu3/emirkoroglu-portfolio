import type { Metadata } from "next";

import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { defaultLocale, getDictionary, localePath, locales, type Locale } from "@/lib/i18n";

/**
 * Absolute origin used in canonicals, hreflang, sitemap and JSON-LD.
 * Falls back to Vercel's production domain before localhost, so a missing
 * NEXT_PUBLIC_SITE_URL on a deploy can't leak localhost into indexed URLs.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");

/**
 * hreflang map for one page: every locale's URL plus x-default.
 * x-default points at the default-locale page itself (200), not at `/`, which only redirects.
 */
export function languageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[getDictionary(l).meta.htmlLang] = `${siteUrl}${localePath(l, path)}`;
  languages["x-default"] = `${siteUrl}${localePath(defaultLocale, path)}`;
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
  const siteTitle = t.meta.title;
  const desc = description ?? t.meta.description;
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

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

function personNode(locale: Locale) {
  const t = getDictionary(locale);
  return {
    "@type": "Person",
    "@id": personId,
    name: t.profile.name,
    alternateName: "Emir Koroglu",
    givenName: "Emir",
    familyName: "Köroğlu",
    jobTitle: t.profile.role,
    description: t.meta.description,
    url: `${siteUrl}${localePath(locale)}`,
    image: `${siteUrl}${profile.avatar.src}`,
    sameAs: [profile.links.github, profile.links.linkedin],
    worksFor: { "@type": "Organization", name: "ATG Hospitality" },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school, sameAs: "https://www.akdeniz.edu.tr" },
    address: { "@type": "PostalAddress", addressLocality: "Antalya", addressCountry: "TR" },
    knowsAbout: Object.values(skills).flatMap((group) => group.map((s) => s.name)),
    knowsLanguage: ["tr", "en"],
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: "Emir Köroğlu",
    publisher: { "@id": personId },
    inLanguage: locales.map((l) => getDictionary(l).meta.htmlLang),
  };
}

/** Home page graph: ProfilePage about the Person, inside the WebSite, so search engines can show a profile result. */
export function homeJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  const url = `${siteUrl}${localePath(locale)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: t.meta.htmlLang,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      personNode(locale),
      websiteNode(),
    ],
  };
}

/** Project page graph: breadcrumb plus the project as source code authored by the Person. */
export function projectJsonLd(
  locale: Locale,
  project: { slug: string; title: string; description: string; stack: readonly string[]; github?: string; demo?: string },
  labels: { home: string; projects: string },
) {
  const t = getDictionary(locale);
  const home = `${siteUrl}${localePath(locale)}`;
  const url = `${siteUrl}${localePath(locale, `/projects/${project.slug}`)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: labels.home, item: home },
          { "@type": "ListItem", position: 2, name: labels.projects, item: `${home}#projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}#project`,
        name: project.title,
        description: project.description,
        url,
        inLanguage: t.meta.htmlLang,
        keywords: project.stack.join(", "),
        ...(project.github ? { codeRepository: project.github } : {}),
        ...(project.demo ? { sameAs: project.demo } : {}),
        author: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
      personNode(locale),
      websiteNode(),
    ],
  };
}

/** Serialize JSON-LD for a <script> tag; `<` is escaped so the content can't close the tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
