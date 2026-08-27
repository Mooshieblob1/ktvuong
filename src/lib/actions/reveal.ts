/** Reveal-on-scroll: fades/rises the element in the first time it enters the viewport. */
export function reveal(node: HTMLElement, params: { delay?: number } = {}): { destroy(): void } {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduced) {
		node.classList.add('in');
		return { destroy: () => {} };
	}
	node.classList.add('reveal');
	if (params.delay) node.style.setProperty('--reveal-delay', `${params.delay}ms`);
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.1 }
	);
	io.observe(node);
	return {
		destroy: () => io.disconnect()
	};
}
