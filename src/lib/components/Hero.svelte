<script lang="ts">
	import { scrollToId } from '$lib/scroll';
	import NodeGraph from './NodeGraph.svelte';
	import Button from './ui/Button.svelte';
	import StatusDot from './ui/StatusDot.svelte';

	const openToWork = true;
</script>

<section id="about" class="hero">
	<div class="text">
		<div class="eyebrow">
			<span class="rule"></span>
			<span>Full-stack · DevOps · AI tooling</span>
		</div>
		<h1>Kent Vuong</h1>
		<p class="lead">
			I build fast, practical software — from desktop AI tools to web apps and the infrastructure
			under them.
		</p>
		<p class="desc">
			Creator of <span class="hl">MooshieUI</span>, a beginner-friendly desktop frontend for
			ComfyUI. I care about clean code, native performance, and removing friction for the people who
			use what I make.
		</p>
		<div class="cta">
			<Button size="lg" onclick={() => scrollToId('work')}>View my work</Button>
			<Button variant="secondary" size="lg" onclick={() => scrollToId('contact')}
				>Get in touch</Button
			>
		</div>
		<div class="status">
			<StatusDot
				status={openToWork ? 'online' : 'idle'}
				pulse={openToWork}
				label={openToWork ? 'Available for work' : 'Currently heads-down'}
			/>
		</div>
	</div>

	<div class="visual">
		<NodeGraph />
		<div class="terminal">
			<div class="tbar">
				<span class="d red"></span>
				<span class="d yellow"></span>
				<span class="d green"></span>
				<span class="ttitle">zsh — whoami</span>
			</div>
			<div class="tbody">
				<div><span class="prompt">$</span> <span class="cmd">whoami</span></div>
				<div class="out">→ Kent Vuong · software engineer</div>
				<div class="sp"><span class="prompt">$</span> <span class="cmd">cat focus.txt</span></div>
				<div class="out">→ Svelte · Rust · Tauri · Python · AI/ML</div>
				<div class="sp">
					<span class="prompt">$</span> <span class="cmd">connect --social</span><span
						class="cursor"
					></span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		max-width: 1200px;
		margin: 0 auto;
		padding: clamp(110px, 15vh, 160px) clamp(20px, 5vw, 48px) clamp(48px, 8vh, 90px);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
		gap: clamp(32px, 5vw, 64px);
		align-items: center;
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 22px;
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
	h1 {
		margin: 0;
		font-size: clamp(2.4rem, 6vw, 4.2rem);
		font-weight: 700;
		line-height: 1.04;
		letter-spacing: -0.03em;
		color: var(--text-strong);
	}
	.lead {
		margin: 0;
		font-size: clamp(1.05rem, 2.4vw, 1.4rem);
		color: var(--text);
		font-weight: 500;
		line-height: 1.4;
		max-width: 30ch;
	}
	.desc {
		margin: 0;
		font-size: var(--text-base);
		color: var(--text-muted);
		line-height: 1.65;
		max-width: 46ch;
	}
	.hl {
		color: var(--accent-400);
		font-weight: 600;
	}
	.cta {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 4px;
	}
	.status {
		margin-top: 6px;
	}
	.visual {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.terminal {
		background: var(--surface-900);
		border: 1px solid var(--border-700);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}
	.tbar {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 9px 12px;
		border-bottom: 1px solid color-mix(in srgb, var(--border-700) 60%, transparent);
	}
	.d {
		width: 9px;
		height: 9px;
		border-radius: 50%;
	}
	.red {
		background: var(--danger-hover);
	}
	.yellow {
		background: var(--warning);
	}
	.green {
		background: var(--success);
	}
	.ttitle {
		margin-left: 6px;
		font-family: var(--font-mono);
		font-size: var(--text-10);
		color: var(--text-subtle);
	}
	.tbody {
		padding: 14px 16px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		line-height: 1.85;
	}
	.prompt {
		color: var(--accent-500);
	}
	.cmd {
		color: var(--text);
	}
	.out {
		color: var(--success-text);
	}
	.sp {
		margin-top: 6px;
	}
	.cursor {
		display: inline-block;
		width: 7px;
		height: 14px;
		background: var(--accent-500);
		margin-left: 5px;
		vertical-align: -2px;
		animation: mb-blink 1.1s steps(1) infinite;
	}
</style>
