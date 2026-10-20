"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function AboutSection() {
  const { t } = useI18n();
  return (
    <section id="about" className="studio-about py-[var(--space-section-y)]">
      <Container>
        <div className="section-register"><span>01 / {t.about.eyebrow}</span><span>README.md</span></div>
        <div className="about-editorial">
          <Reveal><div className="about-portrait"><ProfileAvatar size={160} className="h-40 w-40" /><span className="portrait-corner" aria-hidden="true">↗</span></div><div className="about-signature">Emir Köroğlu</div><p className="font-mono text-xs text-muted">C# / .NET / React</p><a href="#contact" className="about-contact">{t.hero.contactMe}<ArrowUpRight size={16} aria-hidden /></a></Reveal>
          <Reveal delay={0.06}>
            <h2 className="editorial-heading">{t.about.title}</h2>
            <div className="about-prose">{t.about.paragraphs.map(p => <p key={p.slice(0,40)}>{p}</p>)}</div>
            <div className="about-principles">{t.about.highlights.map((item, idx) => <div key={item}><span>0{idx + 1}</span>{item}</div>)}</div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}