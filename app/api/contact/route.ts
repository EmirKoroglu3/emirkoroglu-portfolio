import { NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT_RATE_LIMIT } from "@/lib/security/constants";
import { escapeHtml, validateContactBody } from "@/lib/security/contact-validation";
import { consumeRateLimit, getClientIp } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 415 });
  }

  const ip = getClientIp(req);
  const rate = consumeRateLimit(`contact:${ip}`, CONTACT_RATE_LIMIT);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "RATE_LIMITED" },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const parsed = validateContactBody(body);

    if (parsed.kind === "spam") {
      return NextResponse.json({ ok: true });
    }

    if (parsed.kind === "invalid") {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { name, email, subject, message } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "EMAIL_NOT_CONFIGURED" }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL || "korogluemir32@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }
}
