/** Scroll-linked effects: parallax depth, velocity skew, word-by-word reveal.
 *  All rAF-throttled, passive listeners, cleaned up on destroy. */

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/* --- Shared scroll-velocity tracker (one listener, many consumers) ------- */
type Sub = (v: number) => void;
const subs = new Set<Sub>();
let lastY = 0;
let vel = 0;
let loopId = 0;

function onWheelDelta() {
	const y = window.scrollY;
	vel += y - lastY;
	lastY = y;
	if (!loopId && subs.size) loopId = requestAnimationFrame(loop);
}
if (typeof window !== 'undefined') {
	window.addEventListener('scroll', onWheelDelta, { passive: true });
}
/* Runs only while there is momentum to settle: a scroll wakes it, and it
   parks itself once the velocity has decayed to rest, so an idle page does
   no per-frame work at all. */
function loop() {
	vel *= 0.86;
	if (Math.abs(vel) < 0.05) vel = 0;
	subs.forEach((fn) => fn(vel));
	loopId = vel === 0 ? 0 : requestAnimationFrame(loop);
}

/** Velocity-reactive drift: the element trails the scroll slightly and
 *  settles back when scrolling stops, reading as momentum without shearing
 *  the layout. Written to the standalone `translate` property, which stacks
 *  with any transform the element already has (tilt, reveal) and, unlike an
 *  inherited custom property, restyles only this element, not its subtree. */
export function drift(
	node: HTMLElement,
	params: { max?: number; mult?: number } = {}
): { destroy(): void } {
	const max = params.max ?? 8;
	const mult = params.mult ?? 0.05;
	let last = '';
	const fn = (v: number) => {
		const d = `${clamp(v * mult, -max, max).toFixed(1)}px`;
		if (d === last) return;
		last = d;
		node.style.translate = `0 ${d}`;
	};
	if (subs.size === 0) {
		/* First consumer: drop whatever momentum built up with nobody listening. */
		lastY = window.scrollY;
		vel = 0;
	}
	subs.add(fn);
	return {
		destroy() {
			subs.delete(fn);
			if (subs.size === 0 && loopId) {
				cancelAnimationFrame(loopId);
				loopId = 0;
				node.style.removeProperty('translate');
			}
		}
	};
}

/** Parallax: element drifts at `speed`× scroll relative to its parent's viewport position. */
