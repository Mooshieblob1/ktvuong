<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		variant = 'neutral',
		children
	}: {
		variant?: 'neutral' | 'accent' | 'success' | 'danger' | 'solid';
		children: Snippet;
	} = $props();
</script>

<span class="badge {variant}">{@render children()}</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 2px 7px;
		font-family: var(--font-sans);
		font-size: var(--text-10);
		font-weight: var(--weight-semibold);
		line-height: 1.4;
		border-radius: var(--radius-sm);
		white-space: nowrap;
		border: 1px solid transparent;
	}
	.neutral {
		background: var(--surface-800);
		color: var(--text-muted);
		border-color: var(--border-700);
	}
	.accent {
		background: color-mix(in srgb, var(--accent-500) 18%, transparent);
		color: var(--accent-400);
		border-color: color-mix(in srgb, var(--accent-500) 35%, transparent);
	}
	.success {
		background: color-mix(in srgb, var(--success-strong) 20%, transparent);
		color: var(--success-text);
		border-color: color-mix(in srgb, var(--success-strong) 35%, transparent);
	}
	.danger {
		background: color-mix(in srgb, var(--danger) 22%, transparent);
		color: var(--danger-text);
		border-color: color-mix(in srgb, var(--danger) 40%, transparent);
	}
	.solid {
		background: var(--accent-500);
		color: var(--accent-foreground);
	}
</style>
