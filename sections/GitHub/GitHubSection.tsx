"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";

import { profile } from "@/data/profile";
import type { GitHubStats } from "@/lib/github";
import { useI18n } from "@/lib/i18n/I18nProvider";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

function SkeletonRow() {
  return (
    <li className="ledger-row repo-row" aria-hidden>
      <span className="skeleton-line hidden w-6 md:block" />
      <span className="grid gap-2">
        <span className="skeleton-line w-40" />
        <span className="skeleton-line w-64 max-w-full opacity-60" />
      </span>
      <span className="skeleton-line hidden w-16 md:block" />
      <span className="skeleton-line hidden w-8 md:block" />
      <span className="skeleton-line hidden w-20 md:block" />
      <span />
    </li>
  );
}

export function GitHubSection() {
  const { t } = useI18n();
  const [data, setData] = useState<GitHubStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/github");
        const json = (await res.json()) as GitHubStats | { error: string };
        if (!alive) return;
        if (!res.ok || "error" in json) setFailed(true);
        else setData(json);
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const formatDate = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(t.meta.htmlLang, { month: "short", year: "numeric" });
    return (iso: string) => fmt.format(new Date(iso));
  }, [t.meta.htmlLang]);

  const profileUrl = data?.profileUrl ?? profile.links.github;

  return (
    <section id="github" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            index="06"
            eyebrow={t.github.eyebrow}
            file="github.json"
            title={t.github.title}
            description={t.github.description}
          />
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted">
          <span aria-live="polite">
            {data ? (
              <>
                <span className="text-foreground">{data.repoCount}</span> {t.github.repositories}
                <span className="mx-3 text-faint">/</span>
                <span className="text-foreground">{data.stars}</span> {t.github.stars}
              </>
            ) : null}
          </span>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-[hsl(var(--accent))]"
          >
            {t.github.viewProfile}
            <ArrowUpRight className="ledger-arrow h-4 w-4 !text-current" aria-hidden />
          </a>
        </div>

        {failed ? (
          <div className="ledger py-8">
            <div className="font-mono text-xs text-[hsl(var(--accent))]">{t.github.errorTitle}</div>
            <p className="mt-2 text-sm text-muted">{t.github.errorHint}</p>
          </div>
        ) : (
          <ul className="ledger !mt-4" aria-busy={!data}>
            {data
              ? data.repos.map((repo, idx) => (
                  <li key={repo.name}>
                    <a href={repo.url} target="_blank" rel="noreferrer" className="ledger-row repo-row">
                      <span className="ledger-index hidden md:block">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">
                        <span className="ledger-title block font-mono text-sm text-foreground">{repo.name}</span>
                        <span className="mt-1 block text-sm text-muted">
                          {repo.description ?? t.github.noDescription}
                        </span>
                        {/* Compact meta line on small screens; desktop shows it in columns. */}
                        <span className="ledger-meta mt-2 flex flex-wrap gap-x-4 gap-y-1 md:hidden">
                          {repo.language ? (
                            <span>
                              <span className="lang-dot" />
                              {repo.language}
                            </span>
                          ) : null}
                          <span>★ {repo.stars}</span>
                          <span>
                            {t.github.updated} {formatDate(repo.pushedAt)}
                          </span>
                        </span>
                      </span>
                      <span className="ledger-meta hidden md:block">
                        {repo.language ? (
                          <>
                            <span className="lang-dot" />
                            {repo.language}
                          </>
                        ) : (
                          "—"
                        )}
                      </span>
                      <span className="ledger-meta hidden items-center gap-1.5 md:flex">
                        <Star className="h-3.5 w-3.5" aria-hidden />
                        <span className="sr-only">{t.github.stars}:</span>
                        {repo.stars}
                      </span>
                      <span className="ledger-meta hidden md:block">
                        <span className="sr-only">{t.github.updated}: </span>
                        {formatDate(repo.pushedAt)}
                      </span>
                      <ArrowUpRight className="ledger-arrow h-4 w-4 justify-self-end" aria-hidden />
                    </a>
                  </li>
                ))
              : Array.from({ length: 4 }, (_, i) => <SkeletonRow key={i} />)}
          </ul>
        )}
      </Container>
    </section>
  );
}
