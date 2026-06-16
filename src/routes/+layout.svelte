<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { children } = $props();
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
	<title>Kent Vuong — Software Engineer</title>
	<meta
		name="description"
		content="Full-stack & DevOps engineer based in Perth. Selected work and open-source projects."
	/>
	<!-- Keep the portfolio out of search results — only people you send the link to find it. -->
	<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
</svelte:head>

<Header />

<main>
	{@render children()}
</main>

<Footer />
