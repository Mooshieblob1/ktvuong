/** Smooth-scroll to a section, accounting for the fixed header and Lenis. */
export function scrollToId(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	/* Clear the floating nav pill, which wraps to two or three rows on phones. */
	const navH =
		parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 56;
	const offset = navH + 22;
	const lenis = window.__lenis;
	if (lenis) {
		lenis.scrollTo(el, { offset: -offset });
	} else {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
		window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
	}
}
