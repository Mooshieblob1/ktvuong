<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/data/projects';

	let active = $state(0);
	let timer: ReturnType<typeof setInterval> | null = null;
	const N = projects.length;

	function pause() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}
	function next() {
		active = (active + 1) % N;
	}
	function prev() {
		active = (active - 1 + N) % N;
	}
	function goTo(i: number) {
		active = i;
	}
	const userNext = () => {
		pause();
		next();
	};
	const userPrev = () => {
		pause();
		prev();
	};
	const userGo = (i: number) => {
		pause();
		goTo(i);
	};

	const cards = $derived(
		projects.map((p, i) => {
			let offset = i - active;
			if (offset > N / 2) offset -= N;
			if (offset < -N / 2) offset += N;
			const abs = Math.abs(offset);
			return {
				...p,
				initial: p.title[0],
				og: `https://opengraph.githubassets.com/ogcard1/${p.og}`,
				style: `transform: translateX(calc(-50% + ${offset * 58}%)) scale(${Math.max(
					0.8,
					1 - abs * 0.09
				)}) rotateY(${offset * -5}deg); opacity: ${
					abs > 2 ? 0 : abs < 0.5 ? 1 : Math.max(0, 1 - abs * 0.4)
				}; filter: ${abs < 0.5 ? 'none' : `blur(${abs * 1.4}px)`}; z-index: ${
					20 - Math.round(abs)
				}; pointer-events: ${abs < 0.5 ? 'auto' : 'none'};`
			};
		})
	);

	function imgError(e: Event) {
		(e.currentTarget as HTMLImageElement).style.opacity = '0';
	}

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!reduced) timer = setInterval(next, 7000);
		return () => pause();
	});
</script>

<section id="work" class="work">
	<header>
		<div class="head-left">
			<div class="eyebrow"><span class="rule"></span><span>Selected work</span></div>
			<h2>Things I've shipped</h2>
		</div>
		<p class="head-note">
			A handful I'm proud of. Everything else is live below, straight from GitHub.
		</p>
	</header>

	<div class="scene">
		<div class="track">
			{#each cards as card (card.title)}
				<div class="card" style={card.style}>
					<div class="inner">
						<div class="media">
							<span class="initial">{card.initial}</span>
							<img src={card.og} alt={card.title} loading="lazy" onerror={imgError} />
						</div>
						<div class="info">
							<span class="tag">{card.tag}</span>
							<h3>{card.title}</h3>
							<p>{card.description}</p>
							<div class="tech">
								{#each card.tech as t (t)}
									<span class="chip">{t}</span>
								{/each}
							</div>
							<div class="links">
								<a class="lbtn ghost" href={card.github} target="_blank" rel="noopener">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
										><path
											d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
										/></svg
									>
									Code
								</a>
								{#if card.demo}
									<a class="lbtn primary" href={card.demo} target="_blank" rel="noopener">
										Visit
										<svg
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.2"
											stroke-linecap="round"
											stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg
										>
									</a>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="controls">
			<button class="nav" aria-label="Previous" onclick={userPrev}>
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="M15 18 9 12l6-6" /></svg
				>
			</button>
			<div class="dots">
				{#each projects as p, i (p.title)}
					<button
						class="dot"
						class:active={i === active}
						aria-label="Go to project"
						onclick={() => userGo(i)}
					></button>
				{/each}
			</div>
			<button class="nav" aria-label="Next" onclick={userNext}>
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
				>
			</button>
			<span class="counter">
				<span class="cur">{String(active + 1).padStart(2, '0')}</span> / {String(N).padStart(
					2,
					'0'
				)}
			</span>
		</div>
	</div>
</section>

<style>
	.work {
		max-width: 1320px;
		margin: 0 auto;
		padding: clamp(40px, 7vh, 80px) clamp(20px, 5vw, 48px);
	}
	header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		flex-wrap: wrap;
		margin-bottom: clamp(28px, 5vw, 48px);
	}
	.head-left {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.rule {
		width: 22px;
		height: 2px;
		background: var(--accent-500);
		border-radius: 2px;
	}
	h2 {
		margin: 0;
		font-size: clamp(1.8rem, 3.6vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--text-strong);
	}
	.head-note {
		margin: 0;
		max-width: 34ch;
		color: var(--text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}
	.scene {
		position: relative;
		perspective: 1500px;
		/* Off-active cards fan out past the viewport via translateX; clip that
		   horizontal spill so the page never scrolls sideways on mobile. */
		overflow-x: clip;
	}
	.track {
		position: relative;
		height: 460px;
	}
	.card {
		position: absolute;
		top: 0;
		left: 50%;
		width: min(94%, 860px);
		height: 440px;
		will-change: transform;
		transition:
			transform 0.6s var(--ease-spring),
			opacity 0.45s var(--ease-out),
			filter 0.45s;
	}
	.inner {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
		height: 100%;
		background: var(--surface-900);
		border: 1px solid var(--border-700);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow-panel);
	}
	.media {
		position: relative;
		overflow: hidden;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--accent-500) 13%, var(--surface-800)),
			var(--surface-950)
		);
	}
	.initial {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 96px;
		font-weight: 700;
		font-family: var(--font-mono);
		color: color-mix(in srgb, var(--accent-500) 26%, transparent);
		user-select: none;
	}
	.media img {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.info {
		padding: clamp(20px, 2.6vw, 34px);
		display: flex;
		flex-direction: column;
		gap: 14px;
		justify-content: center;
	}
	.tag {
		align-self: flex-start;
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent-400);
		padding: 3px 9px;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--accent-500) 14%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent-500) 32%, transparent);
	}
	.info h3 {
		margin: 0;
		font-size: clamp(1.3rem, 2.4vw, 1.7rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--text-strong);
	}
	.info p {
		margin: 0;
		color: var(--text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}
	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		height: 25px;
		padding: 0 10px;
		border-radius: var(--radius-sm);
		background: var(--surface-800);
		border: 1px solid var(--border-700);
		color: var(--text-muted);
		font-size: var(--text-xs);
		font-weight: 500;
	}
	.links {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		margin-top: 6px;
	}
	.lbtn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		height: 38px;
		padding: 0 16px;
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		font-weight: 600;
		text-decoration: none;
		transition:
			background var(--dur-fast),
			border-color var(--dur-fast);
	}
	.lbtn.ghost {
		background: var(--surface-800);
		border: 1px solid var(--border-700);
		color: var(--text);
	}
	.lbtn.ghost:hover {
		background: var(--neutral-700);
		border-color: var(--neutral-600);
	}
	.lbtn.primary {
		background: var(--accent-500);
		color: var(--accent-foreground);
		box-shadow: var(--shadow-accent);
	}
	.lbtn.primary:hover {
		background: var(--accent-400);
	}
	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 18px;
		margin-top: 26px;
	}
	.nav {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-700);
		background: var(--surface-900);
		color: var(--text-muted);
		cursor: pointer;
		transition:
			color var(--dur-fast),
			border-color var(--dur-fast),
			transform var(--dur-fast);
	}
	.nav:hover {
		color: var(--accent-500);
		border-color: color-mix(in srgb, var(--accent-500) 45%, var(--border-700));
		transform: scale(1.06);
	}
	.dots {
		display: flex;
		align-items: center;
		gap: 9px;
	}
	.dot {
		width: 9px;
		height: 9px;
		border-radius: 99px;
		border: none;
		padding: 0;
		background: var(--neutral-700);
		cursor: pointer;
		transition:
			width 0.35s var(--ease-spring),
			background 0.25s;
	}
	.dot.active {
		width: 28px;
		background: var(--accent-500);
		box-shadow: 0 0 8px color-mix(in srgb, var(--accent-500) 50%, transparent);
	}
	.counter {
		margin-left: 6px;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		letter-spacing: 0.08em;
		color: var(--text-subtle);
	}
	.cur {
		color: var(--accent-500);
		font-weight: 600;
	}
</style>
