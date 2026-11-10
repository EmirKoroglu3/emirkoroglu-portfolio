"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { localePath } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function NotFound() {
  const { t, locale } = useI18n();
  return (
    <main className="flex min-h-dvh items-center">
      <Container>
        <div className="section-register">
          <span>404</span>
          <span>NOT_FOUND</span>
        </div>
        <h1 className="editorial-heading mt-10">{t.common.notFoundTitle}</h1>
        <p className="mt-4 max-w-md text-muted">{t.common.notFoundText}</p>
        <Button href={localePath(locale)} className="mt-8" size="lg">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t.common.backHome}
        </Button>
      </Container>
    </main>
  );
}
