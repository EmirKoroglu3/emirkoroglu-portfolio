import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/sections/About/AboutSection";
import { CertificationsSection } from "@/sections/Certifications/CertificationsSection";
import { CaseStudiesSection } from "@/sections/CaseStudies/CaseStudiesSection";
import { ContactSection } from "@/sections/Contact/ContactSection";
import { ExperienceSection } from "@/sections/Experience/ExperienceSection";
import { Footer } from "@/sections/Footer/Footer";
import { GitHubSection } from "@/sections/GitHub/GitHubSection";
import { HeroSection } from "@/sections/Hero/HeroSection";
import { ProjectsSection } from "@/sections/Projects/ProjectsSection";
import { TechStackSection } from "@/sections/TechStack/TechStackSection";

export default function Page() {
  return (
    <main id="top" className="min-h-dvh">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ExperienceSection />
      <CertificationsSection />
      <ProjectsSection />
      <CaseStudiesSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

