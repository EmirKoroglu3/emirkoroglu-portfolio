"use client";

import { ArrowUp } from "lucide-react";

import { profile } from "@/data/profile";

import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { GmailIcon } from "@/components/icons/GmailIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Container } from "@/components/ui/Container";
import { sectionHref } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { NavId } from "@/lib/i18n/types";

const navIds: NavId[] = ["about", "projects", "experience", "stack", "certifications", "github", "contact"];

const iconLink =
  "inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-[hsl(var(--border))] text-muted transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]";

export function Footer() {
  const { t, locale } = useI18n();

  return (
    <footer className="border-t border-[hsl(var(--border)/.65)] pt-10 pb-8">
      <Container>
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-[clamp(28px,4vw,44px)] font-semibold leading-none tracking-[-0.06em]">
              {t.profile.name}
              <span className="text-[hsl(var(--accent))]">.</span>
            </div>
            <div className="mt-3 font-mono text-xs text-[hsl(var(--accent))]">{t.profile.role}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a className={iconLink} href={profile.links.github} target="_blank" rel="noreferrer" aria-label={t.common.github}>
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a className={iconLink} href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label={t.common.linkedin}>
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a className={iconLink} href={profile.links.email} aria-label={t.common.email}>
                <GmailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label={t.common.openMenu} className="grid grid-cols-2 gap-x-10 font-mono text-xs sm:grid-cols-3 md:grid-cols-2">
            {navIds.map((id, idx) => (
              <a
                key={id}
                href={sectionHref(locale, id)}
                className="flex min-h-11 items-center gap-3 text-muted transition-colors hover:text-foreground"
              >
                <span className="text-faint">0{idx + 1}</span>
                {t.nav[id]}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[hsl(var(--border)/.65)] pt-6 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {t.profile.name}. {t.common.rights}
          </div>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-foreground">
            {t.common.backToTop}
            <ArrowUp className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </Container>
    </footer>
  );
}
