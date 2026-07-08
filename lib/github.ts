export type GitHubStats = {
  username: string;
  repoCount: number;
  followers: number;
  following: number;
  stars: number;
  topLanguages: Array<{ name: string; bytes: number }>;
};

const GH_API = "https://api.github.com";

async function gh<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    throw new Error(`GitHub request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const user = await gh<{
    public_repos: number;
    followers: number;
    following: number;
    login: string;
  }>(`${GH_API}/users/${encodeURIComponent(username)}`);

  // Limit repos to reduce rate-limit pressure; good enough for “portfolio stats”
  const repos = await gh<
    Array<{
      stargazers_count: number;
      language: string | null;
      size: number;
    }>
  >(`${GH_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`);

  let stars = 0;
  const langs = new Map<string, number>();
  for (const r of repos) {
    stars += r.stargazers_count ?? 0;
    if (r.language) langs.set(r.language, (langs.get(r.language) ?? 0) + (r.size ?? 0));
  }

  const topLanguages = [...langs.entries()]
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 5);

  return {
    username: user.login,
    repoCount: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars,
    topLanguages,
  };
}

