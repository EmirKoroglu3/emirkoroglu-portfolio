import { cookies, headers } from "next/headers";

import { LOCALE_COOKIE_KEY } from "@/lib/i18n/constants";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

function parseAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  for (const part of header.split(",")) {
    const code = part.trim().split(";")[0]?.slice(0, 2).toLowerCase();
    if (code && isLocale(code)) return code;
  }

  return null;
}

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LOCALE_COOKIE_KEY)?.value;
  if (cookieValue && isLocale(cookieValue)) return cookieValue;

  const headerStore = await headers();
  const fromHeader = parseAcceptLanguage(headerStore.get("accept-language"));
  if (fromHeader) return fromHeader;

  return "en";
}

export async function getServerDictionary() {
  return getDictionary(await getServerLocale());
}
