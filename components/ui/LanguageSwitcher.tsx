"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

import { localeLabels, locales } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        className="inline-flex h-9 items-center gap-1.5 rounded-xl border-glass bg-glass-subtle px-2.5 text-sm text-muted transition-colors hover:bg-glass-hover hover:text-foreground"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.common.language}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">{localeLabels[locale]}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={t.common.language}
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[140px] overflow-hidden rounded-xl border-glass panel-strong p-1 shadow-soft"
        >
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={locale === loc}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                locale === loc
                  ? "bg-glass-strong text-foreground"
                  : "text-muted hover:bg-glass-hover hover:text-foreground",
              )}
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
            >
              <span>{localeLabels[loc]}</span>
              <span className="text-xs text-faint">{loc.toUpperCase()}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
