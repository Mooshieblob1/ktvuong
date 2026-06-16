/** Smooth-scroll to a section, accounting for the fixed header and Lenis. */
export function scrollToId(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	const lenis = window.__lenis;
	if (lenis) {
		lenis.scrollTo(el, { offset: -64 });
	} else {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const y = el.getBoundingClientRect().top + window.pageYOffset - 64;
		window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
	}
}
