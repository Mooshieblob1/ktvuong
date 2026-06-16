<script lang="ts">
	let {
		status = 'online',
		label = '',
		pulse = false,
		size = 8
	}: {
		status?: 'online' | 'offline' | 'busy' | 'idle';
		label?: string;
		pulse?: boolean;
		size?: number;
	} = $props();

	const colors = {
		online: 'var(--success)',
		offline: 'var(--danger-text)',
		busy: 'var(--warning-text)',
		idle: 'var(--neutral-500)'
	};
	const color = $derived(colors[status] ?? colors.idle);
</script>

<span class="wrap">
	<span class="box" style="width:{size}px;height:{size}px;">
		{#if pulse}<span class="ping" style="background:{color}"></span>{/if}
		<span class="dot" style="width:{size}px;height:{size}px;background:{color}"></span>
	</span>
	{#if label}<span class="label">{label}</span>{/if}
</span>

<style>
	.wrap {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.box {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
	}
	.dot {
		border-radius: var(--radius-full);
	}
	.ping {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-full);
		opacity: 0.5;
		animation: mb-status-ping 1.6s var(--ease-out) infinite;
	}
	.label {
		font-size: var(--text-xs);
		color: var(--text-muted);
	}
</style>
