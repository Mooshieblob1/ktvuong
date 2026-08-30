<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import ScrambleText from './ScrambleText.svelte';

	let {
		index,
		label,
		title,
		note,
		readout,
		aside
	}: {
		/** Two-digit section number, e.g. "01". */
		index: string;
		/** Uppercase micro-label sitting beside the index. */
		label: string;
		title: string;
		note?: string;
		/** Short live value pinned to the right of the rule, e.g. a count. */
		readout?: string;
		aside?: Snippet;
	} = $props();
</script>

<header class="sechead" use:reveal>
	<div class="stripe">
		<span class="ix tnum">{index}</span>
		<span class="label">{label}</span>
		<span class="rule"></span>
		{#if readout}<span class="readout tnum">{readout}</span>{/if}
	</div>
	<div class="body">
		<h2><ScrambleText text={title} /></h2>
		{#if note}<p class="note">{note}</p>{/if}
		{#if aside}<div class="aside">{@render aside()}</div>{/if}
	</div>
</header>

<style>
	.sechead {
		margin-bottom: clamp(20px, 3vw, 32px);
	}

	/* The stripe is the instrument label: index, name, rule, live value. */
	.stripe {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-bottom: 9px;
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
	.ix {
		color: var(--accent-500);
		font-weight: 600;
	}
	.label {
		color: var(--text-subtle);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.rule {
		flex: 1 1 auto;
		height: 1px;
		min-width: 20px;
		background: var(--line);
	}
	.readout {
		color: var(--text-muted);
		white-space: nowrap;
	}

	.body {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: end;
		gap: 10px 28px;
		border-top: 1px solid var(--line-strong);
		padding-top: 14px;
	}
	h2 {
		grid-column: 1;
		margin: 0;
		font-size: clamp(1.45rem, 2.4vw, 1.95rem);
		font-weight: 600;
		letter-spacing: -0.025em;
		line-height: 1.05;
		color: var(--text-strong);
		text-wrap: balance;
	}
	.note {
		grid-column: 1;
		margin: 0;
		max-width: 58ch;
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--text-muted);
	}
	.aside {
		grid-column: 2;
		grid-row: 1;
		justify-self: end;
	}

	@media (max-width: 720px) {
		.body {
			grid-template-columns: minmax(0, 1fr);
		}
		.aside {
			grid-column: 1;
			grid-row: auto;
			justify-self: start;
		}
	}
</style>
