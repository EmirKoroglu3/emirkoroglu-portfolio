"use client";

import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";

import { certificationRecords } from "@/data/certifications";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function CertificationsSection() {
  const { t } = useI18n();

  // "2025-11" → "Kas 2025" / "Nov 2025" / "Nov. 2025" / "нояб. 2025"
  const formatIssued = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(t.meta.htmlLang, { month: "short", year: "numeric", timeZone: "UTC" });
    return (ym: string) => {
      const [y, m] = ym.split("-").map(Number);
      return fmt.format(new Date(Date.UTC(y, m - 1, 1)));
    };
  }, [t.meta.htmlLang]);

  return (
    <section id="certifications" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow={t.certifications.eyebrow}
            file="certificates.yml"
            title={t.certifications.title}
            description={t.certifications.description}
          />
        </Reveal>

        <ul className="ledger cert-list">
          {certificationRecords.map((record, idx) => {
            const item = t.certifications.items.find((entry) => entry.slug === record.slug);
            if (!item) return null;

            return (
              <li key={record.slug}>
                <Reveal delay={0.02 + idx * 0.02}>
                  <a
                    href={record.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ledger-row cert-row"
                    aria-label={`${item.title} — ${t.certifications.viewCertificate}`}
                  >
                    <span className="col-span-2 font-mono text-[10px] tracking-[0.08em]">
                      <span className="text-[hsl(var(--accent))]">{formatIssued(record.issued)}</span>
                      <span className="text-faint"> · {record.issuer}</span>
                    </span>
                    <span className="ledger-title text-[15px] leading-snug">{item.title}</span>
                    <ArrowUpRight className="ledger-arrow h-4 w-4 justify-self-end" aria-hidden />
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
