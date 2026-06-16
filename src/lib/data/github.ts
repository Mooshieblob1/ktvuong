/** Live GitHub data for the "What I'm working on" grid.
 *  Runs client-side (see RepoGrid.svelte) so the unauthenticated rate limit is
 *  per-visitor rather than per-server. Degrades gracefully when rate limited. */

export interface Repo {
	name: string;
	displayName: string;
	external: boolean;
	owner: string | null;
	description: string;
	url: string;
	language: string | null;
	stars: number;
	pushed: string;
	langColor: string;
	rel: string;
}

const LANG: Record<string, string> = {
	JavaScript: '#f1e05a',
	TypeScript: '#3178c6',
	Svelte: '#ff3e00',
	Rust: '#dea584',
	Python: '#3572A5',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Vue: '#41b883',
	Shell: '#89e051',
	Go: '#00ADD8',
	C: '#555555',
	'C++': '#f34b7d',
	'C#': '#178600',
	Java: '#b07219',
	Dockerfile: '#384d54',
	Nix: '#7e7eff',
	SCSS: '#c6538c',
	Astro: '#ff5a03',
	Ruby: '#701516',
	PHP: '#4F5D95',
	Lua: '#000080',
	Jupyter: '#DA5B0B',
	MDX: '#fcb32c'
};

export function relTime(iso: string): string {
	const d = new Date(iso).getTime();
	const diff = (Date.now() - d) / 1000;
	const day = 86400;
	if (diff < day) return 'today';
	if (diff < day * 2) return 'yesterday';
	if (diff < day * 30) return Math.floor(diff / day) + 'd ago';
	if (diff < day * 365) return Math.floor(diff / (day * 30)) + 'mo ago';
	return Math.floor(diff / (day * 365)) + 'y ago';
}

/** Commits authored by `user` on a repo (forks/upstream count). null = couldn't tell. */
async function commitCount(full: string, user: string): Promise<number | null> {
	try {
		const res = await fetch(
			`https://api.github.com/repos/${full}/commits?author=${user}&per_page=1`
		);
		if (!res.ok) return null;
		const arr = await res.json();
		if (!Array.isArray(arr) || arr.length === 0) return 0;
		const link = res.headers.get('Link');
		if (link) {
			const m = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
			if (m) return parseInt(m[1], 10);
		}
		return 1;
	} catch {
		return null;
	}
}

const DENY = new Set(['mooshieblob1', 'confusedcatgirl.github.io', 'snowywood']);

const CURATED_EXTERNAL = [
	'Jordan-Matchan/sparrow-site',
	'northwestintelligence/corp-docs',
	'VTRYG/GDS210.3-Alternate-Realities'
];

interface Candidate {
	full: string;
	name: string;
	description: string | null;
	url: string;
	language: string | null;
	stars: number;
	pushed: string;
	external: boolean;
	owner: string | null;
}

/** Subset of the GitHub REST repo payload that we actually read. */
interface GitHubRepo {
	full_name: string;
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	pushed_at: string;
	private: boolean;
	owner?: { login: string } | null;
}

/** Subset of the GitHub REST public-events payload. */
interface GitHubEvent {
	type: string;
	repo?: { name: string };
}

function toCandidate(r: GitHubRepo, external: boolean): Candidate {
	return {
		full: r.full_name,
		name: r.name,
		description: r.description,
		url: r.html_url,
		language: r.language,
		stars: r.stargazers_count,
		pushed: r.pushed_at,
		external,
		owner: r.owner ? r.owner.login : null
	};
}

/**
 * Repos worth showing as "currently working on":
 *  - my own, active in the last month (featured carousel repos excluded), and
 *  - repos I don't own but contribute to (discovered from public push events +
 *    a curated list), fetched for live metadata.
 * Gated by authored commits: >=3 for my own, >=5 for external ("extensively").
 */
export async function fetchActiveRepos(user: string, featuredFullNames: string[]): Promise<Repo[]> {
	const userLc = user.toLowerCase();
	const featured = new Set(featuredFullNames.map((s) => s.toLowerCase()));
	const monthAgo = Date.now() - 31 * 86400 * 1000;

	// 1) Owned repos active in the last month.
	const ownedRes = await fetch(
		`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed&direction=desc`
	);
	if (!ownedRes.ok) throw new Error('GitHub repos request failed');
	const owned: GitHubRepo[] = await ownedRes.json();
	const ownedCand: Candidate[] = owned
		.filter(
			(r) =>
				!r.private &&
				!DENY.has(r.name.toLowerCase()) &&
				!featured.has(r.full_name.toLowerCase()) &&
				new Date(r.pushed_at).getTime() >= monthAgo
		)
		.slice(0, 30)
		.map((r) => toCandidate(r, false));

	// 2) External contributions — discovered from public push events + curated.
	const discovered: string[] = [];
	try {
		const evRes = await fetch(`https://api.github.com/users/${user}/events/public?per_page=100`);
		if (evRes.ok) {
			const events: GitHubEvent[] = await evRes.json();
			for (const e of events) {
				if (
					e.type === 'PushEvent' &&
					e.repo?.name &&
					e.repo.name.toLowerCase().indexOf(userLc + '/') !== 0
				) {
					discovered.push(e.repo.name);
				}
			}
		}
	} catch {
		/* events are optional */
	}
	const externalNames = Array.from(new Set([...discovered, ...CURATED_EXTERNAL]))
		.filter((fn) => !featured.has(fn.toLowerCase()))
		.slice(0, 8);
	const extMeta = await Promise.all(
		externalNames.map(async (fn) => {
			try {
				const res = await fetch(`https://api.github.com/repos/${fn}`);
				if (!res.ok) return null;
				return toCandidate(await res.json(), true);
			} catch {
				return null;
			}
		})
	);
	const extCand = extMeta.filter((c): c is Candidate => c !== null);

	// 3) Quality gate by authored commits.
	const candidates = [...ownedCand, ...extCand];
	const counts = await Promise.all(candidates.map((c) => commitCount(c.full, user)));
	const seen = new Set<string>();
	return candidates
		.filter((c, i) => {
			const n = counts[i];
			return c.external ? n !== null && n >= 5 : n === null || n >= 3;
		})
		.filter((c) => {
			if (seen.has(c.url)) return false;
			seen.add(c.url);
			return true;
		})
		.map((c) => ({
			name: c.name,
			owner: c.owner,
			external: c.external,
			displayName: c.external && c.owner ? `${c.owner}/${c.name}` : c.name,
			description: c.description || 'No description provided.',
			url: c.url,
			language: c.language,
			stars: c.stars,
			pushed: c.pushed,
			langColor: (c.language && LANG[c.language]) || '#8b8b8b',
			rel: relTime(c.pushed)
		}));
}
