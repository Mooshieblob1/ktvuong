<script lang="ts">
	import { onMount } from 'svelte';

	let { text, chars = '█▓▒░<>/\\|=+*#' }: { text: string; chars?: string } = $props();

	let el: HTMLElement;
	let visible = $state(false);
	let display = $state('');
	let raf = 0;

	onMount(() => {
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					visible = true;
					io.disconnect();
				}
			},
			{ threshold: 0.4 }
		);
		io.observe(el);
		return () => {
			io.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});

	$effect(() => {
		if (!visible) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			display = text;
			return;
		}
		const target = text;
		const n = target.length;
		const start = performance.now();
		const hold = 80;
		const perChar = 34;
		const loop = (now: number) => {
			const t = now - start - hold;
			let out = '';
			for (let i = 0; i < n; i++) {
				const revealAt = i * perChar;
				if (t >= revealAt + 120) out += target[i];
				else if (t >= revealAt) out += chars[Math.floor(Math.random() * chars.length)] ?? target[i];
				else out += ' ';
			}
			display = out.replace(/\s+$/, '');
			if (t < n * perChar + 120) raf = requestAnimationFrame(loop);
			else display = target;
		};
		raf = requestAnimationFrame(loop);
	});
</script>

<span bind:this={el} aria-label={text}>{display}</span>
