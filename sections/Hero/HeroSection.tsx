"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CvButtons } from "@/components/ui/CvButtons";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { useI18n } from "@/lib/i18n/I18nProvider";

const techBadges = ["C#", ".NET", "TypeScript", "React", "Next.js", "Python"] as const;

export function HeroSection() {
  const { t } = useI18n();

  const cards = [
    { k: t.hero.focus, v: t.hero.focusValue },
    { k: t.hero.strength, v: t.hero.strengthValue },
    { k: t.hero.style, v: t.hero.styleValue },
    { k: t.hero.stack, v: t.hero.stackValue },
  ];

  return (
    <section className="relative overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-glass-subtle blur-3xl" />
        <div className="absolute -left-24 top-24 h-[420px] w-[420px] rounded-full bg-[rgba(59,130,246,0.14)] blur-3xl dark:bg-[rgba(59,130,246,0.14)]" />
        <div className="absolute -right-24 top-20 h-[460px] w-[460px] rounded-full bg-[rgba(124,58,237,0.12)] blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4">
                <ProfileAvatar
                  size={80}
                  priority
                  className="hidden h-20 w-20 shrink-0 border border-glass shadow-glow sm:block"
                />
                <div className="inline-flex items-center gap-2 rounded-full border-glass bg-glass px-4 py-2 text-xs text-muted">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  {t.profile.location} · {t.hero.badge}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tightish text-foreground sm:text-6xl lg:text-7xl">
                {t.profile.name}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 text-pretty text-xl text-muted sm:text-2xl">
                <span className="text-foreground">{t.profile.role}</span>
                <span className="text-faint"> · </span>
                {t.profile.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button href="#projects" variant="primary" size="lg">
                  {t.hero.viewProjects} <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
                <CvButtons size="lg" showIcon />
                <Button href="#contact" variant="ghost" size="lg">
                  <Mail className="h-4 w-4" aria-hidden />
                  {t.hero.contactMe}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-2">
                {techBadges.map((badge, idx) => (
                  <motion.span
                    key={badge}
                    className="inline-flex items-center rounded-full border-glass bg-glass-subtle px-3 py-1 text-xs text-muted"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + idx * 0.03, duration: 0.45 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="panel relative rounded-3xl p-6 shadow-glow">
                <div className="relative">
                  <div className="text-xs font-medium tracking-[0.2em] text-faint">{t.hero.productThinking}</div>
                  <div className="mt-3 text-pretty text-sm text-muted">{t.hero.productText}</div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {cards.map((x) => (
                      <div key={x.k} className="rounded-2xl border-glass bg-glass-subtle p-3">
                        <div className="text-xs text-faint">{x.k}</div>
                        <div className="mt-1 text-sm font-medium text-foreground">{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 flex justify-center pb-10">
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full border-glass bg-glass-subtle px-4 py-2 text-xs text-muted hover:bg-glass-hover"
          >
            <span>{t.common.scroll}</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
