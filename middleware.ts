import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { buildSecurityHeaders } from "@/lib/security/headers";

const isProd = process.env.NODE_ENV === "production";

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  const headers = buildSecurityHeaders(isProd);

  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|opengraph-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
