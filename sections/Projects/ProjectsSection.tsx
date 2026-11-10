"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { localePath } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function ProjectsSection() {
  const { t, locale } = useI18n();

  return (
    <section id="projects" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow={t.projects.eyebrow}
            file="projects/"
            title={t.projects.title}
            description={t.projects.description}
          />
        </Reveal>

        <div className="ledger project-grid">
          {t.projects.items.map((p, idx) => (
            <Reveal key={p.slug} delay={0.04 + idx * 0.02} className="h-full">
              <Link href={localePath(locale, `/projects/${p.slug}`)} className="project-record group">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0 max-w-[780px]">
                    <div className="project-file-index">
                      <span>{String(idx + 1).padStart(2, "0")}</span>
                      <small>PROJECT / {p.slug}</small>
                    </div>
                    <h3 className="project-record-title">{p.title}</h3>
                    <p className="mt-3 max-w-[640px] text-sm leading-[1.8] text-muted">{p.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <span className="project-record-cta">
                      {t.projects.viewDetails} <span aria-hidden>→</span>
                    </span>
                  </div>
                  <span className="project-record-arrow" aria-hidden>
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
