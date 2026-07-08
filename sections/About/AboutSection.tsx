"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Building2, Layers3, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n/I18nProvider";

const statIcons = [BriefcaseBusiness, Layers3, Building2, Sparkles] as const;

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            description={t.about.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Card className="p-6 md:p-8">
              <div className="flex items-center gap-4">
                <ProfileAvatar size={72} className="h-[72px] w-[72px] border border-glass" />
                <div>
                  <div className="text-lg font-semibold tracking-tightish text-foreground">{t.profile.name}</div>
                  <div className="mt-1 text-sm text-muted">{t.profile.role}</div>
                </div>
              </div>
              <div className="mt-6 text-sm text-muted">
                {t.about.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 first:mt-0">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {t.about.stats.map((s, idx) => {
                  const Icon = statIcons[idx] ?? BriefcaseBusiness;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 + idx * 0.05, duration: 0.5 }}
                      className="rounded-2xl border-glass bg-glass-subtle p-4"
                    >
                      <div className="flex items-center gap-2 text-xs text-faint">
                        <Icon className="h-4 w-4" />
                        {s.label}
                      </div>
                      <div className="mt-2 text-lg font-semibold tracking-tightish text-foreground">
                        {s.value}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.08}>
            <Card className="p-6 md:p-8">
              <div className="text-xs font-medium tracking-[0.2em] text-faint">{t.about.positioning}</div>
              <div className="mt-4 text-pretty text-sm text-muted">{t.about.positioningText}</div>
              <div className="mt-6 space-y-3">
                {t.about.highlights.map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border-glass bg-glass-subtle px-4 py-3 text-sm text-muted"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
