<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Rofi from '$lib/components/Rofi.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Denoise from '$lib/components/Denoise.svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		try {
			const saved = localStorage.getItem('kv-theme');
			if (saved === 'amber' || saved === 'dark') {
				document.documentElement.dataset.theme = saved;
			}
		} catch {
			/* private mode */
		}
	});
	let lenis: Window['__lenis'];

	onMount(async () => {
		const isFirefox = navigator.userAgent.includes('Firefox');
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!isFirefox && !reduced) {
			const { default: Lenis } = await import('lenis');
			lenis = new Lenis({
				duration: 1.2,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				smoothWheel: true,
				autoRaf: true
			});
			window.__lenis = lenis;
			document.documentElement.classList.add('lenis-active');
		}
	});

	onDestroy(() => {
		if (lenis) lenis.destroy();
	});
</script>

<svelte:head>
	<title>Kent Vuong · Creative AI Toolmaker</title>
	<meta
		name="description"
		content="Kent Vuong (a.k.a. Mooshieblob) builds generative AI tools people actually enjoy using: MooshieUI, ComfyUI nodes, style libraries and guides. Selected work and open source."
	/>
	<!-- Keep the portfolio out of search results. Only people you send the link to find it. -->
	<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
</svelte:head>

<Header />

<main>
	{@render children()}
</main>

<Footer />
<Rofi />
<Terminal />

<div class="denoise-host" aria-hidden="true">
	<Denoise />
</div>
