<script lang="ts">
	import { skillGroups } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import { parallax } from '$lib/actions/scrollfx';
	import ScrambleText from './ScrambleText.svelte';
	import WinBar from './WinBar.svelte';
</script>

<section id="skills" class="skills">
	<span class="ghost-num" data-num="03" aria-hidden="true" use:parallax={{ speed: 0.08 }}>03</span>
	<div class="head" use:reveal>
		<span class="sec-index"><b>03</b> what I work with</span>
		<h2><ScrambleText text="Tools of the trade" /></h2>
		<p>The stack behind the tools above — not a wishlist, just what I actually ship with.</p>
	</div>
	<div class="grid">
		{#each skillGroups as group, gi (group.title)}
			<div class="toolwin hud" use:spotlight use:reveal={{ delay: gi * 80 }}>
				<span class="hud-c"></span>
				<WinBar title="{group.title.toLowerCase().replace(/\s+/g, '-')}.tool" live="loaded">
					<div class="inner">
						<div class="phead">
							<span class="icon">{group.icon}</span>
							<h3>{group.title}</h3>
						</div>
						<div class="tags">
							{#each group.skills as skill (skill)}
								<span class="tagchip">{skill}</span>
							{/each}
						</div>
					</div>
				</WinBar>
			</div>
		{/each}
	</div>
</section>

<style>
	.skills {
		position: relative;
		max-width: 1200px;
		margin: 0 auto;
		padding: clamp(40px, 7vh, 80px) clamp(20px, 5vw, 48px);
	}
	.head {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: clamp(28px, 5vw, 44px);
	}
	h2 {
		margin: 0;
		font-size: clamp(1.8rem, 3.6vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--text-strong);
	}
	.head p {
		margin: 0;
		max-width: 50ch;
		color: var(--text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 16px;
	}
	.toolwin {
		display: flex;
		flex-direction: column;
		transition: border-color var(--dur-base);
	}
	.toolwin:hover {
		border-color: color-mix(in srgb, var(--accent-500) 35%, transparent);
	}
	.inner {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 20px;
		position: relative;
		z-index: 3;
	}
	.phead {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--accent-500) 14%, transparent);
		color: var(--accent-500);
	}
	.phead h3 {
		margin: 0;
		font-size: var(--text-sm);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--text);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
	.tagchip {
		display: inline-flex;
		align-items: center;
		height: 28px;
		padding: 0 11px;
		border-radius: var(--radius-sm);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid color-mix(in srgb, #fff 8%, transparent);
		color: var(--text-muted);
		font-size: var(--text-xs);
		font-weight: 500;
		transition:
			color var(--dur-fast),
			border-color var(--dur-fast),
			background var(--dur-fast);
	}
	.tagchip:hover {
		color: var(--accent-300);
		border-color: color-mix(in srgb, var(--accent-500) 40%, transparent);
		background: color-mix(in srgb, var(--accent-500) 8%, transparent);
	}
</style>
