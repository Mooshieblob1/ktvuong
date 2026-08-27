<script lang="ts">
	import { scrollToId } from '$lib/scroll';
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import Button from './ui/Button.svelte';
	import StatusDot from './ui/StatusDot.svelte';
	import NodeGraph from './NodeGraph.svelte';

	const openToWork = true;

	// Accurate to what the repos demonstrate (see src/lib/data/skills.ts).
	// Rendered twice in the template so the -50% marquee loop is seamless.
	const stack = [
		'ComfyUI',
		'Stable Diffusion',
		'Flux',
		'NovelAI',
		'Svelte',
		'Tauri',
		'Rust',
		'Python',
		'Tailwind CSS'
	];

	const stats = [
		{ n: 180, suffix: '★', label: 'on MooshieUI' },
		{ n: 63, suffix: '', label: 'public repos' },
		{ n: 6, suffix: '+', label: 'AI tools shipped' }
	];

	/** Count-up when the stat scrolls into view. */
	function countUp(node: HTMLElement, params: { n: number; suffix: string }) {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			node.textContent = `${params.n}${params.suffix}`;
			return { destroy: () => {} };
		}
		const dur = 1100;
		const run = () => {
			const t0 = performance.now();
			const tick = (now: number) => {
				const p = Math.min(1, (now - t0) / dur);
				const eased = 1 - Math.pow(1 - p, 3);
				node.textContent = `${Math.round(params.n * eased)}${params.suffix}`;
				if (p < 1) requestAnimationFrame(tick);
			};
			requestAnimationFrame(tick);
		};
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						run();
						io.disconnect();
					}
				}
			},
			{ threshold: 0.5 }
		);
		io.observe(node);
		return {
			destroy: () => io.disconnect()
		};
	}
</script>

<section id="about" class="hero">
	<!-- Backdrop layers: aurora + blueprint grid + scanline + grain. -->
	<div class="backdrop" aria-hidden="true">
		<div class="aurora"></div>
		<div class="gridlines tex"></div>
		<div class="scan-sweep"></div>
		<div class="noise"></div>
	</div>

	<div class="content">
		<div class="cols">
			<div class="left">
				<div class="eyebrow" use:reveal>
					<StatusDot
						status={openToWork ? 'online' : 'idle'}
						pulse={openToWork}
						label={openToWork ? 'Available for work' : 'Currently heads-down'}
					/>
					<span class="sep"></span>
					<span class="tag">Creative AI tooling · Desktop apps · Open source</span>
				</div>

				<h1 use:reveal={{ delay: 60 }}>Kent <span class="grad">Vuong</span></h1>

				<p class="lead" use:reveal={{ delay: 120 }}>
					I build generative AI art tools that artists actually enjoy using — desktop apps, ComfyUI
					nodes and guides that hide the plumbing and put the fun back in.
				</p>

				<div class="cta" use:reveal={{ delay: 180 }}>
					<Button size="lg" onclick={() => scrollToId('work')}>Explore the tools</Button>
					<Button variant="secondary" size="lg" onclick={() => scrollToId('contact')}>
						Get in touch
					</Button>
				</div>

				<dl class="stats" use:reveal={{ delay: 240 }}>
					{#each stats as s (s.label)}
						<div class="stat">
							<dt>{s.label}</dt>
							<dd class="glow" use:countUp={{ n: s.n, suffix: s.suffix }}>0{s.suffix}</dd>
						</div>
					{/each}
				</dl>

				<div class="readout mono" use:reveal={{ delay: 300 }} aria-hidden="true">
					<span class="ro prompt"><span class="ps1">[kv@arch ~]$</span> pacman -Qi mooshieui</span>
					<span class="ro ok">installed 180★ · deps: comfyui, svelte, tauri</span>
					<span class="ro">lat -31.95° lon 115.86°</span>
					<span class="ro accent">uptime: since 2020</span>
				</div>
			</div>

			<div class="right" use:reveal={{ delay: 200 }}>
				<div class="graphwrap hud" use:spotlight>
					<span class="hud-c"></span>
					<NodeGraph />
				</div>
				<div class="graph-meta mono" aria-hidden="true">
					<span>LIVE RENDER PIPELINE — CANVAS / RAF</span>
					<span class="ok">● 60 FPS</span>
				</div>
			</div>
		</div>
	</div>

	<div class="marquee" aria-hidden="true">
		<div class="marquee-label">
			<span>Powered by</span>
			<span>the models &amp; tools I build on</span>
		</div>
		<div class="marquee-viewport">
			<ul class="marquee-track">
				{#each [...stack, ...stack] as tech, i (i)}
					<li class="chip">
						<span class="tile liquid-glass">{tech[0]}</span>
						<span class="chip-name">{tech}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.mono {
		font-family: var(--font-mono);
	}
	.ok {
		color: var(--success);
	}
	.accent {
		color: var(--accent-400);
	}

	/* --- Backdrop ---------------------------------------------------------- */
	.backdrop {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}
	.aurora {
		position: absolute;
		inset: -20%;
		background:
			radial-gradient(
				38% 44% at 26% 36%,
				color-mix(in srgb, var(--accent-500) 30%, transparent),
				transparent 72%
			),
			radial-gradient(
				34% 40% at 74% 58%,
				color-mix(in srgb, #8caaff 16%, transparent),
				transparent 70%
			),
			radial-gradient(
				46% 54% at 54% 48%,
				color-mix(in srgb, var(--accent-400) 14%, transparent),
				transparent 76%
			);
		animation: mb-aurora 24s var(--ease-standard) infinite;
		will-change: transform;
	}
	.tex {
		position: absolute;
		inset: 0;
		opacity: 0.55;
	}

	/* --- Two-column composition -------------------------------------------- */
	.content {
		position: relative;
		z-index: 10;
		flex: 1 1 auto;
		display: flex;
		align-items: center;
		padding: 128px clamp(20px, 5vw, 48px) 40px;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
	}
	.cols {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
		align-items: center;
		gap: clamp(28px, 5vw, 72px);
		width: 100%;
	}
	.left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 22px;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.sep {
		width: 1px;
		height: 14px;
		background: var(--border-700);
	}
	.tag {
		white-space: nowrap;
	}
	h1 {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: 500;
		font-size: clamp(3rem, 7.5vw, 7rem);
		line-height: 0.98;
		letter-spacing: -0.03em;
		color: var(--text-strong);
	}
	.grad {
		background-image: linear-gradient(to left, #cc9900, #ffcc00, #ffe680);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.lead {
		margin: 0;
		max-width: 44ch;
		font-size: var(--text-lg);
		line-height: 1.6;
		color: var(--text-muted);
		opacity: 0.92;
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 2px;
	}
	/* Round the shared Button pills to echo the source design. */
	.cta :global(.btn) {
		border-radius: var(--radius-full);
		padding-left: 24px;
		padding-right: 24px;
	}

	/* --- Stats + readout ----------------------------------------------------- */
	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(20px, 3vw, 40px);
		margin: 10px 0 0;
		padding: 0;
	}
	.stat {
		display: flex;
		flex-direction: column-reverse;
		gap: 2px;
	}
	.stat dt {
		font-size: var(--text-xs);
		color: var(--text-subtle);
	}
	.stat dd {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--text-strong);
	}
	.readout {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 6px;
	}
	.ro {
		display: inline-flex;
		align-items: center;
		height: 22px;
		padding: 0 10px;
		border-radius: 3px;
		font-size: 10px;
		letter-spacing: 0.08em;
		color: var(--text-subtle);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid color-mix(in srgb, #fff 7%, transparent);
	}
	.ps1 {
		color: var(--accent-400);
		margin-right: 6px;
	}

	/* --- Node graph column --------------------------------------------------- */
	.right {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.graphwrap {
		position: relative;
	}
	.graph-meta {
		display: flex;
		justify-content: space-between;
		font-size: 10px;
		letter-spacing: 0.14em;
		color: var(--text-subtle);
	}

	/* --- Tech marquee -------------------------------------------------------- */
	.marquee {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		display: flex;
		align-items: center;
		gap: 2.5rem;
		padding: 0 clamp(20px, 5vw, 48px) 40px;
	}
	.marquee-label {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		font-size: var(--text-sm);
		line-height: 1.35;
		color: var(--text-subtle);
	}
	.marquee-viewport {
		flex: 1 1 auto;
		min-width: 0;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
		mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
	}
	.marquee-track {
		display: flex;
		align-items: center;
		gap: 4rem;
		width: max-content;
		margin: 0;
		padding: 0;
		list-style: none;
		animation: mb-marquee 28s linear infinite;
		will-change: transform;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		white-space: nowrap;
	}
	.tile {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 700;
		color: var(--text-strong);
	}
	.chip-name {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text);
	}

	@media (max-width: 980px) {
		.cols {
			grid-template-columns: 1fr;
		}
		.right {
			max-width: 560px;
		}
	}
	@media (max-width: 640px) {
		.marquee {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
		.marquee-label {
			flex-direction: row;
			gap: 6px;
		}
		.marquee-viewport {
			width: 100%;
		}
	}
</style>
