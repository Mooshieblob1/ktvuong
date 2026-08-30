<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import { goToSection } from '$lib/scroll';
	import Button from '$lib/components/ui/Button.svelte';
	import StatusDot from '$lib/components/ui/StatusDot.svelte';
	import { contact } from '$lib/data/contact';
	import {
		role,
		summary,
		facts,
		experience,
		skillGroups,
		highlights,
		education
	} from '$lib/data/resume';

	/* Held as obfuscated tokens (see $lib/data/contact) and only decoded when
	   someone asks, so neither the markup nor the bundle carries either value
	   in readable form. */
	let revealed = $state<{ email: string; phone: string } | null>(null);
	const revealContact = () => {
		revealed = { email: contact.email(), phone: contact.phone() };
	};

	/* A printed sheet with no way to reply is a dud, so reveal on the way to
	   paper. The address is still absent from the server-rendered markup,
	   which is what the scrapers read. */
	$effect(() => {
		const onBeforePrint = () => revealContact();
		window.addEventListener('beforeprint', onBeforePrint);
		return () => window.removeEventListener('beforeprint', onBeforePrint);
	});

	function print() {
		revealContact();
		window.print();
	}

	const updated = 'AUG 2026';
</script>

<section class="resume">
	<!-- Same backdrop stack as the hero, dialled down: this page is a document. -->
	<div class="backdrop" aria-hidden="true">
		<div class="gridlines tex"></div>
		<div class="noise"></div>
	</div>

	<div class="sheet">
		<!-- ---------------------------------------------------------------
		     Masthead: identity, contact readout, actions.
		     --------------------------------------------------------------- -->
		<header class="masthead" use:reveal>
			<div class="stripe">
				<span class="ix tnum">05</span>
				<span class="label">curriculum vitae</span>
				<span class="rule"></span>
				<span class="readout tnum">rev {updated}</span>
			</div>

			<div class="mastbody">
				<div class="ident">
					<div class="who">
						<h1>Kent Vuong</h1>
						<p class="role">{role}</p>
					</div>

					<address class="contact">
						<a class="crow" href="https://ktvuong.com">ktvuong.com</a>
						<a class="crow" href="https://github.com/Mooshieblob1" target="_blank" rel="noopener">
							github.com/Mooshieblob1
						</a>
						<a
							class="crow"
							href="https://www.linkedin.com/in/kentvuong88/"
							target="_blank"
							rel="noopener"
						>
							linkedin.com/in/kentvuong88
						</a>
						{#if revealed}
							<a class="crow" href="mailto:{revealed.email}">{revealed.email}</a>
							<a class="crow" href="tel:{contact.phoneHref()}">{revealed.phone}</a>
						{:else}
							<button class="crow reveal-btn" onclick={revealContact}>
								click to reveal email and phone
							</button>
						{/if}
					</address>
				</div>

				<dl class="telemetry tnum">
					{#each facts as f (f.label)}
						<div class="field">
							<dt>{f.label}</dt>
							<dd>{f.value}</dd>
						</div>
					{/each}
				</dl>

				<p class="summary">{summary}</p>

				<div class="actions">
					<Button size="lg" onclick={print}>Print or save as PDF</Button>
					<Button variant="secondary" size="lg" onclick={() => goToSection('work')}>
						See the work
					</Button>
					<span class="avail">
						<StatusDot status="online" pulse label="Available for work" />
					</span>
				</div>
			</div>
		</header>

		<!-- ---------------------------------------------------------------
		     Body: experience on the left, capability panels on the right,
		     the same split the printed sheet uses.
		     --------------------------------------------------------------- -->
		<div class="cols">
			<div class="main">
				<section class="block" use:reveal>
					<div class="stripe">
						<span class="ix tnum">01</span>
						<span class="label">experience</span>
						<span class="rule"></span>
						<span class="readout tnum">{experience.length} roles</span>
					</div>

					<div class="panel glass-panel hud" use:spotlight>
						<span class="hud-c"></span>
						<div class="bar toolwin-bar">
							<span class="toolwin-title">kv@arch:~/resume/experience</span>
							<span class="toolwin-live"><span class="ldot"></span>current</span>
						</div>
						<ol class="entries">
							{#each experience as e (e.org)}
								<li class="entry">
									<div class="ehead">
										<h2>{e.org}</h2>
										<span class="period tnum">{e.period}</span>
									</div>
									<p class="erole">{e.role}</p>
									<ul class="points">
										{#each e.points as p (p)}
											<li>{p}</li>
										{/each}
									</ul>
								</li>
							{/each}
						</ol>
					</div>
				</section>
			</div>

			<aside class="side">
				<section class="block" use:reveal={{ delay: 80 }}>
					<div class="stripe">
						<span class="ix tnum">02</span>
						<span class="label">skills</span>
						<span class="rule"></span>
						<span class="readout tnum">{skillGroups.length} groups</span>
					</div>
					<div class="panel glass-panel hud" use:spotlight>
						<span class="hud-c"></span>
						<div class="bar toolwin-bar">
							<span class="toolwin-title">skills.toml</span>
							<span class="toolwin-live"><span class="ldot"></span>loaded</span>
						</div>
						<div class="pad groups">
							{#each skillGroups as g (g.label)}
								<div class="group">
									<span class="glabel">{g.label}</span>
									<div class="tags">
										{#each g.items as s (s)}
											<span class="tagchip">{s}</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</section>

				<section class="block" use:reveal={{ delay: 120 }}>
					<div class="stripe">
						<span class="ix tnum">03</span>
						<span class="label">selected projects</span>
						<span class="rule"></span>
						<span class="readout tnum">{highlights.length} entries</span>
					</div>
					<div class="panel glass-panel hud" use:spotlight>
						<span class="hud-c"></span>
						<div class="bar toolwin-bar">
							<span class="toolwin-title">projects.lock</span>
							<span class="toolwin-live"><span class="ldot"></span>shipped</span>
						</div>
						<ul class="pad projects">
							{#each highlights as p (p.name)}
								<li class="proj">
									<div class="phead">
										{#if p.href}
											<a class="pname" href={p.href} target="_blank" rel="noopener">{p.name}</a>
										{:else}
											<span class="pname">{p.name}</span>
										{/if}
										<span class="pmeta">{p.meta}</span>
									</div>
									<p>{p.blurb}</p>
								</li>
							{/each}
						</ul>
					</div>
				</section>

				<section class="block" use:reveal={{ delay: 160 }}>
					<div class="stripe">
						<span class="ix tnum">04</span>
						<span class="label">education</span>
						<span class="rule"></span>
					</div>
					<div class="panel glass-panel hud" use:spotlight>
						<span class="hud-c"></span>
						<div class="bar toolwin-bar">
							<span class="toolwin-title">education.log</span>
							<span class="toolwin-live"><span class="ldot"></span>complete</span>
						</div>
						<div class="pad">
							{#each education as e (e.org)}
								<div class="entry flat">
									<div class="ehead">
										<h2>{e.org}</h2>
										<span class="period tnum">{e.period}</span>
									</div>
									<p class="erole">{e.role}</p>
								</div>
							{/each}
						</div>
					</div>
				</section>
			</aside>
		</div>
	</div>
</section>

<style>
	.resume {
		position: relative;
		padding: calc(var(--nav-offset) + 30px) clamp(20px, 5vw, 48px) clamp(40px, 6vh, 72px);
	}
	.sheet {
		position: relative;
		z-index: 2;
		max-width: 1180px;
		margin: 0 auto;
	}

	/* --- Backdrop ---------------------------------------------------------- */
	.backdrop {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}
	.tex {
		position: absolute;
		inset: 0;
		opacity: 0.4;
	}

	/* --- Section stripe: the same instrument label SectionHead uses ---------- */
	.stripe {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-bottom: 9px;
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
	.ix {
		color: var(--accent-500);
		font-weight: 600;
	}
	.label {
		color: var(--text-subtle);
		white-space: nowrap;
	}
	.rule {
		flex: 1 1 auto;
		height: 1px;
		min-width: 20px;
		background: var(--line);
	}
	.readout {
		color: var(--text-muted);
		white-space: nowrap;
	}

	/* --- Masthead ----------------------------------------------------------- */
	.masthead {
		margin-bottom: clamp(24px, 3.5vw, 38px);
	}
	.mastbody {
		border-top: 1px solid var(--line-strong);
		padding-top: 18px;
	}
	.ident {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 20px 32px;
	}
	h1 {
		margin: 0;
		font-size: clamp(2.1rem, 4.6vw, 3.4rem);
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.032em;
		color: var(--text-strong);
	}
	.role {
		margin: 10px 0 0;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.contact {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
		font-style: normal;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-align: right;
	}
	.crow {
		color: var(--text-muted);
		text-decoration: none;
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		transition: color var(--dur-fast);
	}
	.crow:hover {
		color: var(--accent-400);
	}
	.reveal-btn {
		color: var(--text-subtle);
	}

	/* Hairline instrument strip, the same one the hero uses for its stats. */
	.telemetry {
		display: flex;
		flex-wrap: wrap;
		margin: 22px 0 0;
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
		min-width: 132px;
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
		font-size: var(--text-sm);
		font-weight: 600;
		line-height: 1.3;
		color: var(--text-strong);
	}
	.summary {
		margin: 20px 0 0;
		max-width: 82ch;
		font-size: var(--text-base);
		line-height: 1.65;
		color: var(--text-muted);
	}
	.actions {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px 16px;
		margin-top: 22px;
	}
	.actions :global(.btn) {
		border-radius: var(--radius-full);
		padding-left: 24px;
		padding-right: 24px;
	}
	.avail {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	/* --- Two-column body ---------------------------------------------------- */
	.cols {
		display: grid;
		grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
		align-items: start;
		gap: clamp(16px, 2vw, 26px);
	}
	.side {
		display: flex;
		flex-direction: column;
		gap: clamp(16px, 2vw, 26px);
	}
	.block + .block {
		margin-top: 0;
	}
	.panel {
		position: relative;
	}
	.bar {
		position: relative;
		z-index: 3;
	}
	.pad {
		position: relative;
		z-index: 3;
		padding: 18px 20px;
	}

	/* --- Experience entries: hairline-divided spec rows ---------------------- */
	.entries {
		position: relative;
		z-index: 3;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.entry {
		padding: 18px 20px;
	}
	.entries .entry + .entry {
		border-top: 1px solid var(--line);
	}
	.ehead {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 14px;
		flex-wrap: wrap;
	}
	.ehead h2 {
		margin: 0;
		font-size: var(--text-lg);
		font-weight: 600;
		letter-spacing: -0.015em;
		color: var(--text-strong);
	}
	.period {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.1em;
		color: var(--text-subtle);
		white-space: nowrap;
	}
	.erole {
		margin: 4px 0 0;
		font-size: var(--text-sm);
		color: var(--text-muted);
	}
	.points {
		list-style: none;
		margin: 12px 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
	.points li {
		position: relative;
		padding-left: 16px;
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--text-muted);
	}
	/* Structural bullet, so it stays neutral: the accent means live or
	   interactive everywhere else on the site. */
	.points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 8px;
		width: 5px;
		height: 5px;
		border-radius: 1px;
		background: var(--line-strong);
	}
	.entry.flat {
		padding: 0;
	}

	/* --- Skills ------------------------------------------------------------- */
	.groups {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.glabel {
		display: block;
		margin-bottom: 8px;
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-subtle);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
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

	/* --- Projects ----------------------------------------------------------- */
	.projects {
		list-style: none;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.proj + .proj {
		padding-top: 14px;
		border-top: 1px solid var(--line);
	}
	.phead {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
	}
	.pname {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--text-strong);
		text-decoration: none;
		transition: color var(--dur-fast);
	}
	a.pname:hover {
		color: var(--accent-400);
	}
	.pmeta {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.08em;
		color: var(--text-subtle);
	}
	.proj p {
		margin: 5px 0 0;
		font-size: var(--text-xs);
		line-height: 1.6;
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.cols {
			grid-template-columns: minmax(0, 1fr);
		}
		.contact {
			align-items: flex-start;
			text-align: left;
		}
	}

	/* ======================================================================
	   Print: the same DOM, re-set as the A4 sheet a recruiter expects.
	   Glass, brackets, chrome and backdrop drop away; hairlines and the
	   mono readouts stay, so the paper still reads as the same document.
	   ====================================================================== */
	@media print {
		.resume {
			padding: 0;
			color: #1c1c1c;
		}
		.sheet {
			max-width: none;
		}
		.backdrop,
		.actions,
		.bar,
		.avail {
			display: none !important;
		}

		.stripe {
			padding-bottom: 5px;
			font-size: 6.6pt;
			letter-spacing: 0.16em;
		}
		/* No hover or focus states on paper, so the accent is free to go back
		   to being the brand mark it is on the printed sheet. */
		.ix {
			color: #c9a012;
		}
		.label {
			color: #6a6a6a;
		}
		.rule {
			background: #e0e0e0;
		}
		.readout {
			color: #8a8a8a;
		}

		.masthead {
			margin-bottom: 10px;
		}
		.mastbody {
			padding-top: 7px;
		}
		h1 {
			font-size: 24pt;
			color: #111;
		}
		.role {
			margin-top: 5px;
			font-size: 8pt;
			letter-spacing: 0.14em;
			color: #444;
		}
		.contact {
			gap: 1.5px;
			font-size: 7.4pt;
		}
		.crow {
			color: #4a4a4a;
		}
		.reveal-btn {
			display: none;
		}
		.telemetry {
			margin-top: 9px;
			border-color: #e0e0e0;
			background: none;
			border-radius: 2px;
		}
		.field {
			padding: 4px 10px;
			min-width: 0;
		}
		.field + .field {
			border-left-color: #e0e0e0;
		}
		.field dt {
			font-size: 6pt;
			color: #8a8a8a;
		}
		.field dd {
			font-size: 7.6pt;
			color: #1c1c1c;
		}
		.summary {
			margin-top: 9px;
			max-width: none;
			font-size: 8.4pt;
			line-height: 1.45;
			color: #2b2b2b;
		}

		.cols {
			display: grid;
			grid-template-columns: 62% 38%;
			gap: 0 16px;
			margin-top: 11px;
		}
		.side {
			gap: 10px;
		}
		.block {
			break-inside: avoid;
		}
		.main .block {
			break-inside: auto;
		}
		.panel {
			background: none !important;
			backdrop-filter: none !important;
			-webkit-backdrop-filter: none !important;
			border: none !important;
			border-radius: 0 !important;
			box-shadow: none !important;
		}
		.entries .entry:first-child,
		.pad {
			padding-top: 0;
		}
		.entry,
		.pad {
			padding-left: 0;
			padding-right: 0;
		}
		.entry {
			padding-bottom: 7px;
			break-inside: avoid;
		}
		.entries .entry + .entry {
			border-top: none;
			padding-top: 7px;
		}
		.ehead h2 {
			font-size: 9.6pt;
			color: #111;
		}
		.period {
			font-size: 7pt;
			color: #8a8a8a;
		}
		.erole {
			margin-top: 1px;
			font-size: 8.2pt;
			color: #555;
		}
		.points {
			margin-top: 4px;
			gap: 2px;
		}
		.points li {
			padding-left: 11px;
			font-size: 8.4pt;
			line-height: 1.4;
			color: #2b2b2b;
		}
		.points li::before {
			top: 4.6px;
			width: 4px;
			height: 4px;
			background: #f5c518;
		}

		.groups {
			gap: 7px;
		}
		.glabel {
			margin-bottom: 4px;
			font-size: 6.6pt;
			letter-spacing: 0.1em;
			color: #c9a012;
		}
		.tags {
			gap: 3px;
		}
		.tagchip {
			height: auto;
			padding: 1.5px 5px;
			font-size: 7.2pt;
			background: none;
			border-color: #dcdcdc;
			color: #2b2b2b;
		}
		.projects {
			gap: 6px;
		}
		.proj + .proj {
			padding-top: 6px;
			border-top-color: #eee;
		}
		.pname {
			font-size: 8.6pt;
			color: #111;
		}
		.pmeta {
			font-size: 7pt;
			color: #8a8a8a;
		}
		.proj p {
			font-size: 8pt;
			line-height: 1.4;
			color: #2b2b2b;
		}
	}
</style>
