/** Pointer-tracked 3D tilt: writes --rx/--ry (deg) so CSS can compose
 *  perspective rotation with other transforms (skew, reveal translate). */
export function tilt(node: HTMLElement, params: { max?: number } = {}): { destroy(): void } {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduced) return { destroy: () => {} };

	const max = params.max ?? 6;
	let tx = 0;
	let ty = 0;
	let cx = 0;
	let cy = 0;

	const n = node as HTMLElement & { _tid?: number };
	const loop = () => {
		cx += (tx - cx) * 0.14;
		cy += (ty - cy) * 0.14;
		n.style.setProperty('--rx', `${cx.toFixed(2)}deg`);
		n.style.setProperty('--ry', `${cy.toFixed(2)}deg`);
		if (Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02) {
			n._tid = requestAnimationFrame(loop);
		} else {
			n._tid = 0;
		}
	};
	const kick = () => {
		if (!n._tid) n._tid = requestAnimationFrame(loop);
	};
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - 0.5;
		const py = (e.clientY - r.top) / r.height - 0.5;
		tx = -py * max * 2;
		ty = px * max * 2;
		kick();
	};
	const leave = () => {
		tx = 0;
		ty = 0;
		kick();
	};
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy: () => {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
			if (n._tid) cancelAnimationFrame(n._tid);
			n.style.removeProperty('--rx');
			n.style.removeProperty('--ry');
		}
	};
}
