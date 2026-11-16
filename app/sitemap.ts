import type { MetadataRoute } from "next";

import { getDictionary, localePath, locales } from "@/lib/i18n";
import { languageAlternates, siteUrl } from "@/lib/seo/build-metadata";

// No lastModified: a build timestamp would claim every page changed on each deploy,
// which teaches crawlers to ignore it. changefreq/priority are ignored by Google.
export default function sitemap(): MetadataRoute.Sitemap {
  // Project slugs are the same in every language.
  const paths = ["", ...getDictionary("en").projects.items.map((p) => `/projects/${p.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
