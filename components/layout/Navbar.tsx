"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CvButtons } from "@/components/ui/CvButtons";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { localePath, sectionHref } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { NavId } from "@/lib/i18n/types";
import { cn } from "@/lib/cn";

const navIds: NavId[] = [
  "about",
  "projects",
  "experience",
  "stack",
  "certifications",
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
  const { t, locale } = useI18n();
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
            <a href={localePath(locale)} className="group flex min-w-0 shrink items-center gap-2">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center font-mono md:h-9 md:w-9 text-sm text-[hsl(var(--accent))]">ek<span className="text-faint">/</span></span>
              <div className="hidden min-w-0 leading-tight sm:block lg:hidden 2xl:block">
                <div className="truncate text-sm font-semibold tracking-tightish text-foreground">
                  {t.profile.name}
                </div>
                <div className="truncate text-xs text-faint">{t.profile.role}</div>
              </div>
            </a>

            <div className="hidden min-w-0 flex-1 flex-nowrap items-center justify-start gap-0.5 overflow-x-auto px-1 lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navIds
                .filter((id) => id !== "contact")
                .map((id) => (
                  <a
                    key={id}
                    href={sectionHref(locale, id)}
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
              <Button href={sectionHref(locale, "contact")} variant="primary" size="sm">
                {t.common.contact}
              </Button>
            </div>

            <div className="flex shrink-0 flex-nowrap items-center gap-1.5 md:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-glass bg-glass-subtle text-foreground"
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
                    href={sectionHref(locale, id)}
                    className={cn(
                      "rounded-xl px-3 py-3 text-sm text-muted hover:bg-glass-subtle hover:text-foreground",
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
                <Button href={sectionHref(locale, "contact")} variant="primary" size="md" onClick={() => setOpen(false)}>
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
