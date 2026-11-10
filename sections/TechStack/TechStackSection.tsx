"use client";

import { Braces, Database, Network } from "lucide-react";

import { skills, type Skill } from "@/data/skills";
import { useI18n } from "@/lib/i18n/I18nProvider";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const groups = ["frontend", "backend", "database", "tools"] as const;

const fallbackIcons = { code: Braces, database: Database, api: Network } as const;

function SkillIcon({ skill }: { skill: Skill }) {
  if (skill.icon) {
    return (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden>
        <path d={skill.icon.path} />
      </svg>
    );
  }
  const Icon = fallbackIcons[skill.fallback ?? "code"];
  return <Icon size={18} aria-hidden />;
}

export function TechStackSection() {
  const { t } = useI18n();

  return (
    <section id="stack" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow={t.tech.eyebrow}
            file="stack.json"
            title={t.tech.title}
            description={t.tech.description}
          />
        </Reveal>

        <div className="stack-grid">
          {groups.map((group, idx) => (
            <Reveal key={group} delay={0.04 + idx * 0.04} className="stack-col">
              <h3 className="flex items-baseline gap-3 pb-3">
                <span className="ledger-index">0{idx + 1}</span>
                <span className="mono-label !text-[hsl(var(--text))]">{t.tech.tabs[group]}</span>
              </h3>
              <ul>
                {skills[group].map((skill: Skill) => (
                  <li key={skill.name} className="stack-item">
                    <SkillIcon skill={skill} />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
