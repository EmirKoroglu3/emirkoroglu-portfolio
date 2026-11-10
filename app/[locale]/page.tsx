import { notFound } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { isLocale } from "@/lib/i18n";
import { personJsonLd } from "@/lib/seo/build-metadata";
import { AboutSection } from "@/sections/About/AboutSection";
import { CertificationsSection } from "@/sections/Certifications/CertificationsSection";
import { ContactSection } from "@/sections/Contact/ContactSection";
import { ExperienceSection } from "@/sections/Experience/ExperienceSection";
import { Footer } from "@/sections/Footer/Footer";
import { GitHubSection } from "@/sections/GitHub/GitHubSection";
import { HeroSection } from "@/sections/Hero/HeroSection";
import { ProjectsSection } from "@/sections/Projects/ProjectsSection";
import { TechStackSection } from "@/sections/TechStack/TechStackSection";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main id="top" className="min-h-dvh">
      <script
        type="application/ld+json"
        // Static, server-built JSON; `<` is escaped so the content can't close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <TechStackSection />
      <CertificationsSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
