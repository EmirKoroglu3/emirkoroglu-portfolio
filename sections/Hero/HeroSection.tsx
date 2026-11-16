"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Braces, Database, Layers3 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CvButtons } from "@/components/ui/CvButtons";
import { useI18n } from "@/lib/i18n/I18nProvider";

const layers = [
  { name: "Interface", stack: "React / TypeScript", Icon: Layers3, code: "UI", detail: "React · Next.js · TypeScript" },
  { name: "Application", stack: "C# / .NET", Icon: Braces, code: "API", detail: "ASP.NET Core · REST API" },
  { name: "Persistence", stack: "SQL / PostgreSQL", Icon: Database, code: "DB", detail: "SQL Server · PostgreSQL · EF Core" },
] as const;

export function HeroSection() {
  const { t } = useI18n();
  const [active, setActive] = useState(1);
  return (
    <section className="studio-hero">
      <Container>
        <div className="studio-meta"><span>PORTFOLIO / EMİR KÖROĞLU</span><span>{t.profile.location}</span></div>
        <div className="studio-hero-grid">
          <div className="studio-intro">
            <Reveal><div className="studio-availability"><span />{t.hero.badge}</div></Reveal>
            <Reveal delay={0.04}><h1 className="studio-name">Emir{" "}<span>Köroğlu<span className="name-period" aria-hidden="true">.</span></span></h1></Reveal>
            <Reveal delay={0.08}><div className="studio-role"><span className="role-rule" />{t.profile.role}</div><p className="studio-tagline">{t.profile.tagline}</p></Reveal>
            <Reveal delay={0.12}><div className="studio-actions"><Button href="#projects" size="lg">{t.hero.viewProjects}<ArrowUpRight size={17} aria-hidden /></Button><CvButtons size="lg" showIcon /></div></Reveal>
          </div>
          <Reveal className="architecture-wrap" delay={0.12}>
            <div className="architecture-board">
              <div className="board-coordinate" aria-hidden="true">FIG. 01 — SYSTEM THINKING</div>
              <div className="architecture-orbit" aria-hidden="true"><span>EK</span></div>
              <div className="architecture-layers">
                {layers.map(({name, stack, Icon, code}, idx) => (
                  <button key={name} className={`architecture-layer layer-${idx} ${active === idx ? "is-active" : ""}`} onClick={() => setActive(idx)} aria-pressed={active === idx} type="button">
                    <span className="layer-number">0{idx + 1}</span><Icon size={22} aria-hidden /><span className="layer-content"><strong>{name}</strong><small>{stack}</small></span><span className="layer-code">{code}</span>
                  </button>
                ))}
              </div>
              <div className="board-caption" aria-live="polite"><span className="caption-marker" />{layers[active].detail}</div>
              <span className="board-cross cross-top" aria-hidden="true">+</span><span className="board-cross cross-bottom" aria-hidden="true">+</span>
            </div>
          </Reveal>
        </div>
        <div className="studio-bottom"><a href="#about"><ArrowDown size={15} aria-hidden />{t.nav.about}<span>01</span></a><div>C#<span>/</span>.NET<span>/</span>REACT<span>/</span>TYPESCRIPT</div></div>
      </Container>
    </section>
  );
}