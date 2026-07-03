<script lang="ts">
	import { scrollToId } from '$lib/scroll';

	const links = [
		{ id: 'about', label: 'About' },
		{ id: 'work', label: 'Work' },
		{ id: 'repos', label: 'Repositories' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' }
	];
</script>

<nav>
	<div class="brand">
		<span class="mono-tile">KV</span>
		<span class="name">Kent Vuong</span>
	</div>
	<div class="links">
		{#each links as l (l.id)}
			<button onclick={() => scrollToId(l.id)}>{l.label}</button>
		{/each}
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
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		padding: 12px clamp(16px, 4vw, 48px);
		/* Lighter wash so the hero reads through, still legible over lower sections. */
		background: color-mix(in srgb, var(--bg) 60%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: none;
	}
	/* Gradient hairline divider, offset just below the bar. */
	nav::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			color-mix(in srgb, var(--text) 20%, transparent),
			transparent
		);
		pointer-events: none;
	}
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
	.links {
		display: flex;
		align-items: center;
		gap: clamp(4px, 1.4vw, 22px);
		flex-wrap: wrap;
	}
	.links button {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-muted);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		padding: 6px 8px;
		transition: color var(--dur-fast);
	}
	.links button:hover {
		color: var(--text-strong);
	}
	.gh {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		margin-left: 4px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-700);
		color: var(--text-muted);
		background: var(--surface-900);
		transition:
			color var(--dur-fast),
			border-color var(--dur-fast);
	}
	.gh:hover {
		color: var(--accent-500);
		border-color: color-mix(in srgb, var(--accent-500) 45%, var(--border-700));
	}
</style>
