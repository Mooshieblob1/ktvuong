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
}
if (typeof window !== 'undefined') {
	window.addEventListener('scroll', onWheelDelta, { passive: true });
}
function loop() {
	vel *= 0.86;
	if (Math.abs(vel) < 0.05) vel = 0;
	subs.forEach((fn) => fn(vel));
	loopId = requestAnimationFrame(loop);
}

/** Velocity-reactive drift: the element trails the scroll slightly via the
 *  --vy CSS var and settles back when scrolling stops, reading as momentum
 *  without shearing the layout. */
export function drift(
	node: HTMLElement,
	params: { max?: number; mult?: number } = {}
): { destroy(): void } {
	const max = params.max ?? 8;
	const mult = params.mult ?? 0.05;
	const fn = (v: number) => {
		const d = clamp(v * mult, -max, max);
		node.style.setProperty('--vy', `${d.toFixed(1)}px`);
	};
	subs.add(fn);
	lastY = window.scrollY;
	if (!loopId) loopId = requestAnimationFrame(loop);
	return {
		destroy() {
			subs.delete(fn);
			if (subs.size === 0 && loopId) {
				cancelAnimationFrame(loopId);
				loopId = 0;
				node.style.removeProperty('--vy');
			}
		}
	};
}

/** Parallax: element drifts at `speed`× scroll relative to its parent's viewport position. */
