<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollToId } from '$lib/scroll';
	import { projects } from '$lib/data/projects';

	interface Cmd {
		label: string;
		hint: string;
		run: () => void;
	}

	let open = $state(false);
	let query = $state('');
	let sel = $state(0);
	/** Live repo entries fetched lazily the first time the palette opens. */
	let liveRepos = $state<{ label: string; hint: string; url: string }[]>([]);

	const staticCmds = $derived<Cmd[]>([
		...['about', 'work', 'repos', 'skills', 'contact'].map((id) => ({
			label: id[0].toUpperCase() + id.slice(1),
			hint: 'section',
			run: () => scrollToId(id)
		})),
		...projects.map((p) => ({
			label: p.title,
			hint: 'project',
			run: () => window.open(p.github, '_blank', 'noopener')
		})),
		{
			label: 'GitHub profile',
			hint: 'link',
			run: () => window.open('https://github.com/Mooshieblob1', '_blank', 'noopener')
		},
		{
			label: 'LinkedIn',
			hint: 'link',
			run: () => window.open('https://www.linkedin.com/in/kentvuong88/', '_blank', 'noopener')
		},
		{
			label: 'Toggle theme…',
			hint: 'system',
			run: () => {
				/* placeholder — wired when light theme exists */
			}
		}
	]);

	// Simple subsequence fuzzy score: consecutive > scattered.
	function score(q: string, s: string): number {
		if (!q) return 1;
		const lq = q.toLowerCase();
		const ls = s.toLowerCase();
		let qi = 0;
		let run = 0;
		let sc = 0;
		for (let i = 0; i < ls.length && qi < lq.length; i++) {
			if (ls[i] === lq[qi]) {
				run++;
				sc += 2 + run;
				qi++;
			} else {
				run = 0;
			}
		}
		return qi === lq.length ? sc : 0;
	}

	const results = $derived.by(() => {
		const pool = [
			...staticCmds,
			...liveRepos.map((r) => ({
				label: r.label,
				hint: r.hint,
				run: () => window.open(r.url, '_blank', 'noopener')
			}))
		];
		if (!query.trim()) return pool.slice(0, 9);
		return pool
			.map((c) => ({
				c,
				s: score(query, c.label) + (c.hint.includes(query.toLowerCase()) ? 3 : 0)
			}))
			.filter((r) => r.s > 0)
			.sort((a, b) => b.s - a.s)
			.slice(0, 9)
			.map((r) => r.c);
	});

	$effect(() => {
		if (open) sel = 0;
	});

	function exec(c: Cmd) {
		open = false;
		c.run();
	}

	function onKey(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open = !open;
			query = '';
			sel = 0;
			return;
		}
		if (!open) return;
		if (e.key === 'Escape') {
			open = false;
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			sel = Math.min(sel + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			sel = Math.max(sel - 1, 0);
		} else if (e.key === 'Enter' && results[sel]) {
			e.preventDefault();
			exec(results[sel]);
		}
	}

	onMount(() => {
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<svelte:window onkeydown={onKey} />

{#if open}
	<div
		class="scrim"
		role="presentation"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
	>
		<div class="rofi" role="dialog" aria-modal="true" aria-label="Command palette">
			<div class="promptrow">
				<span class="chev">❯</span>
				<input
					bind:value={query}
					placeholder="search sections, projects, repos…"
					spellcheck="false"
					autocomplete="off"
				/>
				<kbd>esc</kbd>
			</div>
			<ul class="list" role="listbox">
				{#each results as c, i (c.label)}
					<li>
						<button
							class="row"
							class:active={i === sel}
							onmouseenter={() => (sel = i)}
							onclick={() => exec(c)}
						>
							<span class="l">{c.label}</span>
							<span class="hint">{c.hint}</span>
						</button>
					</li>
				{:else}
					<li class="empty mono">no results — try 'repo', 'ui', or 'contact'</li>
				{/each}
			</ul>
			<div class="foot mono">
				<span>↑↓ navigate</span>
				<span>↵ run</span>
				<span>ctrl+k toggle</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 14vh 20px 0;
		background: color-mix(in srgb, #000 55%, transparent);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		animation: rofi-in 0.16s var(--ease-out);
	}
	.rofi {
		width: min(620px, 100%);
		background: color-mix(in srgb, var(--surface-900) 70%, transparent);
		backdrop-filter: blur(24px) saturate(160%);
		-webkit-backdrop-filter: blur(24px) saturate(160%);
		border: 1px solid color-mix(in srgb, #fff 12%, transparent);
		border-radius: var(--radius-lg);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 30px 80px rgba(0, 0, 0, 0.6);
		overflow: hidden;
		animation: rofi-pop 0.18s var(--ease-spring);
	}
	.promptrow {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 13px 16px;
		border-bottom: 1px solid color-mix(in srgb, #fff 7%, transparent);
	}
	.chev {
		color: var(--accent-500);
		font-family: var(--font-mono);
		font-weight: 700;
	}
	input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		color: var(--text-strong);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		letter-spacing: 0.02em;
	}
	input::placeholder {
		color: var(--text-subtle);
	}
	kbd {
		font-family: var(--font-mono);
		font-size: 9px;
		color: var(--text-subtle);
		border: 1px solid color-mix(in srgb, #fff 12%, transparent);
		border-radius: 4px;
		padding: 2px 6px;
	}
	.list {
		list-style: none;
		margin: 0;
		padding: 6px;
		max-height: 46vh;
		overflow-y: auto;
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		width: 100%;
		padding: 9px 12px;
		background: none;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		text-align: left;
		color: var(--text);
		font-size: var(--text-sm);
		transition: background var(--dur-fast);
	}
	.row.active {
		background: color-mix(in srgb, var(--accent-500) 16%, transparent);
		box-shadow: inset 2px 0 0 var(--accent-500);
	}
	.row .l {
		font-weight: 600;
	}
	.row .hint {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		color: var(--text-subtle);
	}
	.empty {
		padding: 14px;
		color: var(--text-subtle);
		font-size: var(--text-xs);
	}
	.foot {
		display: flex;
		gap: 16px;
		padding: 8px 16px;
		border-top: 1px solid color-mix(in srgb, #fff 6%, transparent);
		font-size: 10px;
		color: var(--text-subtle);
	}
	.mono {
		font-family: var(--font-mono);
	}
	@keyframes rofi-in {
		from {
			opacity: 0;
		}
	}
	@keyframes rofi-pop {
		from {
			opacity: 0;
			transform: translateY(-8px) scale(0.98);
		}
	}
</style>
