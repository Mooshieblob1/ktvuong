<script lang="ts">
	import { slide } from 'svelte/transition';

	let {
		title,
		live = 'running',
		children
	}: { title: string; live?: string; children: import('svelte').Snippet } = $props();

	/** closed = "terminated", restored on bar double-click or reopen button. */
	let closed = $state(false);
	/** maximized: expands the window over the section padding. */
	let maximized = $state(false);
	/** minimized = body hidden, bar only (restore via clicking the bar). */
	let minimized = $state(false);
</script>

<div class="winroot" class:closed class:maximized role="group" aria-label="{title} window">
	<div
		class="titlebar"
		role="button"
		tabindex="0"
		ondblclick={() => (minimized = !minimized)}
		onkeydown={(e) => e.key === 'Enter' && (minimized = !minimized)}
	>
		<span class="app-glyph" aria-hidden="true">◆</span>
		<span class="title" class:min={minimized}>{title}</span>
		<span class="spacer"></span>
		<span class="live mono">{live}</span>
		<button
			class="wbtn"
			aria-label={minimized ? 'Restore window' : 'Minimize window'}
			onclick={() => (minimized = !minimized)}
		>
			{minimized ? '▴' : '▾'}
		</button>
		<button class="wbtn wmax" aria-label="Toggle maximize" onclick={() => (maximized = !maximized)}>
			{maximized ? '▣' : '▢'}
		</button>
		<button
			class="wbtn wclose"
			aria-label="Close window"
			onclick={() => {
				closed = true;
			}}
		>
			✕
		</button>
	</div>
	{#if !closed && !minimized}
		<div class="body" transition:slide={{ duration: 180 }}>
			{@render children()}
		</div>
	{:else if closed}
		<button class="reopen" onclick={() => (closed = false)}>
			<span class="mono">[rc] reopen {title}</span>
		</button>
	{/if}
</div>

<style>
	.winroot {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-lg);
	}
	.winroot.maximized {
		margin: -10px;
	}
	.titlebar {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 6px 10px;
		cursor: default;
		user-select: none;
	}
	.app-glyph {
		color: var(--accent-500);
		font-size: 10px;
	}
	.title {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.08em;
		color: var(--text-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.title.min {
		opacity: 0.55;
	}
	.spacer {
		flex: 1;
	}
	.live {
		font-size: var(--text-10);
		color: var(--text-subtle);
	}
	.reopen {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12px;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-subtle);
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.1em;
		transition: color var(--dur-fast);
	}
	.reopen:hover {
		color: var(--accent-400);
	}
</style>
