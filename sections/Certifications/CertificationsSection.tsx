"use client";

import { ArrowUpRight, Award } from "lucide-react";

import { certificationRecords } from "@/data/certifications";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function CertificationsSection() {
  const { t } = useI18n();

  return (
    <section id="certifications" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.certifications.eyebrow}
            title={t.certifications.title}
            description={t.certifications.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certificationRecords.map((record, idx) => {
            const item = t.certifications.items.find((entry) => entry.slug === record.slug);
            if (!item) return null;

            return (
              <Reveal key={record.slug} delay={0.04 + idx * 0.03}>
                <Card className="flex h-full flex-col p-5 hover:border-glass-strong hover:bg-glass-hover">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-glass bg-glass-subtle text-muted">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-faint">{record.issued}</span>
                  </div>

                  <h3 className="mt-4 text-sm font-semibold leading-snug tracking-tightish text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted">{record.issuer}</p>

                  <a
                    href={record.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-medium text-muted transition-colors hover:text-foreground"
                  >
                    {t.certifications.viewCertificate}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
