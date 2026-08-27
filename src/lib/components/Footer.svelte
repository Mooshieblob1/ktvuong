<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer>
	<div class="inner">
		<div class="brand">
			<img src="/mooshie-logo.png" alt="Kent Vuong" />
			<div class="lines">
				<span class="name">Kent Vuong</span>
				<span class="mono">Creative AI tools · maker of MooshieUI · {year}</span>
			</div>
		</div>
		<div class="right">
			<a
				class="gh"
				href="https://github.com/Mooshieblob1"
				target="_blank"
				rel="noopener"
				aria-label="GitHub"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
					/></svg
				>
			</a>
			<a
				class="gh"
				href="https://www.linkedin.com/in/kentvuong88/"
				target="_blank"
				rel="noopener"
				aria-label="LinkedIn"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.2 8.3h4.56V24H.2V8.3Zm7.32 0h4.37v2.15h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.91h-4.56v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24H7.52V8.3Z"
					/></svg
				>
			</a>
		</div>
	</div>
	<div class="readout mono" aria-hidden="true">
		<span class="chip">OS: ARCH LINUX (BTW)</span>
		<span class="chip">WM: SVELTEKIT / CF</span>
		<span class="chip">SHELL: KV-ZSH</span>
		<span class="chip">STATUS: <span class="ok">OPERATIONAL</span></span>
		<span class="chip">© {year}</span>
	</div>
	<div class="wordmark" aria-hidden="true">Kent <span>Vuong</span><span class="caret"></span></div>
</footer>

<style>
	footer {
		position: relative;
		border-top: 1px solid var(--border-700);
		background: var(--surface-950);
		overflow: hidden;
	}
	.inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: clamp(28px, 4vw, 40px) clamp(20px, 5vw, 48px) 0;
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
	.right {
		display: flex;
		gap: 8px;
	}
	.gh {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: var(--radius-md);
		border: 1px solid color-mix(in srgb, #fff 10%, transparent);
		color: var(--text-muted);
		background: rgba(255, 255, 255, 0.04);
		transition:
			color var(--dur-fast),
			border-color var(--dur-fast);
	}
	.gh:hover {
		color: var(--accent-500);
		border-color: color-mix(in srgb, var(--accent-500) 45%, transparent);
	}
	.readout {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;
		padding: 18px clamp(20px, 5vw, 48px) 0;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 22px;
		padding: 0 10px;
		border-radius: 3px;
		font-size: 10px;
		letter-spacing: 0.1em;
		color: var(--text-subtle);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid color-mix(in srgb, #fff 7%, transparent);
	}
	.ok {
		color: var(--success);
	}
	/* Giant cropped wordmark bleeding off the bottom edge, terminal caret blinking. */
	.wordmark {
		position: relative;
		height: clamp(70px, 11vw, 150px);
		margin-top: clamp(18px, 3vw, 32px);
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(88px, 16vw, 230px);
		line-height: 0.72;
		letter-spacing: -0.04em;
		text-align: center;
		white-space: nowrap;
		user-select: none;
		color: color-mix(in srgb, var(--text) 7%, transparent);
	}
	.wordmark span {
		background-image: linear-gradient(to left, #cc9900, #ffcc00, #ffe680);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		opacity: 0.16;
	}
	.caret {
		display: inline-block;
		width: 0.08em;
		height: 0.62em;
		margin-left: 0.06em;
		background: var(--accent-500);
		opacity: 0.5;
		animation: mb-blink 1.1s steps(1) infinite;
	}
</style>
