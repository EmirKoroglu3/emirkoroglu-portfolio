import { CONTACT_LIMITS, HONEYPOT_FIELD } from "@/lib/security/constants";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function withinLimit(value: string, max: number) {
  return value.trim().length <= max;
}

export function validateContactBody(
  body: Record<string, unknown>,
):
  | { kind: "spam" }
  | { kind: "invalid"; error: "INVALID_PAYLOAD" | "INVALID_EMAIL" | "FIELD_TOO_LONG" }
  | { kind: "ok"; data: ContactPayload } {
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { kind: "spam" };
  }

  const name = body.name;
  const email = body.email;
  const subject = body.subject;
  const message = body.message;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(subject) ||
    !isNonEmptyString(message)
  ) {
    return { kind: "invalid", error: "INVALID_PAYLOAD" };
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  if (
    !withinLimit(trimmed.name, CONTACT_LIMITS.name) ||
    !withinLimit(trimmed.email, CONTACT_LIMITS.email) ||
    !withinLimit(trimmed.subject, CONTACT_LIMITS.subject) ||
    !withinLimit(trimmed.message, CONTACT_LIMITS.message)
  ) {
    return { kind: "invalid", error: "FIELD_TOO_LONG" };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed.email)) {
    return { kind: "invalid", error: "INVALID_EMAIL" };
  }

  return { kind: "ok", data: trimmed };
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
