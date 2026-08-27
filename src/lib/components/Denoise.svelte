<script lang="ts">
	import { onMount } from 'svelte';

	let { duration = 1500 }: { duration?: number } = $props();

	let cv: HTMLCanvasElement;
	let label = $state('denoising 0%');
	let done = $state(true);
	let running = false;

	function start() {
		if (running || done) return;
		const ctx = cv?.getContext('2d');
		if (!ctx) {
			done = true;
			return;
		}
		running = true;
		const parent = cv.parentElement as HTMLElement;
		let W = 0;
		let H = 0;
		const resize = () => {
			const r = parent.getBoundingClientRect();
			const d = window.devicePixelRatio || 1;
			W = r.width;
			H = r.height;
			cv.width = Math.max(1, Math.round(W * d));
			cv.height = Math.max(1, Math.round(H * d));
			ctx.setTransform(d, 0, 0, d, 0, 0);
		};
		resize();
		window.addEventListener('resize', resize);
		const accent =
			getComputedStyle(document.documentElement).getPropertyValue('--accent-500').trim() ||
			'#ffcc00';
		const t0 = performance.now();
		const loop = (now: number) => {
			const p = Math.min(1, (now - t0) / duration);
			const ease = 1 - Math.pow(1 - p, 3);
			ctx.clearRect(0, 0, W, H);
			if (p < 1) {
				// Latent-diffusion style resolve: cells shrink + density decays.
				const cell = 26 - 22 * ease;
				const cols = Math.ceil(W / cell);
				const rows = Math.ceil(H / cell);
				const count = Math.floor(cols * rows * (1 - ease * 0.96) * 0.28);
				for (let k = 0; k < count; k++) {
					const x = Math.floor(Math.random() * cols) * cell;
					const y = Math.floor(Math.random() * rows) * cell;
					ctx.globalAlpha = 0.7 * (1 - ease * 0.75) * (0.3 + Math.random() * 0.7);
					ctx.fillStyle = Math.random() < 0.14 ? accent : '#ffffff';
					ctx.fillRect(x, y, cell - 1, cell - 1);
				}
				ctx.globalAlpha = 1;
				label = `denoising ${String(Math.round(p * 100)).padStart(2, '0')}%`;
				requestAnimationFrame(loop);
			} else {
				done = true;
				running = false;
				window.removeEventListener('resize', resize);
			}
		};
		requestAnimationFrame(loop);
	}

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			done = true;
			return;
		}
		done = false;
		start();
		const replay = () => {
			done = false;
			// let the {#if} re-render the canvas before starting
			requestAnimationFrame(() => start());
		};
		window.addEventListener('kv:denoise', replay);
		return () => window.removeEventListener('kv:denoise', replay);
	});
</script>

{#if !done}
	<div class="denoise" aria-hidden="true">
		<canvas bind:this={cv}></canvas>
		<span class="dl">{label}</span>
	</div>
{/if}

<style>
	.denoise {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
	}
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
	.dl {
		position: absolute;
		right: 18px;
		bottom: 110px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		color: var(--text-subtle);
	}
</style>
