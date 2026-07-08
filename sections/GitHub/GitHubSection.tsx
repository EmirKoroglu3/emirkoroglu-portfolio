"use client";

import { useEffect, useState } from "react";
import { Star, Users, FolderGit2, AlertTriangle } from "lucide-react";

import type { GitHubStats } from "@/lib/github";
import { useI18n } from "@/lib/i18n/I18nProvider";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-5 hover:border-glass-strong hover:bg-glass-hover">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium tracking-[0.2em] text-faint">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tightish text-foreground">{value}</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-glass bg-glass-subtle text-muted">
          {icon}
        </div>
      </div>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <Card className="p-5">
      <div className="h-3 w-28 rounded bg-glass-strong" />
      <div className="mt-3 h-7 w-20 rounded bg-glass-strong" />
      <div className="mt-4 h-10 w-10 rounded-2xl bg-glass-strong" />
    </Card>
  );
}

export function GitHubSection() {
  const { t } = useI18n();
  const [data, setData] = useState<GitHubStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/github");
        const json = (await res.json()) as GitHubStats | { error: string };
        if (!alive) return;
        if (!res.ok || "error" in json) {
          setError("error" in json ? json.error : "Failed to load GitHub data");
          return;
        }
        setData(json);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load GitHub data");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="github" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.github.eyebrow}
            title={t.github.title}
            description={t.github.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {!data && !error ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : null}

          {data ? (
            <>
              <StatCard
                label={t.github.repositories}
                value={data.repoCount}
                icon={<FolderGit2 className="h-5 w-5" />}
              />
              <StatCard label={t.github.stars} value={data.stars} icon={<Star className="h-5 w-5" />} />
              <StatCard
                label={t.github.followers}
                value={data.followers}
                icon={<Users className="h-5 w-5" />}
              />
              <StatCard
                label={t.github.following}
                value={data.following}
                icon={<Users className="h-5 w-5" />}
              />
            </>
          ) : null}
        </div>

        <div className="mt-6">
          {error ? (
            <Card className="p-5">
              <div className="flex items-start gap-3 text-sm text-muted">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-faint" />
                <div>
                  <div className="font-semibold text-foreground">{t.github.errorTitle}</div>
                  <div className="mt-1 text-muted">{error}</div>
                  <div className="mt-2 text-xs text-faint">{t.github.errorHint}</div>
                </div>
              </div>
            </Card>
          ) : null}

          {data ? (
            <Card className="mt-4 p-6">
              <div className="text-xs font-medium tracking-[0.2em] text-faint">{t.github.topLanguages}</div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {t.github.languages.map((lang) => (
                  <div
                    key={lang}
                    className="rounded-2xl border-glass bg-glass-subtle px-4 py-3 text-sm text-muted"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
