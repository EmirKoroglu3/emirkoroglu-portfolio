"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Mail, Send } from "lucide-react";

import { profile } from "@/data/profile";

import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { CONTACT_LIMITS, HONEYPOT_FIELD } from "@/lib/security/constants";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const { t } = useI18n();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const social = useMemo(
    () => [
      {
        label: t.common.email,
        href: profile.links.email,
        display: profile.links.emailDisplay,
        icon: Mail,
      },
      {
        label: t.common.github,
        href: profile.links.github,
        display: "EmirKoroglu3",
        icon: GitHubIcon,
      },
      {
        label: t.common.linkedin,
        href: profile.links.linkedin,
        display: profile.links.linkedin,
        icon: ArrowUpRight,
      },
    ],
    [t],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("submitting");
    setError(null);

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        if (json.error === "EMAIL_NOT_CONFIGURED") {
          throw new Error("EMAIL_NOT_CONFIGURED");
        }
        if (json.error === "RATE_LIMITED") {
          throw new Error("RATE_LIMITED");
        }
        throw new Error(json.error ?? "SEND_FAILED");
      }
      form.reset();
      setState("success");
    } catch (err) {
      setState("error");
      if (err instanceof Error && err.message === "EMAIL_NOT_CONFIGURED") {
        setError(t.contact.errorNotConfigured);
      } else if (err instanceof Error && err.message === "RATE_LIMITED") {
        setError(t.contact.errorRateLimited);
      } else {
        setError(t.contact.errorGeneric);
      }
    }
  }

  return (
    <section id="contact" className="py-[var(--space-section-y)]">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Card className="p-6 md:p-8">
              <form className="grid gap-4" onSubmit={onSubmit}>
                <div
                  className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
                  aria-hidden="true"
                >
                  <label>
                    Website
                    <input
                      type="text"
                      name={HONEYPOT_FIELD}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-muted">
                    {t.contact.name}
                    <input
                      name="name"
                      required
                      maxLength={CONTACT_LIMITS.name}
                      className="h-11 rounded-2xl border-glass bg-glass-subtle px-4 text-foreground placeholder:text-faint focus:border-glass-strong focus:outline-none"
                      placeholder={t.contact.namePlaceholder}
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-muted">
                    {t.contact.email}
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={CONTACT_LIMITS.email}
                      className="h-11 rounded-2xl border-glass bg-glass-subtle px-4 text-foreground placeholder:text-faint focus:border-glass-strong focus:outline-none"
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm text-muted">
                  {t.contact.subject}
                  <input
                    name="subject"
                    required
                    maxLength={CONTACT_LIMITS.subject}
                    className="h-11 rounded-2xl border-glass bg-glass-subtle px-4 text-foreground placeholder:text-faint focus:border-glass-strong focus:outline-none"
                    placeholder={t.contact.subjectPlaceholder}
                  />
                </label>

                <label className="grid gap-2 text-sm text-muted">
                  {t.contact.message}
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={CONTACT_LIMITS.message}
                    className="rounded-2xl border-glass bg-glass-subtle px-4 py-3 text-foreground placeholder:text-faint focus:border-glass-strong focus:outline-none"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-muted" aria-live="polite">
                    {state === "success" ? t.common.successMessage : null}
                    {state === "error" ? error : null}
                  </div>
                  <Button type="submit" variant="primary" size="lg" aria-label={t.contact.sendAria}>
                    <Send className="h-4 w-4" aria-hidden />
                    {state === "submitting" ? t.common.sending : t.common.send}
                  </Button>
                </div>
              </form>
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="grid gap-4">
              {social.map((s) => (
                <Card key={s.label} className="p-6 hover:border-glass-strong hover:bg-glass-hover">
                  <a
                    href={s.href}
                    className="flex items-center justify-between gap-4"
                    {...(s.label !== t.common.email
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-medium tracking-[0.2em] text-faint">
                        {s.label.toUpperCase()}
                      </div>
                      <div className="mt-2 truncate text-sm text-muted">{s.display}</div>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-glass bg-glass-subtle text-muted">
                      <s.icon className="h-5 w-5" />
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
