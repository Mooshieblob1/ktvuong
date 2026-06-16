<script lang="ts">
	let {
		label = '',
		hint = '',
		type = 'text',
		name = undefined,
		placeholder = '',
		required = false,
		...rest
	}: {
		label?: string;
		hint?: string;
		type?: string;
		name?: string;
		placeholder?: string;
		required?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<div class="field">
	{#if label}<label for={name}>{label}</label>{/if}
	<input id={name} {type} {name} {placeholder} {required} {...rest} />
	{#if hint}<span class="hint">{hint}</span>{/if}
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
	input {
		width: 100%;
		height: 38px;
		padding: 0 12px;
		background: var(--surface-800);
		color: var(--text);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		border: 1px solid var(--border-700);
		border-radius: var(--radius-md);
		outline: none;
		transition:
			border-color var(--dur-fast),
			box-shadow var(--dur-fast);
	}
	input::placeholder {
		color: var(--text-subtle);
	}
	input:focus {
		border-color: var(--focus-border);
		box-shadow: var(--focus-ring);
	}
	.hint {
		font-size: var(--text-10);
		color: var(--text-subtle);
	}
</style>
