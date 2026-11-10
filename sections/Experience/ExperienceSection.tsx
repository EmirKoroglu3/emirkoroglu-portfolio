"use client";

import { Reveal } from "@/components/motion/Reveal";
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
            index="03"
            eyebrow={t.experience.eyebrow}
            file="experience.log"
            title={t.experience.title}
            description={t.experience.description}
          />
        </Reveal>

        <ol className="ledger">
          {t.experience.items.map((item, idx) => (
            <li key={`${item.company}-${item.role}`} className="ledger-row">
              <Reveal delay={0.04 + idx * 0.04} className="exp-row">
                <div className="font-mono">
                  <div className="ledger-index">
                    {item.start} — {item.end}
                  </div>
                  <div className="ledger-meta mt-2">{item.location}</div>
                </div>
                <div className="min-w-0">
                  <h3 className="exp-role">{item.role}</h3>
                  <div className="mt-2 font-mono text-xs text-muted">
                    {item.company}
                    {item.org ? <span className="text-faint"> / {item.org}</span> : null}
                  </div>
                  <ul className="dash-list mt-5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
