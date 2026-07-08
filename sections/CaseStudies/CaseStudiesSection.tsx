"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function CaseStudiesSection() {
  const { t } = useI18n();

  return (
    <section id="case-studies" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.caseStudies.eyebrow}
            title={t.caseStudies.title}
            description={t.caseStudies.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {t.caseStudies.items.map((cs, idx) => (
            <Reveal key={cs.slug} delay={0.05 + idx * 0.05}>
              <Card className="p-6 md:p-7 hover:border-glass-strong hover:bg-glass-hover">
                <div className="text-xl font-semibold tracking-tightish text-foreground">{cs.title}</div>

                <div className="mt-5 grid gap-4 text-sm text-muted">
                  <div>
                    <div className="text-xs font-medium tracking-[0.2em] text-faint">{t.caseStudies.problem}</div>
                    <div className="mt-2 text-pretty">{cs.problem}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium tracking-[0.2em] text-faint">{t.caseStudies.solution}</div>
                    <div className="mt-2 text-pretty">{cs.solution}</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {cs.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <div className="mt-6 grid gap-2">
                  {cs.results.map((r) => (
                    <div
                      key={r}
                      className="rounded-2xl border-glass bg-glass-subtle px-4 py-3 text-sm text-muted"
                    >
                      {r}
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
