/** Live GitHub data for the "Currently tinkering on" grid.
 *  Runs server-side (see +page.server.ts) behind a TTL cache so visitors
 *  never hit the unauthenticated API rate limit themselves. Degrades to a
 *  bundled snapshot when GitHub is unreachable. */

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

/** Commits authored by `user` on a repo (forks/upstream count). null = couldn't tell.
 *  Used sparingly now — only for external contribution repos. */
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
 * Repos worth showing as "currently tinkering on":
 *  - my own, active in the last month (featured repos excluded), and
 *  - repos I don't own but contribute to (discovered from public push events
 *    + a curated list), fetched for live metadata.
 * Owned repos are gated by recency only (no commit-gate API calls); external
 * repos keep the authored-commits gate (>=5).
 *
 * Server-side caching: results are memoized for GITHUB_CACHE_TTL_MS and a
 * bundled snapshot is used as fallback when GitHub is unreachable/rate-limited,
 * so the section never hard-fails for visitors.
 */
export async function fetchActiveRepos(user: string, featuredFullNames: string[]): Promise<Repo[]> {
	const now = Date.now();
	if (cache.data && now - cache.at < GITHUB_CACHE_TTL_MS) return cache.data;

	const fresh = await fetchActiveReposUncached(user, featuredFullNames).catch(() => null);
	if (fresh && fresh.length > 0) {
		cache = { at: now, data: fresh, stale: false };
		return fresh;
	}
	// GitHub unreachable or returned nothing useful — serve the bundled snapshot
	// (marked stale so the UI can label it) and cache it briefly to avoid hammering.
	const stale = SNAPSHOT.map((r) => ({ ...r, rel: relTime(r.pushed) }));
	if (!cache.data) cache = { at: now - GITHUB_CACHE_TTL_MS + 60_000, data: stale, stale: true };
	return cache.data ?? stale;
}

/** True when the most recent fetchActiveRepos result came from the fallback snapshot. */
export function lastFetchWasStale(): boolean {
	return cache.stale;
}

interface CacheEntry {
	at: number;
	data: Repo[] | null;
	stale: boolean;
}
/** In-process TTL cache (per server isolate). */
let cache: CacheEntry = { at: 0, data: null, stale: false };
const GITHUB_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

async function fetchActiveReposUncached(
	user: string,
	featuredFullNames: string[]
): Promise<Repo[]> {
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
		.slice(0, 12)
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
		.slice(0, 4);
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

	// 3) Quality gate: external repos by authored commits (owned repos skip this —
	//    the 31-day recency filter above already covers them).
	const candidates = [...ownedCand, ...extCand];
	const counts = await Promise.all(extCand.map((c) => commitCount(c.full, user)));
	const countFor = (c: Candidate): number | null =>
		c.external ? (counts[extCand.indexOf(c)] ?? null) : null;
	const seen = new Set<string>();
	return candidates
		.filter((c) => (c.external ? (countFor(c) ?? 0) >= 5 : true))
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

/**
 * Bundled fallback snapshot — captured 2026-08-27 from the live API.
 * Shown (labelled as cached) only when GitHub is unreachable or rate-limited,
 * so the section never renders an error state to visitors.
 */
const SNAPSHOT: Omit<Repo, 'rel'>[] = [
	{
		name: 'MooshieUI',
		owner: 'Mooshieblob1',
		external: false,
		displayName: 'MooshieUI',
		description: 'A front-end UI for ComfyUI made for beginner level users.',
		url: 'https://github.com/Mooshieblob1/MooshieUI',
		language: 'TypeScript',
		stars: 180,
		pushed: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
		langColor: '#3178c6'
	},
	{
		name: 'ComfyUI-MooshieTiledDiffusion',
		owner: 'Mooshieblob1',
		external: false,
		displayName: 'ComfyUI-MooshieTiledDiffusion',
		description:
			'MultiDiffusion and SpotDiffusion tiled diffusion for ComfyUI with Anima (COSMOS) support.',
		url: 'https://github.com/Mooshieblob1/ComfyUI-MooshieTiledDiffusion',
		language: 'Python',
		stars: 3,
		pushed: new Date(Date.now() - 4 * 86400 * 1000).toISOString(),
		langColor: '#3572A5'
	},
	{
		name: 'mooshie-anima-styles',
		owner: 'Mooshieblob1',
		external: false,
		displayName: 'mooshie-anima-styles',
		description:
			'A visual reference library of artist styles for the Anima image model — browse, compare and copy style recipes.',
		url: 'https://github.com/Mooshieblob1/mooshie-anima-styles',
		language: 'Svelte',
		stars: 9,
		pushed: new Date(Date.now() - 8 * 86400 * 1000).toISOString(),
		langColor: '#ff3e00'
	},
	{
		name: 'copy-webp',
		owner: 'Mooshieblob1',
		external: false,
		displayName: 'copy-webp',
		description: "Vencord userplugin: adds Copy Image (PNG) to Discord's right-click menu.",
		url: 'https://github.com/Mooshieblob1/copy-webp',
		language: 'TypeScript',
		stars: 0,
		pushed: new Date(Date.now() - 12 * 86400 * 1000).toISOString(),
		langColor: '#3178c6'
	},
	{
		name: 'jobfinder-rag',
		owner: 'Mooshieblob1',
		external: false,
		displayName: 'jobfinder-rag',
		description: "A plugin for Claude Code that let's you find a job grounded in live listings.",
		url: 'https://github.com/Mooshieblob1/jobfinder-rag',
		language: 'Python',
		stars: 0,
		pushed: new Date(Date.now() - 15 * 86400 * 1000).toISOString(),
		langColor: '#3572A5'
	},
	{
		name: 'wdtagger',
		owner: 'Mooshieblob1',
		external: false,
		displayName: 'wdtagger',
		description: 'WD14 tagger utilities for captioning images for training and tagging.',
		url: 'https://github.com/Mooshieblob1/wdtagger',
		language: 'Python',
		stars: 1,
		pushed: new Date(Date.now() - 18 * 86400 * 1000).toISOString(),
		langColor: '#3572A5'
	}
];
