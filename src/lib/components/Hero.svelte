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

				<h1 use:reveal={{ delay: 60 }}>Kent Vuong</h1>

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

				<dl class="telemetry tnum" use:reveal={{ delay: 240 }}>
					{#each stats as s (s.label)}
						<div class="field">
							<dt>{s.label}</dt>
							<dd use:countUp={{ n: s.n, suffix: s.suffix }}>0{s.suffix}</dd>
						</div>
					{/each}
				</dl>
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
				color-mix(in srgb, var(--accent-500) 10%, transparent),
				transparent 72%
			),
			radial-gradient(
				34% 40% at 74% 58%,
				color-mix(in srgb, #8caaff 15%, transparent),
				transparent 70%
			),
			radial-gradient(46% 54% at 54% 48%, color-mix(in srgb, #fff 5%, transparent), transparent 76%);
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
		/* --nav-h is published by Header; the fallback covers the pre-hydration
		   render and the one-row desktop pill. */
		padding: calc(var(--nav-h, 56px) + 40px) clamp(20px, 5vw, 48px) 24px;
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
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 18px;
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
		min-width: 0;
	}
	h1 {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: clamp(2.5rem, 5.4vw, 4.25rem);
		line-height: 1;
		letter-spacing: -0.032em;
		color: var(--text-strong);
	}
	.lead {
		margin: 0;
		max-width: 50ch;
		font-size: var(--text-base);
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

	/* --- Telemetry strip ------------------------------------------------------
	   One hairline instrument panel: value over micro-label, fields divided by
	   rules rather than whitespace so it reads as a readout, not a stat brag. */
	.telemetry {
		display: flex;
		flex-wrap: wrap;
		margin: 4px 0 0;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: rgba(255, 255, 255, 0.02);
	}
	.field {
		display: flex;
		flex-direction: column-reverse;
		gap: 1px;
		padding: 9px 16px;
		min-width: 104px;
	}
	.field + .field {
		border-left: 1px solid var(--line);
	}
	.field dt {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-subtle);
		white-space: nowrap;
	}
	.field dd {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 600;
		line-height: 1.2;
		color: var(--text-strong);
	}

	/* --- Node graph column --------------------------------------------------- */
	.right {
		min-width: 0;
		max-width: 520px;
		justify-self: end;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
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
		gap: 2rem;
		padding: 0 clamp(20px, 5vw, 48px) 26px;
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
