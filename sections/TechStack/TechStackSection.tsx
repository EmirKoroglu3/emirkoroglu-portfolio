"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { skills } from "@/data/skills";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/I18nProvider";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

type TabId = "frontend" | "backend" | "database" | "tools";

const tabIds: TabId[] = ["frontend", "backend", "database", "tools"];

export function TechStackSection() {
  const { t } = useI18n();
  const [tab, setTab] = useState<TabId>("frontend");
  const items = useMemo(() => skills[tab], [tab]);

  return (
    <section id="stack" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.tech.eyebrow}
            title={t.tech.title}
            description={t.tech.description}
          />
        </Reveal>

        <div className="mt-10">
          <Reveal delay={0.05}>
            <div className="panel inline-flex items-center gap-1 rounded-2xl p-1">
              {tabIds.map((id) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={cn(
                    "relative rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:text-foreground",
                    tab === id && "text-foreground",
                  )}
                  type="button"
                >
                  {tab === id ? (
                    <motion.span
                      layoutId="tab"
                      className="absolute inset-0 rounded-xl bg-glass-subtle"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{t.tech.tabs[id]}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it, idx) => (
              <Reveal key={it.name} delay={0.08 + idx * 0.03}>
                <Card className="group p-5 hover:border-glass-strong hover:bg-glass-hover">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-glass bg-glass-subtle text-muted transition-colors group-hover:text-foreground">
                      <it.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="text-sm font-semibold tracking-tightish text-foreground">{it.name}</div>
                  </div>
                  <div className="divider-gradient mt-4 h-px" />
                  <div className="mt-4 text-xs text-faint">{t.tech.cardHint}</div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
