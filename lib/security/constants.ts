export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 2000,
} as const;

/** Hidden field — bots often fill this; humans never see it. */
export const HONEYPOT_FIELD = "website";

export const CONTACT_RATE_LIMIT = {
  limit: 5,
  windowMs: 15 * 60 * 1000,
} as const;

export const GITHUB_API_RATE_LIMIT = {
  limit: 30,
  windowMs: 60 * 1000,
} as const;
