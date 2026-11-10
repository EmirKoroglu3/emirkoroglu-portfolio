import type { MetadataRoute } from "next";

import { getDictionary, localePath, locales } from "@/lib/i18n";
import { languageAlternates, siteUrl } from "@/lib/seo/build-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Project slugs are the same in every language.
  const paths = ["", ...getDictionary("en").projects.items.map((p) => `/projects/${p.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path ? 0.7 : 1,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
