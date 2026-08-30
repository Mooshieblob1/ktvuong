<script lang="ts">
	import { goto } from '$app/navigation';
	import { goToSection } from '$lib/scroll';

	interface Line {
		kind: 'in' | 'out' | 'ok' | 'err';
		text: string;
	}

	let open = $state(false);
	let inputEl: HTMLInputElement;
	let bodyEl: HTMLElement;
	let input = $state('');
	let lines: Line[] = [];
	let venv = false;

	const BANNER = [
		'kv-sh v2.4.1 :: portfolio shell (arch)',
		"type 'help' for commands · 'exit' to close"
	];

	const HELP = [
		'help          list commands',
		'whoami        print the operator',
		'ls            list sections',
		'cd <section>  jump to a section',
		'pacman -Qi    query a project (try: mooshieui)',
		'neofetch      system info',
		'echo <text>   say it back',
		'resume        open the resume',
		'hire          send an offer',
		'clear         wipe the terminal',
		'exit          close terminal'
	];

	function print(text: string, kind: Line['kind'] = 'out') {
		lines = [...lines, { text, kind }];
		queueMicrotask(() => {
			if (bodyEl) bodyEl.scrollTop = bodyEl.scrollHeight;
		});
	}

	function run(raw: string) {
		const cmd = raw.trim();
		if (!cmd) return;
		print(`[kv@arch ~]$ ${cmd}`, 'in');
		const [bin, ...args] = cmd.split(/\s+/);
		switch (bin) {
			case 'help':
				HELP.forEach((l) => print(l));
				break;
			case 'whoami':
				print('kent :: creative AI toolmaker, Perth WA');
				break;
			case 'ls':
				print('about/  work/  repos/  skills/  contact/  resume');
				break;
			case 'cd': {
				const target = (args[0] ?? '').replace(/\/$/, '');
				const valid = ['about', 'work', 'repos', 'skills', 'contact'];
				if (target === 'resume') {
					print('→ ~/resume', 'ok');
					goto('/resume');
					open = false;
				} else if (valid.includes(target)) {
					print(`→ ~/work/${target}`, 'ok');
					goToSection(target);
					open = false;
				} else {
					print(`cd: no such section: ${args[0] ?? ''}`);
				}
				break;
			}
			case 'pacman': {
				const q = args.join(' ');
				if (/^-Qi\s/.test(q + ' ') || args[0] === '-Qi') {
					const pkg = args[1]?.toLowerCase() ?? '';
					const pkgs: Record<string, string> = {
						mooshieui: 'mooshieui 2.4.1 [installed] 180★ :: beginner-friendly ComfyUI frontend',
						koharu: 'koharu [installed] :: ML manga translator in Rust',
						nixos: 'error: wrong distro, mate'
					};
					print(pkgs[pkg] ?? `error: package '${pkg}' was not found`);
				} else {
					print('usage: pacman -Qi <package>  (try: mooshieui)');
				}
				break;
			}
			case 'neofetch':
				print('kv@arch');
				print('OS: Arch Linux x86_64 (BTW)');
				print('Host: ktvuong.com');
				print('WM: SvelteKit + Cloudflare (margin)');
				print('Terminal: this one');
				print('Uptime: since 2020');
				print('Packages: 63 (public repos)');
				print(`Memory: 180★ / 63 repos`);
				break;
			case 'echo':
				print(args.join(' '));
				break;
			case 'sudo':
				print('kv is not in the sudoers file. This incident will be reported.');
				break;
			case 'resume':
			case 'cv':
				print('opening resume :: print for the A4 sheet', 'ok');
				goto('/resume');
				open = false;
				break;
			case 'hire':
				print('→ opening contact…', 'ok');
				goToSection('contact');
				open = false;
				break;
			case 'clear':
				lines = [];
				break;
			case 'exit':
				open = false;
				break;
			case 'source': {
				if (args[0]?.includes('venv')) {
					venv = true;
					print('(.venv) activated. happy diffusing', 'ok');
				} else {
					print(`source: ${args[0] ?? ''}: no such file`);
				}
				break;
			}
			case 'deactivate':
				venv = false;
				print('venv deactivated');
				break;
			default:
				print(`${bin}: command not found. try 'help'`);
		}
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		const v = input;
		input = '';
		run(v);
	}

	function onKey(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key === '`') {
			e.preventDefault();
			open = !open;
			lines = lines.length ? lines : BANNER.map((t) => ({ text: t, kind: 'out' as const }));
			queueMicrotask(() => inputEl?.focus());
			return;
		}
		if (!open) return;
		if (e.key === 'Escape') open = false;
	}

	// Rofi "Open terminal" entry dispatches this custom event.
	$effect(() => {
		const open1 = () => {
			open = true;
			lines = lines.length ? lines : BANNER.map((t) => ({ text: t, kind: 'out' as const }));
			queueMicrotask(() => inputEl?.focus());
		};
		window.addEventListener('kv:term', open1);
		return () => window.removeEventListener('kv:term', open1);
	});
</script>

<svelte:window onkeydown={onKey} />

{#if open}
	<div class="term glass-panel hud" role="dialog" aria-label="Terminal">
		<span class="hud-c"></span>
		<div class="bar">
			<span class="dot"></span>
			<span class="title">kv@arch: ~ (zsh)</span>
			<button class="x" aria-label="Close terminal" onclick={() => (open = false)}>✕</button>
		</div>
		<div class="body" bind:this={bodyEl}>
			{#each lines as l, i (i)}
				<div class="line {l.kind}">
					{#if l.kind === 'in'}<span class="ps1">$</span>{/if}
					<span class="txt">{l.text}</span>
				</div>
			{/each}
			<form class="prompt" onsubmit={submit}>
				<span class="ps1">{venv ? '(.venv)' : ''}[kv@arch ~]$</span>
				<input
					bind:this={inputEl}
					bind:value={input}
					autocomplete="off"
					spellcheck="false"
					aria-label="Terminal input"
				/>
				<span class="caret"></span>
			</form>
		</div>
	</div>
{/if}

<style>
	.term {
		position: fixed;
		right: 24px;
		bottom: 44px;
		z-index: 90;
		width: min(640px, calc(100vw - 48px));
		height: 380px;
		display: flex;
		flex-direction: column;
		animation: term-in 0.18s var(--ease-spring);
	}
	@keyframes term-in {
		from {
			opacity: 0;
			transform: translateY(14px) scale(0.98);
		}
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 12px;
		border-bottom: 1px solid color-mix(in srgb, #fff 7%, transparent);
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--success);
		box-shadow: 0 0 6px var(--success);
	}
	.title {
		font-family: var(--font-mono);
		font-size: var(--text-10);
		letter-spacing: 0.08em;
		color: var(--text-muted);
	}
	.x {
		margin-left: auto;
		background: none;
		border: none;
		color: var(--text-subtle);
		cursor: pointer;
		font-size: 11px;
		padding: 2px 6px;
		border-radius: 4px;
	}
	.x:hover {
		color: var(--danger-text);
		background: color-mix(in srgb, var(--danger) 14%, transparent);
	}
	.body {
		flex: 1;
		overflow-y: auto;
		padding: 12px 14px;
		font-family: var(--font-mono);
		font-size: 12px;
		line-height: 1.55;
	}
	.line {
		white-space: pre-wrap;
		word-break: break-word;
	}
	.line.in .txt {
		color: var(--text-strong);
	}
	.line.in .ps1 {
		color: var(--accent-500);
		margin-right: 7px;
	}
	.line.ok .txt {
		color: var(--success-text);
	}
	.line.out .txt {
		color: var(--text-muted);
	}
	.prompt {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-top: 4px;
	}
	.ps1 {
		color: var(--accent-500);
		white-space: nowrap;
	}
	.prompt input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		color: var(--text-strong);
		font: inherit;
		caret-color: var(--accent-500);
	}
	.caret {
		width: 7px;
		height: 14px;
		background: var(--accent-500);
		animation: mb-blink 1.1s steps(1) infinite;
	}
</style>
