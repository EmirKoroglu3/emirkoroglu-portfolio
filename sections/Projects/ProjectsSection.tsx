"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { ProjectItem } from "@/lib/i18n/types";

function ProjectModal({
  project,
  onClose,
  labels,
}: {
  project: ProjectItem;
  onClose: () => void;
  labels: { close: string; github: string; liveDemo: string };
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="overlay-backdrop fixed inset-0 z-[60] flex items-end justify-center p-4 backdrop-blur-sm md:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className="w-full max-w-2xl overflow-hidden rounded-3xl border-glass bg-[hsl(var(--surface))] shadow-soft"
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 18, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 border-b border-glass p-5">
            <div>
              <div className="text-xl font-semibold tracking-tightish text-foreground">{project.title}</div>
              <div className="mt-1 text-sm text-muted">{project.description}</div>
            </div>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border-glass bg-glass-subtle text-foreground"
              onClick={onClose}
              aria-label={labels.close}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <div className="mt-5 grid gap-2 text-sm text-muted">
              {project.highlights.map((h) => (
                <div key={h} className="rounded-2xl border-glass bg-glass-subtle px-4 py-3">
                  {h}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {project.github ? (
                <Button href={project.github} variant="secondary" size="md" target="_blank" rel="noreferrer">
                  {labels.github} <ArrowUpRight className="h-4 w-4" />
                </Button>
              ) : null}
              {project.demo ? (
                <Button href={project.demo} variant="primary" size="md" target="_blank" rel="noreferrer">
                  {labels.liveDemo} <ArrowUpRight className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProjectsSection() {
  const { t } = useI18n();
  const [active, setActive] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            description={t.projects.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.projects.items.map((p, idx) => (
            <Reveal key={p.slug} delay={0.04 + idx * 0.02}>
              <Card className="group relative cursor-pointer overflow-hidden p-6 hover:border-glass-strong hover:bg-glass-hover">
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(800px 400px at 20% 10%, rgba(59,130,246,0.14), transparent 55%), radial-gradient(700px 420px at 80% 30%, rgba(124,58,237,0.12), transparent 50%)",
                  }}
                />
                <button
                  className="relative text-left"
                  type="button"
                  onClick={() => setActive(p)}
                  aria-label={`${t.common.openProject} ${p.title}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold tracking-tightish text-foreground">{p.title}</div>
                      <div className="mt-2 text-sm text-muted">{p.description}</div>
                    </div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border-glass bg-glass-subtle text-muted transition-colors group-hover:text-foreground">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </button>
              </Card>
            </Reveal>
          ))}
        </div>

        {active ? (
          <ProjectModal
            project={active}
            onClose={() => setActive(null)}
            labels={{
              close: t.common.closeProject,
              github: t.common.github,
              liveDemo: t.common.liveDemo,
            }}
          />
        ) : null}
      </Container>
    </section>
  );
}
