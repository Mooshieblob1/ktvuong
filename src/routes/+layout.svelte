<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let lenis: any;

	onMount(async () => {
		const isFirefox = navigator.userAgent.includes('Firefox');
		if (!isFirefox) {
			const { default: Lenis } = await import('lenis');
			lenis = new Lenis({
				duration: 1.2,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				smoothWheel: true,
				autoRaf: true
			});
			(window as any).__lenis = lenis;
			document.documentElement.classList.add('lenis-active');
		}
	});

	onDestroy(() => {
		if (lenis) {
			lenis.destroy();
		}
	});
</script>

<Header />

<main>
	<slot />
</main>

<Footer />
