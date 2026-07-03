<script lang="ts">
	import { scrollToId } from '$lib/scroll';
	import Button from './ui/Button.svelte';
	import StatusDot from './ui/StatusDot.svelte';

	const openToWork = true;

	// Accurate to what the repos demonstrate (see src/lib/data/skills.ts).
	// Rendered twice in the template so the -50% marquee loop is seamless.
	const stack = [
		'Svelte',
		'SvelteKit',
		'TypeScript',
		'Rust',
		'Tauri',
		'Python',
		'Docker',
		'Cloudflare',
		'Tailwind CSS'
	];
</script>

<section id="about" class="hero">
	<!-- Decorative backdrop: clips its own children so the page never scrolls sideways. -->
	<div class="backdrop" aria-hidden="true">
		<div class="aurora"></div>
		<div class="blur-shape"></div>
	</div>

	<div class="content">
		<div class="eyebrow">
			<StatusDot
				status={openToWork ? 'online' : 'idle'}
				pulse={openToWork}
				label={openToWork ? 'Available for work' : 'Currently heads-down'}
			/>
			<span class="sep"></span>
			<span class="tag">Full-stack · DevOps · AI tooling</span>
		</div>

		<h1>Kent <span class="grad">Vuong</span></h1>

		<p class="lead">
			I build fast, practical software — from desktop AI tools to web apps and the infrastructure
			under them.
		</p>

		<div class="cta">
			<Button size="lg" onclick={() => scrollToId('work')}>View my work</Button>
			<Button variant="secondary" size="lg" onclick={() => scrollToId('contact')}>
				Get in touch
			</Button>
		</div>
	</div>

	<div class="marquee" aria-hidden="true">
		<div class="marquee-label">
			<span>Built with</span>
			<span>the tools I reach for</span>
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
	}

	/* --- Backdrop ---------------------------------------------------------- */
	.backdrop {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}
	.aurora {
		position: absolute;
		inset: -20%;
		background:
			radial-gradient(
				38% 44% at 32% 34%,
				color-mix(in srgb, var(--accent-500) 26%, transparent),
				transparent 72%
			),
			radial-gradient(
				34% 40% at 70% 62%,
				color-mix(in srgb, var(--accent-600) 22%, transparent),
				transparent 70%
			),
			radial-gradient(
				46% 54% at 54% 48%,
				color-mix(in srgb, var(--accent-400) 12%, transparent),
				transparent 76%
			);
		animation: mb-aurora 24s var(--ease-standard) infinite;
		will-change: transform;
	}
	.blur-shape {
		position: absolute;
		top: 50%;
		left: 50%;
		width: min(984px, 100vw);
		height: 527px;
		transform: translate(-50%, -50%);
		background: var(--surface-950);
		opacity: 0.9;
		filter: blur(82px);
	}

	/* --- Centered content -------------------------------------------------- */
	.content {
		position: relative;
		z-index: 10;
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 20px;
		padding: 108px clamp(20px, 5vw, 48px) 32px;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
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
		max-width: 100%;
		font-family: var(--font-sans);
		font-weight: 500;
		font-size: clamp(2.75rem, 12vw, 200px);
		line-height: 1.02;
		letter-spacing: -0.024em;
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
		max-width: 42ch;
		font-size: var(--text-lg);
		line-height: 1.6;
		color: var(--text-muted);
		opacity: 0.92;
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 12px;
		margin-top: 8px;
	}
	/* Round the shared Button pills to echo the source design. */
	.cta :global(.btn) {
		border-radius: var(--radius-full);
		padding-left: 24px;
		padding-right: 24px;
	}

	/* --- Tech marquee (pinned to the bottom of the hero) ------------------- */
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
