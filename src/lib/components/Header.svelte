<script lang="ts">
	import { scrollToId } from '$lib/scroll';

	const links = [
		{ id: 'about', label: 'About' },
		{ id: 'work', label: 'Work' },
		{ id: 'repos', label: 'Repositories' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' }
	];

	let progress = $state(0);

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
</script>

<nav class="glass-nav">
	<div class="brand">
		<span class="mono-tile">KV</span>
		<span class="name">Kent Vuong</span>
		<span class="ver">/ creative AI tools</span>
	</div>
	<div class="links">
		{#each links as l, i (l.id)}
			<button onclick={() => scrollToId(l.id)}>
				<span class="idx">0{i + 1}</span>{l.label}
			</button>
		{/each}
		<button
			class="rofi-btn"
			onclick={() => window.dispatchEvent(new CustomEvent('kv:rofi'))}
			aria-label="Open command palette"
			title="Ctrl+K"
		>
			<span class="idx">⌘</span>Search
		</button>
		<a
			class="gh"
			href="https://github.com/Mooshieblob1"
			target="_blank"
			rel="noopener"
			aria-label="GitHub"
		>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
				><path
					d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
				/></svg
			>
		</a>
	</div>
	<!-- Scroll progress beam along the bottom edge of the pill. -->
	<div class="beam" aria-hidden="true">
		<div class="fill" style="transform: scaleX({progress})"></div>
	</div>
</nav>

<style>
	/* Layout lives in the shared .glass-nav utility (app.css). */
	.brand {
		display: flex;
		align-items: center;
		gap: 11px;
	}
	.mono-tile {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: var(--radius-md);
		background: var(--accent-500);
		color: var(--accent-foreground);
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 15px;
		letter-spacing: -0.04em;
		box-shadow: var(--shadow-accent);
	}
	.name {
		font-weight: 700;
		font-size: var(--text-base);
		color: var(--text-strong);
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.ver {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		color: var(--text-subtle);
		white-space: nowrap;
	}
	.links {
		display: flex;
		align-items: center;
		gap: clamp(2px, 0.8vw, 10px);
		flex-wrap: wrap;
	}
	.links button {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-muted);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		padding: 6px 12px;
		border-radius: var(--radius-full);
		transition:
			color var(--dur-fast),
			background var(--dur-fast),
			box-shadow var(--dur-fast);
	}
	.links button:hover {
		color: var(--text-strong);
		background: rgba(255, 255, 255, 0.07);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}
	.idx {
		font-family: var(--font-mono);
		font-size: 9px;
		color: var(--accent-500);
		letter-spacing: 0.08em;
	}
	.rofi-btn {
		border: 1px solid color-mix(in srgb, #fff 10%, transparent) !important;
		background: rgba(255, 255, 255, 0.04) !important;
	}
	.rofi-btn .idx {
		font-size: 11px;
	}
	.gh {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		margin-left: 4px;
		border-radius: var(--radius-md);
		border: 1px solid color-mix(in srgb, #fff 10%, transparent);
		color: var(--text-muted);
		background: rgba(255, 255, 255, 0.04);
		transition:
			color var(--dur-fast),
			border-color var(--dur-fast);
	}
	.gh:hover {
		color: var(--accent-500);
		border-color: color-mix(in srgb, var(--accent-500) 45%, transparent);
	}
	.beam {
		position: absolute;
		left: 16px;
		right: 16px;
		bottom: 3px;
		height: 2px;
		border-radius: 2px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.06);
		pointer-events: none;
	}
	.fill {
		height: 100%;
		background: linear-gradient(90deg, var(--accent-600), var(--accent-500), var(--accent-300));
		box-shadow: 0 0 10px color-mix(in srgb, var(--accent-500) 60%, transparent);
		transform-origin: left;
		will-change: transform;
	}
	@media (max-width: 860px) {
		.ver,
		.idx {
			display: none;
		}
	}
</style>
