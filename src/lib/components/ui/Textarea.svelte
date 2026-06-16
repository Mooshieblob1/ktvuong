<script lang="ts">
	let {
		label = '',
		name = undefined,
		rows = 5,
		placeholder = '',
		required = false,
		...rest
	}: {
		label?: string;
		name?: string;
		rows?: number;
		placeholder?: string;
		required?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<div class="field">
	{#if label}<label for={name}>{label}</label>{/if}
	<textarea id={name} {name} {rows} {placeholder} {required} {...rest}></textarea>
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	label {
		font-size: var(--text-xs);
		color: var(--text-muted);
	}
	textarea {
		width: 100%;
		padding: 10px 12px;
		background: var(--surface-800);
		color: var(--text);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
		border: 1px solid var(--border-700);
		border-radius: var(--radius-md);
		outline: none;
		resize: vertical;
		transition:
			border-color var(--dur-fast),
			box-shadow var(--dur-fast);
	}
	textarea::placeholder {
		color: var(--text-subtle);
	}
	textarea:focus {
		border-color: var(--focus-border);
		box-shadow: var(--focus-ring);
	}
</style>
