"use client";

import { ChevronUp } from "lucide-react";

import { profile } from "@/data/profile";

import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { GmailIcon } from "@/components/icons/GmailIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { NavId } from "@/lib/i18n/types";

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

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-glass py-10">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-tightish text-foreground">{t.profile.name}</div>
            <div className="mt-1 text-sm text-faint">{t.profile.role}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-glass bg-glass-subtle text-muted hover:bg-glass-hover hover:text-foreground"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label={t.common.github}
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-glass bg-glass-subtle text-muted hover:bg-glass-hover hover:text-foreground"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={t.common.linkedin}
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-glass bg-glass-subtle text-muted hover:bg-glass-hover hover:text-foreground"
                href={profile.links.email}
                aria-label={t.common.email}
              >
                <GmailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-2 text-sm text-muted md:text-right">
            {navIds.map((id) => (
              <a key={id} href={`#${id}`} className="hover:text-foreground">
                {t.nav[id]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-glass pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {t.profile.name}. {t.common.rights}
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-xl border-glass bg-glass-subtle px-3 py-2 text-muted hover:bg-glass-hover hover:text-foreground"
          >
            {t.common.backToTop} <ChevronUp className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
