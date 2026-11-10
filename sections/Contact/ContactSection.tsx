"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";

import { profile } from "@/data/profile";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
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
      { label: t.common.email, href: profile.links.email, display: profile.links.emailDisplay, external: false },
      { label: t.common.github, href: profile.links.github, display: "github.com/EmirKoroglu3", external: true },
      { label: t.common.linkedin, href: profile.links.linkedin, display: "in/emir-koroglu", external: true },
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
            index="07"
            eyebrow={t.contact.eyebrow}
            file="contact.ts"
            title={t.contact.title}
            description={t.contact.description}
          />
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <form className="panel grid gap-5 p-6 md:p-8" onSubmit={onSubmit}>
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                <label>
                  Website
                  <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="field">
                  <span>{t.contact.name}</span>
                  <input
                    name="name"
                    required
                    maxLength={CONTACT_LIMITS.name}
                    autoComplete="name"
                    placeholder={t.contact.namePlaceholder}
                  />
                </label>
                <label className="field">
                  <span>{t.contact.email}</span>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={CONTACT_LIMITS.email}
                    autoComplete="email"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </label>
              </div>

              <label className="field">
                <span>{t.contact.subject}</span>
                <input
                  name="subject"
                  required
                  maxLength={CONTACT_LIMITS.subject}
                  placeholder={t.contact.subjectPlaceholder}
                />
              </label>

              <label className="field">
                <span>{t.contact.message}</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={CONTACT_LIMITS.message}
                  placeholder={t.contact.messagePlaceholder}
                />
              </label>

              <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.05}>
            <ul className="border-t border-[hsl(var(--border))]">
              {social.map((s) => (
                <li key={s.label} className="ledger-row">
                  <a
                    href={s.href}
                    className="contact-link group"
                    {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="min-w-0">
                      <span className="mono-label block">{s.label}</span>
                      <span className="ledger-title mt-2 block truncate text-[15px] group-hover:text-[hsl(var(--accent))]">
                        {s.display}
                      </span>
                    </span>
                    <ArrowUpRight className="ledger-arrow h-5 w-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
