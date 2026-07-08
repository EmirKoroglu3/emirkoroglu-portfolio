"use client";

import { Suspense, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

import { GA_MEASUREMENT_ID, gaPageview, isGaEnabled } from "@/lib/analytics/ga";

function trackCurrentUrl(pathname: string, search: string) {
  const qs = search ? `?${search}` : "";
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  gaPageview(`${pathname}${qs}${hash}`);
}

/**
 * Sends GA4 page_view on App Router navigation and hash changes
 * (this portfolio uses #section anchors as SPA-like routes).
 */
function GoogleAnalyticsPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGaEnabled()) return;

    const search = searchParams?.toString() ?? "";
    trackCurrentUrl(pathname, search);

    const onHashChange = () => {
      trackCurrentUrl(pathname, search);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Official GA4 bootstrap for Next.js via next/script (afterInteractive).
 * Scripts only render in production.
 */
export function GoogleAnalytics() {
  if (!isGaEnabled()) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageViews />
      </Suspense>
    </>
  );
}
