import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Navbar } from "@/components/layout/Navbar";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary, isLocale, localePath, locales, sectionHref, type Locale } from "@/lib/i18n";
import { buildPageMetadata, jsonLdScript, projectJsonLd } from "@/lib/seo/build-metadata";
import { Footer } from "@/sections/Footer/Footer";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getDictionary(locale).projects.items.map((p) => ({ locale, slug: p.slug })),
  );
}

function findProject(locale: Locale, slug: string) {
  const t = getDictionary(locale);
  const index = t.projects.items.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return {
    t,
    index,
    project: t.projects.items[index],
    caseStudy: t.caseStudies.items.find((c) => c.project === slug),
    next: t.projects.items[(index + 1) % t.projects.items.length],
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const found = findProject(locale, slug);
  if (!found) return {};
  return buildPageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: found.project.title,
    description: found.project.description,
  });
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const found = findProject(locale, slug);
  if (!found) notFound();
  const { t, index, project, caseStudy, next } = found;
  const total = t.projects.items.length;

  return (
    <main id="top" className="min-h-dvh">
      <script
        type="application/ld+json"
        // Static, server-built JSON; `<` is escaped so the content can't close the tag.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(projectJsonLd(locale, project, { home: t.profile.name, projects: t.nav.projects })),
        }}
      />
      <Navbar />
      <article className="pt-[100px] md:pt-[120px]">
        <Container>
          <div className="studio-meta">
            <span>
              PORTFOLIO / PROJECTS / {project.slug.toUpperCase()}
            </span>
            <span>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <Reveal>
            <Link
              href={sectionHref(locale, "projects")}
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-[hsl(var(--accent))]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t.projects.backToProjects}
            </Link>
            <h1 className="mt-6 text-balance text-[clamp(44px,7vw,96px)] font-semibold leading-[.98] tracking-[-0.06em]">
              {project.title}
              <span className="text-[hsl(var(--accent))]">.</span>
            </h1>
            <p className="studio-tagline !max-w-2xl">{project.description}</p>
            <div className="studio-actions">
              {project.github ? (
                <Button href={project.github} target="_blank" rel="noreferrer" size="lg">
                  <GitHubIcon className="h-4 w-4" />
                  {t.projects.sourceCode}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              ) : null}
              {project.liveUrl ? (
                <Button href={project.liveUrl} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                  {t.common.liveSite}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              ) : null}
            </div>
          </Reveal>

          <div className="detail-grid border-t border-[hsl(var(--border)/.65)] mt-14">
            <aside className="detail-aside">
              <div className="detail-label">{t.projects.techStack}</div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </aside>

            <div className="min-w-0">
              <Reveal className="detail-block">
                <h2 className="detail-label">{t.projects.highlights}</h2>
                <ol className="detail-numbered">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ol>
              </Reveal>

              {caseStudy ? (
                <>
                  <Reveal className="detail-block">
                    <h2 className="detail-label">{t.caseStudies.problem}</h2>
                    <p className="detail-prose">{caseStudy.problem}</p>
                  </Reveal>
                  <Reveal className="detail-block">
                    <h2 className="detail-label">{t.caseStudies.solution}</h2>
                    <p className="detail-prose">{caseStudy.solution}</p>
                  </Reveal>
                  <Reveal className="detail-block">
                    <h2 className="detail-label">{t.projects.results}</h2>
                    <ol className="detail-numbered">
                      {caseStudy.results.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ol>
                  </Reveal>
                </>
              ) : null}
            </div>
          </div>

          {total > 1 ? (
            <Link
              href={localePath(locale, `/projects/${next.slug}`)}
              className="group flex items-center justify-between gap-6 border-t border-[hsl(var(--border))] py-10"
            >
              <span>
                <span className="mono-label">NEXT →</span>
                <span className="mt-3 block text-[clamp(24px,3vw,36px)] font-normal tracking-[-0.04em] transition-colors group-hover:text-[hsl(var(--accent))]">
                  {next.title}
                </span>
              </span>
              <span className="project-record-arrow" aria-hidden>
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          ) : null}
        </Container>
      </article>
      <Footer />
    </main>
  );
}
