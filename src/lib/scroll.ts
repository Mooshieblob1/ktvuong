/** Smooth-scroll to a section, clearing the fixed chrome and cooperating with Lenis. */

/**
 * How far above a section to stop. The chrome is a left rail on wide screens
 * (nothing to clear vertically) and a full-width top bar on narrow ones.
 * Measured from the element rather than read from a custom property, because
 * getPropertyValue returns calc() expressions unresolved.
 */
function chromeOffset(): number {
	const nav = document.querySelector('nav.rail');
	if (!nav) return 26;
	const r = nav.getBoundingClientRect();
	const isTopBar = r.width >= document.documentElement.clientWidth - 1;
	return isTopBar ? Math.round(r.height) + 16 : 26;
}

export function scrollToId(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	const offset = chromeOffset();
	const lenis = window.__lenis;
	if (lenis) {
		lenis.scrollTo(el, { offset: -offset });
	} else {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
		window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
	}
}
