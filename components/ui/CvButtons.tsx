"use client";

import { Download } from "lucide-react";

import { profile } from "@/data/profile";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/cn";

import { Button } from "@/components/ui/Button";

export function CvButtons({
  size = "md",
  className,
  showIcon = false,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}) {
  const { t } = useI18n();

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        href={profile.cv.en.href}
        variant="secondary"
        size={size}
        aria-label={t.common.downloadCvEn}
        target="_blank"
        rel="noreferrer"
      >
        {showIcon ? <Download className="h-4 w-4" aria-hidden /> : null}
        {t.common.cvEn}
      </Button>
      <Button
        href={profile.cv.tr.href}
        variant="secondary"
        size={size}
        aria-label={t.common.downloadCvTr}
        target="_blank"
        rel="noreferrer"
      >
        {showIcon ? <Download className="h-4 w-4" aria-hidden /> : null}
        {t.common.cvTr}
      </Button>
    </div>
  );
}
