<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import { drift } from '$lib/actions/scrollfx';
	import { tilt } from '$lib/actions/tilt';
	import SectionHead from './SectionHead.svelte';

	function imgError(e: Event) {
		const img = e.currentTarget as HTMLImageElement;
		img.style.opacity = '0';
	}
</script>

<section id="work" class="work">
	<SectionHead
		index="01"
		label="selected tools"
		title="Things I've built"
		note="Apps, nodes and guides from the Mooshie workshop. Everything else is live below, straight from GitHub."
		readout="{projects.length} entries"
	/>

	<div class="bento">
		{#each projects as p, i (p.og)}
			<a
				class="cell glass-panel hud spot"
				class:wide={i === 0}
				href={p.github}
				target="_blank"
				rel="noopener"
				use:reveal={{ delay: (i % 3) * 70 }}
				use:spotlight
				use:tilt={{ max: 5 }}
				use:drift={{ max: 7, mult: 0.045 }}
			>
				<span class="hud-c"></span>
				{#if i === 0}
					<div class="media">
						<span class="initial">{p.title[0]}</span>
						<img
							src="https://opengraph.githubassets.com/ogcard1/{p.og}"
							alt="{p.title} preview"
							loading="eager"
							onerror={imgError}
						/>
					</div>
				{/if}
				<div class="body">
					<div class="tagrow">
						<span class="tag">{p.tag}</span>
						{#if p.stars}
							<span class="starbadge tnum">
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z"
									/></svg
								>
								{p.stars}
							</span>
						{/if}
					</div>
					<h3>{p.title}</h3>
					<p>{p.description}</p>
					<dl class="spec">
						<dt>stack</dt>
						<dd>{p.tech.join(' · ')}</dd>
					</dl>
				</div>
				<span class="go" aria-hidden="true">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg
					>
				</span>
			</a>
		{/each}
	</div>
</section>

<style>
	.work {
		position: relative;
		max-width: 1320px;
		margin: 0 auto;
		padding: clamp(30px, 4.5vh, 56px) clamp(20px, 5vw, 48px);
	}
	/* --- Bento grid ---------------------------------------------------------- */
	.bento {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 10px;
	}
	.cell {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))
			translate3d(0, var(--vy, 0px), 0);
		transform-style: preserve-3d;
		transition:
			border-color var(--dur-base),
			box-shadow var(--dur-base);
	}
	.cell.wide {
		grid-column: span 2;
		grid-row: span 2;
	}
	/* In the tall flagship cell, let the artwork absorb the spare height rather
	   than stretching the copy block and stranding the tech chips at the base. */
	.cell.wide .body {
		flex: 0 0 auto;
	}
	.cell:hover {
		border-color: color-mix(in srgb, #fff 18%, transparent);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 24px 60px rgba(0, 0, 0, 0.5);
	}
	.media {
		position: relative;
		flex: 1 1 auto;
		min-height: 178px;
		overflow: hidden;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, #fff 5%, var(--surface-800)),
			var(--surface-950)
		);
		border-bottom: 1px solid color-mix(in srgb, #fff 6%, transparent);
	}
	.initial {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 92px;
		font-weight: 700;
		font-family: var(--font-mono);
		color: color-mix(in srgb, #fff 12%, transparent);
		user-select: none;
	}
	.media img {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top left;
		transition: transform var(--dur-slow) var(--ease-out);
	}
	.cell:hover .media img {
		transform: scale(1.025);
	}
	.body {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 22px;
		flex: 1 1 auto;
		position: relative;
		z-index: 3;
	}
	.tagrow {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.tag {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		padding: 3px 9px;
		border-radius: var(--radius-sm);
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--line);
	}
	.starbadge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--text-muted);
		padding: 3px 9px;
		border-radius: var(--radius-sm);
		background: var(--surface-800);
		border: 1px solid var(--border-700);
	}
	h3 {
		margin: 0;
		font-size: clamp(1.15rem, 1.8vw, 1.45rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--text-strong);
	}
	.cell.wide h3 {
		font-size: clamp(1.4rem, 2.4vw, 1.9rem);
	}
	.body p {
		margin: 0;
		color: var(--text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
		flex: 1 1 auto;
	}
	/* Spec row: a hairline label/value pair, the same shape every card uses. */
	.spec {
		display: grid;
		grid-template-columns: 46px minmax(0, 1fr);
		gap: 0 12px;
		margin: auto 0 0;
		padding-top: 11px;
		border-top: 1px solid var(--line);
		font-family: var(--font-mono);
	}
	.spec dt {
		font-size: var(--text-10);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-disabled);
		line-height: 1.5;
	}
	.spec dd {
		margin: 0;
		font-size: var(--text-xs);
		line-height: 1.5;
		color: var(--text-muted);
	}
	.go {
		position: absolute;
		top: 14px;
		right: 14px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid color-mix(in srgb, #fff 12%, transparent);
		color: var(--text-muted);
		opacity: 0;
		transform: translate(-3px, 3px);
		transition:
			opacity var(--dur-base),
			transform var(--dur-base) var(--ease-spring),
			color var(--dur-base),
			border-color var(--dur-base);
		z-index: 4;
	}
	.cell:hover .go {
		opacity: 1;
		transform: translate(0, 0);
		color: var(--accent-500);
		border-color: color-mix(in srgb, var(--accent-500) 45%, transparent);
	}

	@media (max-width: 1020px) {
		.bento {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 640px) {
		.bento {
			grid-template-columns: 1fr;
		}
		.cell.wide {
			grid-column: span 1;
			grid-row: span 1;
		}
		.media {
			min-height: 200px;
		}
	}
</style>
