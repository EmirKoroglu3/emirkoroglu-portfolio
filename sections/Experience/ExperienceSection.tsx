"use client";

import { BriefcaseBusiness, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function ExperienceSection() {
  const { t } = useI18n();

  return (
    <section id="experience" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
            description={t.experience.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {t.experience.items.map((item, idx) => (
            <Reveal key={`${item.company}-${item.role}`} delay={0.05 + idx * 0.05}>
              <Card className="flex h-full flex-col p-6 md:p-7 hover:border-glass-strong hover:bg-glass-hover">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-glass bg-glass-subtle text-muted">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-semibold tracking-tightish text-foreground">
                        {item.role}
                      </div>
                      <div className="mt-1 text-sm text-muted">
                        {item.company}
                        {item.org ? (
                          <>
                            {" "}
                            <span className="text-faint">/</span> {item.org}
                          </>
                        ) : null}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-faint">
                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {item.location}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full border-glass bg-glass-subtle px-3 py-1.5 text-xs text-muted">
                    {item.start} - {item.end}
                  </div>
                </div>

                <div className="mt-6 grid gap-2">
                  {item.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="rounded-2xl border-glass bg-glass-subtle px-4 py-3 text-sm text-muted"
                    >
                      {bullet}
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
