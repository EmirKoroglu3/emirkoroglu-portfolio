import { locales, type Locale } from "./types";

/** Fallback when neither the cookie nor Accept-Language names a supported locale. */
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** `/tr`, `/tr/projects/fitlog` … — every page URL is prefixed with its locale. */
export function localePath(locale: Locale, path = ""): string {
  return `/${locale}${path}`;
}

/** Link to a section of the home page that also works from other pages. */
export function sectionHref(locale: Locale, id: string): string {
  return `/${locale}#${id}`;
}

/** Same page in another language: `/tr/projects/x` → `/de/projects/x`. */
export function swapLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = next;
  else parts.splice(1, 0, next);
  return parts.join("/") || `/${next}`;
}

function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  for (const part of header.split(",")) {
    const code = part.trim().split(";")[0]?.slice(0, 2).toLowerCase();
    if (isLocale(code)) return code;
  }
  return null;
}

/** Locale for a visitor who lands on a URL without one (e.g. `/`). */
export function detectLocale(cookieValue: string | undefined, acceptLanguage: string | null): Locale {
  if (isLocale(cookieValue)) return cookieValue;
  return fromAcceptLanguage(acceptLanguage) ?? defaultLocale;
}
