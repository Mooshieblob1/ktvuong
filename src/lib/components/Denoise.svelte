<script lang="ts">
	import { onMount, tick } from 'svelte';

	let { duration = 1500 }: { duration?: number } = $props();

	let cv: HTMLCanvasElement;
	let label = $state('denoising 0%');
	let done = $state(true);
	let running = false;

	function start() {
		if (running || done) return;
		const ctx = cv?.getContext('2d');
		const parent = cv?.parentElement;
		if (!ctx || !parent) {
			done = true;
			return;
		}
		running = true;
		let W = 0;
		let H = 0;
		/* Drawn at CSS-pixel resolution and upscaled pixelated: the blocks are
		   never finer than a few CSS pixels, so a retina-sized buffer would only
		   multiply the fill work during the page's busiest second. */
		const resize = () => {
			const r = parent.getBoundingClientRect();
			W = r.width;
			H = r.height;
			cv.width = Math.max(1, Math.round(W));
			cv.height = Math.max(1, Math.round(H));
		};
		resize();
		window.addEventListener('resize', resize);
		const accent =
			getComputedStyle(document.documentElement).getPropertyValue('--accent-500').trim() ||
			'#ffcc00';
		const t0 = performance.now();
		const loop = (now: number) => {
			/* The first frame's timestamp can predate t0, which read as -1%. */
			const p = Math.max(0, Math.min(1, (now - t0) / duration));
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

	/* The canvas only exists once {#if !done} has rendered, so flip the flag
	   and wait a tick before drawing. Starting in the same tick found no
	   canvas and quietly marked the intro done before it ever played. */
	async function play() {
		if (running) return;
		done = false;
		await tick();
		start();
	}

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		play();
		window.addEventListener('kv:denoise', play);
		return () => window.removeEventListener('kv:denoise', play);
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
		image-rendering: pixelated;
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
