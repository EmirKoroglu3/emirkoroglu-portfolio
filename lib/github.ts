export type GitHubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  /** ISO timestamp of the last push. */
  pushedAt: string;
};

export type GitHubStats = {
  username: string;
  profileUrl: string;
  /** Counts cover the repositories shown on the site, not hidden ones. */
  repoCount: number;
  stars: number;
  /** Own (non-fork) public repositories, most recently pushed first. */
  repos: GitHubRepo[];
};

const GH_API = "https://api.github.com";
const MAX_REPOS = 6;

/** Repositories kept off the portfolio (matched case-insensitively). */
const HIDDEN_REPOS = ["todo_assistantt"];

async function gh<T>(url: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    throw new Error(`GitHub request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const user = await gh<{ login: string; html_url: string }>(
    `${GH_API}/users/${encodeURIComponent(username)}`,
  );
  const all = await gh<ApiRepo[]>(
    `${GH_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
  );

  // Skip forks, archived repos, the `<username>/<username>` profile-README repo and hidden ones.
  const hidden = new Set([user.login, ...HIDDEN_REPOS].map((n) => n.toLowerCase()));
  const own = all.filter((r) => !r.fork && !r.archived && !hidden.has(r.name.toLowerCase()));

  return {
    username: user.login,
    profileUrl: user.html_url,
    repoCount: own.length,
    stars: own.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0),
    repos: own
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .slice(0, MAX_REPOS)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count ?? 0,
        pushedAt: r.pushed_at,
      })),
  };
}
