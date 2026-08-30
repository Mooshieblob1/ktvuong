<script lang="ts">
	import { scrollToId } from '$lib/scroll';

	const links = [
		{ id: 'about', ix: '00', label: 'Overview' },
		{ id: 'work', ix: '01', label: 'Selected tools' },
		{ id: 'repos', ix: '02', label: 'Repositories' },
		{ id: 'skills', ix: '03', label: 'Stack' },
		{ id: 'contact', ix: '04', label: 'Contact' }
	];

	let progress = $state(0);
	let active = $state('about');
	let barH = $state(0);

	/* Publish the bar's height so the mobile layout can clear it. In rail mode
	   the CSS overrides the offset, so this value is simply unused. */
	$effect(() => {
		document.documentElement.style.setProperty('--bar-h', `${barH}px`);
	});

	$effect(() => {
		const onScroll = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	/* Which section is under the reader, for the rail tick and the readout. */
	$effect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = e.target.id;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const l of links) {
			const el = document.getElementById(l.id);
			if (el) io.observe(el);
		}
		return () => io.disconnect();
	});

	const activeLabel = $derived(links.find((l) => l.id === active)?.label ?? '');
	const pct = $derived(Math.round(progress * 100));

	function go(id: string) {
		active = id;
		scrollToId(id);
	}
</script>

<nav class="rail" bind:clientHeight={barH} aria-label="Primary">
	<div class="top">
		<button class="mark" onclick={() => go('about')} aria-label="Back to top">
			<span class="tile">KV</span>
			<span class="who">
				<b>Kent Vuong</b>
				<i>creative AI tools</i>
			</span>
		</button>

		<div class="quick">
			<button
				class="cmd"
				onclick={() => window.dispatchEvent(new CustomEvent('kv:rofi'))}
				aria-label="Open command palette"
			>
				<span class="key">⌘K</span>
				<span class="cmd-label">Search</span>
			</button>
			<a
				class="ext"
				href="https://github.com/Mooshieblob1"
				target="_blank"
				rel="noopener"
				aria-label="GitHub"
			>
				<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
					><path
						d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
					/></svg
				>
			</a>
		</div>
	</div>

	<ol class="nav">
		{#each links as l (l.id)}
			<li>
				<button class:on={active === l.id} onclick={() => go(l.id)}>
					<span class="ix">{l.ix}</span>
					<span class="lb">{l.label}</span>
				</button>
			</li>
		{/each}
	</ol>

	<div class="readout" aria-hidden="true">
		<div class="gauge">
			<span class="fill" style="transform: scaleY({progress})"></span>
		</div>
		<dl class="fields tnum">
			<div>
				<dt>pos</dt>
				<dd>{String(pct).padStart(3, '0')}%</dd>
			</div>
			<div>
				<dt>sec</dt>
				<dd class="wide">{activeLabel}</dd>
			</div>
		</dl>
	</div>
</nav>

<style>
	/* ---------------------------------------------------------------------
	   Rail mode (>=1080px): fixed instrument chrome down the left edge.
	   Bar mode (below): two compact rows across the top.
	   --------------------------------------------------------------------- */
	.rail {
		position: fixed;
		z-index: 50;
		inset: 0 0 auto 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px 14px 12px;
		background: color-mix(in srgb, var(--surface-950) 78%, transparent);
		backdrop-filter: blur(18px) saturate(160%);
		-webkit-backdrop-filter: blur(18px) saturate(160%);
		border-bottom: 1px solid var(--line);
		font-family: var(--font-mono);
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.mark {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		text-align: left;
		color: inherit;
		min-width: 0;
	}
	.tile {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		flex: none;
		border-radius: var(--radius-sm);
		background: var(--accent-500);
		color: var(--accent-foreground);
		font-weight: 700;
		font-size: 13px;
		letter-spacing: -0.04em;
	}
	.who {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.who b {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-strong);
		white-space: nowrap;
	}
	.who i {
		font-style: normal;
		font-size: var(--text-10);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-subtle);
		white-space: nowrap;
	}

	.quick {
		display: flex;
		align-items: center;
		gap: 7px;
		flex: none;
	}
	.cmd {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		height: 30px;
		padding: 0 10px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--line);
		background: rgba(255, 255, 255, 0.03);
		color: var(--text-muted);
		font: inherit;
		font-size: var(--text-xs);
		cursor: pointer;
		transition:
			color var(--dur-fast),
			border-color var(--dur-fast);
	}
	.cmd:hover {
		color: var(--text-strong);
		border-color: var(--line-strong);
	}
	.key {
		font-size: 10px;
		letter-spacing: 0.06em;
		color: var(--text-subtle);
	}
	.ext {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--line);
		background: rgba(255, 255, 255, 0.03);
		color: var(--text-muted);
		transition:
			color var(--dur-fast),
			border-color var(--dur-fast);
	}
	.ext:hover {
		color: var(--accent-500);
		border-color: color-mix(in srgb, var(--accent-500) 45%, transparent);
	}

	/* Numbered section list. In bar mode it scrolls sideways as one strip. */
	.nav {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 4px;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.nav::-webkit-scrollbar {
		display: none;
	}
	.nav button {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 6px 10px;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		background: none;
		color: var(--text-subtle);
		font: inherit;
		font-size: var(--text-xs);
		white-space: nowrap;
		cursor: pointer;
		transition:
			color var(--dur-fast),
			background var(--dur-fast),
			border-color var(--dur-fast);
	}
	.nav button:hover {
		color: var(--text);
		background: rgba(255, 255, 255, 0.05);
	}
	.nav button.on {
		color: var(--text-strong);
		border-color: var(--line);
		background: rgba(255, 255, 255, 0.06);
	}
	.ix {
		font-size: 10px;
		color: var(--text-disabled);
		font-variant-numeric: tabular-nums;
	}
	.nav button.on .ix {
		color: var(--accent-500);
	}

	.readout {
		display: none;
	}

	@media (min-width: 1080px) {
		.rail {
			inset: 0 auto 0 0;
			width: var(--rail-w);
			gap: 22px;
			padding: 18px 16px 16px;
			border-bottom: none;
			border-right: 1px solid var(--line);
		}
		.top {
			flex-direction: column;
			align-items: stretch;
			gap: 14px;
		}
		.quick {
			display: grid;
			grid-template-columns: 1fr auto;
			gap: 6px;
		}
		.cmd {
			justify-content: space-between;
		}

		.nav {
			flex-direction: column;
			gap: 1px;
			overflow: visible;
			margin-top: 2px;
			border-top: 1px solid var(--line);
			border-bottom: 1px solid var(--line);
			padding: 8px 0;
		}
		.nav button {
			width: 100%;
			justify-content: flex-start;
			gap: 10px;
			border-radius: 0;
			border: none;
			border-left: 2px solid transparent;
			padding: 7px 10px;
		}
		.nav button:hover {
			border-left-color: var(--line-strong);
		}
		.nav button.on {
			background: rgba(255, 255, 255, 0.05);
			border-left-color: var(--accent-500);
		}

		/* Position gauge and live section readout: the rail's instrument face. */
		.readout {
			display: flex;
			gap: 11px;
			margin-top: auto;
			align-items: stretch;
		}
		.gauge {
			position: relative;
			width: 3px;
			flex: none;
			border-radius: 2px;
			background: var(--line);
			overflow: hidden;
		}
		.fill {
			position: absolute;
			inset: 0;
			background: var(--accent-500);
			transform-origin: top;
			will-change: transform;
		}
		.fields {
			display: flex;
			flex-direction: column;
			gap: 9px;
			margin: 0;
			min-width: 0;
		}
		.fields div {
			display: flex;
			flex-direction: column;
			gap: 1px;
			min-width: 0;
		}
		.fields dt {
			font-size: 9px;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--text-disabled);
		}
		.fields dd {
			margin: 0;
			font-size: var(--text-xs);
			color: var(--text-muted);
		}
		.fields dd.wide {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
