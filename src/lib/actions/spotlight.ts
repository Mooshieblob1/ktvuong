/** Pointer-tracked spotlight: writes --mx/--my (px, relative to the node) so CSS
 *  can render a radial glow that follows the cursor. */
export function spotlight(node: HTMLElement): { destroy(): void } {
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${e.clientX - r.left}px`);
		node.style.setProperty('--my', `${e.clientY - r.top}px`);
	};
	node.addEventListener('pointermove', move);
	return {
		destroy: () => node.removeEventListener('pointermove', move)
	};
}
