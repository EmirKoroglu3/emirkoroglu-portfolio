import { NextResponse } from "next/server";

import { fetchGitHubStats } from "@/lib/github";
import { GITHUB_API_RATE_LIMIT } from "@/lib/security/constants";
import { consumeRateLimit, getClientIp } from "@/lib/security/rate-limit";

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const rate = consumeRateLimit(`github:${ip}`, GITHUB_API_RATE_LIMIT);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "RATE_LIMITED" },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  const username = process.env.GITHUB_USERNAME || "EmirKoroglu3";

  try {
    const data = await fetchGitHubStats(username);
    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
