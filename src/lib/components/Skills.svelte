<script lang="ts">
	import { skillGroups } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import SectionHead from './SectionHead.svelte';
	import WinBar from './WinBar.svelte';
</script>

<section id="skills" class="skills">
	<SectionHead
		index="03"
		label="what I work with"
		title="Tools of the trade"
		note="The stack behind the tools above. Not a wishlist, just what I actually ship with."
		readout="{skillGroups.length} groups"
	/>
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
		padding: clamp(30px, 4.5vh, 56px) clamp(20px, 5vw, 48px);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(238px, 1fr));
		gap: 10px;
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
		gap: 12px;
		padding: 16px;
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
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-muted);
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
		height: 24px;
		padding: 0 9px;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.025);
		border: 1px solid var(--line);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.04em;
		font-weight: 400;
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
