/**
 * GitHub repo review — real evidence for milestone verdicts.
 *
 * Uses the public REST API (no auth needed for public repos; GITHUB_TOKEN
 * raises rate limits if set). Read-only by design.
 */

async function gh(path: string): Promise<any> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "babyshark-vc",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${path}`);
  return res.json();
}

export interface RepoSummary {
  repo: string;
  defaultBranch: string;
  totalCommits: number | null;
  lastCommits: CommitInfo[];
  fileTree: string[];
  languages: Record<string, number>;
}

export interface CommitInfo {
  sha: string;
  message: string;
  author: string;
  date: string;
  filesChanged: number;
  additions: number;
  deletions: number;
}

/** Parse "owner/repo" from a URL or plain string */
export function parseRepo(input: string): string {
  const m = input.match(/github\.com[/:]([\w.-]+\/[\w.-]+)/);
  return (m ? m[1] : input).replace(/\.git$/, "").replace(/\/$/, "");
}

export async function reviewRepo(repoInput: string): Promise<RepoSummary> {
  const repo = parseRepo(repoInput);
  const meta = await gh(`/repos/${repo}`);
  const branch = meta.default_branch ?? "main";

  const [commits, tree, languages] = await Promise.all([
    gh(`/repos/${repo}/commits?sha=${branch}&per_page=15`),
    gh(`/repos/${repo}/git/trees/${branch}?recursive=1`),
    gh(`/repos/${repo}/languages`),
  ]);

  // Per-commit stats need individual fetches — cap at 8 to be gentle on rate limits
  const detailed: CommitInfo[] = await Promise.all(
    commits.slice(0, 8).map(async (c: any): Promise<CommitInfo> => {
      try {
        const d = await gh(`/repos/${repo}/commits/${c.sha}`);
        return {
          sha: c.sha.slice(0, 7),
          message: c.commit.message.split("\n")[0],
          author: c.commit.author?.name ?? "unknown",
          date: c.commit.author?.date ?? "",
          filesChanged: d.files?.length ?? 0,
          additions: d.stats?.additions ?? 0,
          deletions: d.stats?.deletions ?? 0,
        };
      } catch {
        return {
          sha: c.sha.slice(0, 7),
          message: c.commit.message.split("\n")[0],
          author: c.commit.author?.name ?? "unknown",
          date: c.commit.author?.date ?? "",
          filesChanged: 0,
          additions: 0,
          deletions: 0,
        };
      }
    })
  );

  return {
    repo,
    defaultBranch: branch,
    totalCommits: null, // would need an extra API call; skip for MVP
    lastCommits: detailed,
    fileTree: (tree.tree ?? [])
      .filter((t: any) => t.type === "blob")
      .map((t: any) => t.path)
      .slice(0, 100),
    languages,
  };
}

/** Fetch one file's content (first N lines) for code-level review */
export async function fetchFile(repoInput: string, path: string, maxLines = 80): Promise<string> {
  const repo = parseRepo(repoInput);
  const meta = await gh(`/repos/${repo}`);
  const res = await fetch(
    `https://raw.githubusercontent.com/${repo}/${meta.default_branch}/${path}`
  );
  if (!res.ok) throw new Error(`fetchFile ${res.status}: ${path}`);
  const text = await res.text();
  return text.split("\n").slice(0, maxLines).join("\n");
}
