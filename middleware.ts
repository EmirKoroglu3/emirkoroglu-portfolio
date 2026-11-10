import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { LOCALE_COOKIE_KEY } from "@/lib/i18n/constants";
import { detectLocale, isLocale } from "@/lib/i18n/routing";
import { buildSecurityHeaders } from "@/lib/security/headers";

const isProd = process.env.NODE_ENV === "production";

/** Paths that are not pages: API routes, metadata routes and any file with an extension. */
function isNonPage(pathname: string) {
  return (
    pathname.startsWith("/api/") ||
    pathname === "/icon" ||
    pathname.startsWith("/opengraph-image") ||
    /\.[a-z0-9]+$/i.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  // Pages live under /[locale]; send `/` and old un-prefixed URLs to the visitor's language.
  // (The #fragment of old links like /#projects is kept by the browser across the redirect.)
  const response =
    !isNonPage(pathname) && !isLocale(firstSegment)
      ? NextResponse.redirect(
          new URL(
            `/${detectLocale(request.cookies.get(LOCALE_COOKIE_KEY)?.value, request.headers.get("accept-language"))}${
              pathname === "/" ? "" : pathname
            }${search}`,
            request.url,
          ),
        )
      : NextResponse.next();

  for (const [key, value] of Object.entries(buildSecurityHeaders(isProd))) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
