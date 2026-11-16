import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Bare /cv has no page; without this the locale middleware sends it to /en/cv (404).
  async redirects() {
    return [
      { source: "/cv", destination: "/cv/emir-koroglu-cv-en.pdf", permanent: true },
      { source: "/:locale(en|de|ru)/cv", destination: "/cv/emir-koroglu-cv-en.pdf", permanent: true },
      { source: "/tr/cv", destination: "/cv/emir-koroglu-cv-tr.pdf", permanent: true },
    ];
  },
  // Keep the CV PDFs out of search results; they duplicate the site and leak contact details to snippets.
  async headers() {
    return [{ source: "/cv/:file*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
  },
};

export default nextConfig;

