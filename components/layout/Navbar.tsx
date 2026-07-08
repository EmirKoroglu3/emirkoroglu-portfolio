"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CvButtons } from "@/components/ui/CvButtons";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { NavId } from "@/lib/i18n/types";
import { cn } from "@/lib/cn";

const navIds: NavId[] = [
  "about",
  "stack",
  "experience",
  "certifications",
  "projects",
  "case-studies",
  "github",
  "contact",
];

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => navIds, []);
  const active = useActiveSection(ids);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <Container className="pointer-events-auto">
        <div className="panel mt-4 rounded-2xl">
          <div className="flex flex-nowrap items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-5">
            <a href="#top" className="group flex min-w-0 shrink items-center gap-2">
              <ProfileAvatar size={32} className="h-8 w-8 shrink-0 border border-glass" priority />
              <div className="hidden min-w-0 leading-tight sm:block">
                <div className="truncate text-sm font-semibold tracking-tightish text-foreground">
                  {t.profile.name}
                </div>
                <div className="truncate text-xs text-faint">{t.profile.role}</div>
              </div>
            </a>

            <div className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 overflow-x-auto lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navIds
                .filter((id) => id !== "contact")
                .map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={cn(
                      "shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-xs text-muted transition-colors hover:bg-glass-subtle hover:text-foreground xl:px-3 xl:text-sm",
                      id === "github" && "inline-flex items-center justify-center px-2.5",
                      active === id && "bg-glass-subtle text-foreground",
                    )}
                  >
                    {id === "github" ? (
                      <>
                        <GitHubIcon className="h-4 w-4" />
                        <span className="sr-only">{t.nav[id]}</span>
                      </>
                    ) : (
                      t.nav[id]
                    )}
                  </a>
                ))}
            </div>

            <div className="hidden shrink-0 flex-nowrap items-center gap-1.5 md:flex md:gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <CvButtons size="sm" className="hidden xl:flex" />
              <Button href="#contact" variant="primary" size="sm">
                {t.common.contact}
              </Button>
            </div>

            <div className="flex shrink-0 flex-nowrap items-center gap-1.5 md:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-glass bg-glass-subtle text-foreground"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? t.common.closeMenu : t.common.openMenu}
                aria-expanded={open}
                aria-controls="mobile-nav"
                type="button"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <motion.div
            id="mobile-nav"
            initial={false}
            animate={open ? "open" : "closed"}
            variants={{
              open: { height: "auto", opacity: 1 },
              closed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="px-4 pb-4">
              <div className="grid gap-1">
                {navIds.map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-glass-subtle hover:text-foreground",
                      active === id && "bg-glass-subtle text-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {t.nav[id]}
                  </a>
                ))}
              </div>
              <div className="mt-3 grid gap-2">
                <CvButtons size="md" className="grid grid-cols-2" />
                <Button href="#contact" variant="primary" size="md" onClick={() => setOpen(false)}>
                  {t.common.contact}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
