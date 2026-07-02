<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer>
	<div class="inner">
		<div class="brand">
			<img src="/mooshie-logo.png" alt="Kent Vuong" />
			<div class="lines">
				<span class="name">Kent Vuong</span>
				<span class="mono">Built by the maker of MooshieUI · {year}</span>
			</div>
		</div>
		<span class="mono tagline">Mooshie yellow on near-black</span>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--border-700);
		background: var(--surface-950);
	}
	.inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: clamp(28px, 4vw, 40px) clamp(20px, 5vw, 48px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		flex-wrap: wrap;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.brand img {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-md);
	}
	.lines {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.name {
		font-weight: 700;
		color: var(--text-strong);
		font-size: var(--text-sm);
	}
	.mono {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		color: var(--text-subtle);
	}
	.tagline {
		letter-spacing: 0.04em;
	}
</style>
