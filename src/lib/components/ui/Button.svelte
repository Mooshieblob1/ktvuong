<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		type = 'button',
		href = undefined,
		children,
		...rest
	}: {
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		type?: 'button' | 'submit';
		href?: string;
		children: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

{#if href}
	<a {href} class="btn {variant} {size}" class:full={fullWidth} {...rest}>{@render children()}</a>
{:else}
	<button {type} class="btn {variant} {size}" class:full={fullWidth} {...rest}
		>{@render children()}</button
	>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-family: var(--font-sans);
		font-weight: var(--weight-semibold);
		line-height: 1;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		cursor: pointer;
		text-decoration: none;
		white-space: nowrap;
		user-select: none;
		transition:
			background var(--dur-fast) var(--ease-standard),
			transform var(--dur-fast),
			color var(--dur-fast),
			border-color var(--dur-fast);
	}
	.btn:active {
		transform: translateY(0.5px) scale(0.99);
	}
	.sm {
		height: 28px;
		padding: 0 10px;
		font-size: var(--text-xs);
	}
	.md {
		height: 34px;
		padding: 0 14px;
		font-size: var(--text-sm);
	}
	.lg {
		height: 44px;
		padding: 0 20px;
		font-size: var(--text-sm);
		border-radius: var(--radius-lg);
	}
	.full {
		width: 100%;
	}
	.primary {
		background: var(--accent-500);
		color: var(--accent-foreground);
		box-shadow: var(--shadow-accent);
	}
	.primary:hover {
		background: var(--accent-400);
	}
	.secondary {
		background: rgba(255, 255, 255, 0.06);
		color: var(--text);
		border-color: color-mix(in srgb, #fff 12%, transparent);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.09);
	}
	.secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: color-mix(in srgb, #fff 20%, transparent);
	}
	.ghost {
		background: transparent;
		color: var(--text-muted);
	}
	.ghost:hover {
		background: var(--surface-800);
		color: var(--text);
	}
	.danger {
		background: var(--danger);
		color: #fff;
	}
	.danger:hover {
		background: var(--danger-hover);
	}
</style>
