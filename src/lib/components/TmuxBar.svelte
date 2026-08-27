<script lang="ts">
	import { scrollToId } from '$lib/scroll';

	const wins = [
		{ id: '0', label: 'about', target: 'about' },
		{ id: '1', label: 'work', target: 'work' },
		{ id: '2', label: 'repos', target: 'repos' },
		{ id: '3', label: 'skills', target: 'skills' },
		{ id: '4', label: 'contact', target: 'contact' }
	];

	let active = $state('about');
	let clock = $state('');
	let upk = $state(0);
	let pct = $state(0);

	$effect(() => {
		const tick = () => {
			const d = new Date();
			clock = d.toLocaleTimeString('en-GB', { hour12: false });
			upk = upk + 1;
		};
		tick();
		const iv = setInterval(tick, 1000);
		const onScroll = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - window.innerHeight;
			pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			clearInterval(iv);
			window.removeEventListener('scroll', onScroll);
		};
	});

	// Track which section is in view for the active tmux window.
	$effect(() => {
		const ids = wins.map((w) => w.target);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active = e.target.id;
				}
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) io.observe(el);
		});
		return () => io.disconnect();
	});

	function go(target: string) {
		active = target;
		scrollToId(target);
	}
</script>

<div class="tmuxbar" role="navigation" aria-label="tmux status bar">
	<span class="tmux-session">❯ portfolio</span>
	{#each wins as w (w.id)}
		<button
			class="tmux-win"
			class:active={active === w.target}
			onclick={() => go(w.target)}
			aria-label="Go to {w.label}"
		>
			<span class="gid">{w.id}:k</span>
			<span>{w.label}</span>
		</button>
	{/each}
	<div class="tmux-right">
		<span class="ok">● up {Math.floor(upk / 60) + 1}m</span>
		<span>scroll {pct}%</span>
		<span class="hint">^K rofi</span>
		<span>arch@kv:~</span>
		<span>{clock}</span>
	</div>
</div>
