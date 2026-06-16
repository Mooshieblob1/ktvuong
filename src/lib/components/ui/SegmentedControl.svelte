<script lang="ts">
	let {
		options = [],
		value,
		onChange
	}: { options: string[]; value: string; onChange: (v: string) => void } = $props();
</script>

<div class="seg" role="tablist">
	{#each options as opt (opt)}
		<button class="opt" class:active={opt === value} onclick={() => onChange(opt)}>{opt}</button>
	{/each}
</div>

<style>
	.seg {
		display: inline-flex;
		gap: 3px;
		padding: 3px;
		background: var(--surface-800);
		border: 1px solid var(--border-700);
		border-radius: var(--radius-md);
	}
	.opt {
		height: 24px;
		padding: 0 12px;
		border: none;
		background: transparent;
		color: var(--text-muted);
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: var(--weight-semibold);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast),
			color var(--dur-fast);
	}
	.opt.active {
		background: var(--accent-500);
		color: var(--accent-foreground);
	}
	.opt:not(.active):hover {
		color: var(--text);
	}
</style>
