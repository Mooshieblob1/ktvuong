<script lang="ts">
	import { skillGroups } from '$lib/data/skills';
</script>

<section id="skills" class="skills">
	<div class="head">
		<div class="eyebrow"><span class="rule"></span><span>What I work with</span></div>
		<h2>Tools of the trade</h2>
		<p>The stack behind the projects above — not a wishlist, just what I actually ship with.</p>
	</div>
	<div class="grid">
		{#each skillGroups as group (group.title)}
			<div class="panel">
				<div class="phead">
					<span class="icon">{group.icon}</span>
					<h3>{group.title}</h3>
				</div>
				<div class="tags">
					{#each group.skills as skill (skill)}
						<span class="tag">{skill}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.skills {
		max-width: 1200px;
		margin: 0 auto;
		padding: clamp(40px, 7vh, 80px) clamp(20px, 5vw, 48px);
	}
	.head {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-bottom: clamp(28px, 5vw, 44px);
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
	.panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 22px;
		background: var(--surface-900);
		border: 1px solid var(--border-700);
		border-radius: var(--radius-lg);
		transition: border-color var(--dur-base);
	}
	.panel:hover {
		border-color: color-mix(in srgb, var(--accent-500) 30%, var(--border-700));
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
	.tag {
		display: inline-flex;
		align-items: center;
		height: 28px;
		padding: 0 11px;
		border-radius: var(--radius-sm);
		background: var(--surface-800);
		border: 1px solid var(--border-700);
		color: var(--text-muted);
		font-size: var(--text-xs);
		font-weight: 500;
		transition:
			color var(--dur-fast),
			border-color var(--dur-fast);
	}
	.tag:hover {
		color: var(--text-strong);
		border-color: var(--neutral-600);
	}
</style>
