<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchActiveRepos, type Repo } from '$lib/data/github';
	import { featuredFullNames } from '$lib/data/projects';
	import SegmentedControl from './ui/SegmentedControl.svelte';
	import StatusDot from './ui/StatusDot.svelte';

	const GH_USER = 'Mooshieblob1';
	const INITIAL = 9;

	let repos = $state<Repo[] | null>(null);
	let error = $state(false);
	let sort = $state<'recent' | 'stars'>('recent');
	let expanded = $state(false);

	const loading = $derived(repos === null && !error);
	const sorted = $derived(
		repos
			? [...repos].sort((a, b) =>
					sort === 'stars'
						? b.stars - a.stars || +new Date(b.pushed) - +new Date(a.pushed)
						: +new Date(b.pushed) - +new Date(a.pushed)
				)
			: []
	);
	const visible = $derived(expanded ? sorted : sorted.slice(0, INITIAL));
	const hasMore = $derived(sorted.length > INITIAL && !expanded);
	const noRepos = $derived(repos !== null && repos.length === 0 && !error);

	onMount(async () => {
		try {
			repos = await fetchActiveRepos(GH_USER, featuredFullNames);
		} catch {
			error = true;
		}
	});
</script>

<section id="repos" class="repos">
	<header>
		<div class="head-left">
			<div class="eyebrow"><span class="rule"></span><span>Live from GitHub</span></div>
			<h2>What I'm working on</h2>
			<div class="sub">
				<StatusDot status="online" pulse />
				<span>Recent work &amp; open-source contributions, pulled live from GitHub</span>
			</div>
		</div>
		<div class="sortbar">
			<span class="sortlabel">Sort</span>
			<SegmentedControl
				options={['Recent', 'Stars']}
				value={sort === 'stars' ? 'Stars' : 'Recent'}
				onChange={(v) => (sort = v.toLowerCase().includes('star') ? 'stars' : 'recent')}
			/>
		</div>
	</header>

	{#if loading}
		<div class="grid">
			{#each [0, 1, 2, 3, 4, 5] as i (i)}
				<div class="skel"></div>
			{/each}
		</div>
	{:else if error}
		<div class="notice">
			Couldn't reach the GitHub API right now.
			<a href="https://github.com/{GH_USER}" target="_blank" rel="noopener"
				>View the profile directly →</a
			>
		</div>
	{:else if noRepos}
		<div class="notice">
			Nothing to show right now — see the featured work above, or
			<a href="https://github.com/{GH_USER}" target="_blank" rel="noopener"
				>browse everything on GitHub →</a
			>
		</div>
	{:else}
		<div class="grid">
			{#each visible as repo (repo.url)}
				<a class="repo" href={repo.url} target="_blank" rel="noopener">
					<div class="top">
						<span class="title">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--accent-500)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M3 5a2 2 0 0 1 2-2h11l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path
									d="M7 8h6M7 12h10M7 16h10"
								/></svg
							>
							<span class="name">{repo.displayName}</span>
						</span>
						<span class="stars">
							<svg
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path
									d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z"
								/></svg
							>
							{repo.stars}
						</span>
					</div>
					<p class="desc">{repo.description}</p>
					<div class="meta">
						{#if repo.language}
							<span class="lang"
								><span class="ldot" style="background:{repo.langColor}"></span>{repo.language}</span
							>
						{/if}
						<span class="when">
							<svg
								width="11"
								height="11"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg
							>
							{repo.rel}
						</span>
						{#if repo.external}
							<span class="contrib">
								<svg
									width="11"
									height="11"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle
										cx="18"
										cy="9"
										r="2.5"
									/><path d="M6 8.5v7M8.5 6.5l7 1.5M8.5 16.5l7-6" /></svg
								>
								contributor
							</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>
		<div class="more">
			{#if hasMore}
				<button onclick={() => (expanded = true)}>
					Show all {sorted.length} repositories
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
					>
				</button>
			{/if}
		</div>
	{/if}
</section>

<style>
	.repos {
		max-width: 1320px;
		margin: 0 auto;
		padding: clamp(40px, 7vh, 80px) clamp(20px, 5vw, 48px);
	}
	header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		flex-wrap: wrap;
		margin-bottom: clamp(24px, 4vw, 40px);
	}
	.head-left {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.rule {
		width: 22px;
		height: 2px;
		background: var(--accent-500);
		border-radius: 2px;
	}
	h2 {
		margin: 0;
		font-size: clamp(1.8rem, 3.6vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--text-strong);
	}
	.sub {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: var(--text-sm);
		color: var(--text-muted);
	}
	.sortbar {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.sortlabel {
		font-size: var(--text-xs);
		color: var(--text-subtle);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 16px;
	}
	.skel {
		height: 148px;
		border-radius: var(--radius-lg);
		background: var(--surface-900);
		border: 1px solid var(--border-700);
		animation: mb-skel 1.4s ease-in-out infinite;
	}
	.notice {
		padding: 32px;
		border-radius: var(--radius-lg);
		background: var(--surface-900);
		border: 1px solid var(--border-700);
		text-align: center;
		color: var(--text-muted);
		font-size: var(--text-sm);
	}
	.notice a {
		color: var(--accent-400);
		text-decoration: none;
	}
	.repo {
		display: flex;
		flex-direction: column;
		gap: 11px;
		padding: 18px;
		background: var(--surface-900);
		border: 1px solid var(--border-700);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition:
			transform var(--dur-base) var(--ease-spring),
			border-color var(--dur-base),
			box-shadow var(--dur-base);
	}
	.repo:hover {
		transform: translateY(-3px);
		border-color: color-mix(in srgb, var(--accent-500) 45%, var(--border-700));
		box-shadow: var(--shadow-md);
	}
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
	.title {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}
	.title svg {
		flex-shrink: 0;
	}
	.name {
		font-weight: 600;
		color: var(--text-strong);
		font-size: var(--text-sm);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.stars {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		color: var(--text-subtle);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		flex-shrink: 0;
	}
	.desc {
		margin: 0;
		flex: 1;
		color: var(--text-muted);
		font-size: var(--text-xs);
		line-height: 1.6;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.meta {
		display: flex;
		align-items: center;
		gap: 16px;
		font-family: var(--font-mono);
		font-size: var(--text-10);
		color: var(--text-subtle);
	}
	.lang {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.ldot {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		flex-shrink: 0;
		display: inline-block;
	}
	.when {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.contrib {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-left: auto;
		color: var(--accent-400);
	}
	.more {
		display: flex;
		justify-content: center;
		margin-top: 28px;
	}
	.more button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 42px;
		padding: 0 22px;
		border-radius: var(--radius-md);
		background: var(--surface-800);
		border: 1px solid var(--border-700);
		color: var(--text);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		transition:
			background var(--dur-fast),
			border-color var(--dur-fast);
	}
	.more button:hover {
		background: var(--neutral-700);
		border-color: color-mix(in srgb, var(--accent-500) 40%, var(--border-700));
	}
</style>
