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
 *  --vy CSS var and settles back when scrolling stops — reads as momentum
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
export function parallax(node: HTMLElement, params: { speed?: number } = {}): { destroy(): void } {
	const speed = params.speed ?? 0.1;
	let ticking = false;
	const update = () => {
		ticking = false;
		const p = node.parentElement;
		if (!p) return;
		const r = p.getBoundingClientRect();
		const d = r.top + r.height / 2 - window.innerHeight / 2;
		node.style.transform = `translate3d(0, ${(-d * speed).toFixed(1)}px, 0)`;
	};
	const onScroll = () => {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(update);
		}
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	update();
	return {
		destroy: () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		}
	};
}

/** Word-by-word brighten: words start dim, light up as the block scrolls through
 *  the viewport (above-fold elements play a timed sweep on mount instead). */
export function wordReveal(node: HTMLElement): { destroy(): void } {
	const text = (node.textContent ?? '').replace(/\s+/g, ' ').trim();
	if (!text) return { destroy: () => {} };
	node.setAttribute('aria-label', text);
	node.textContent = '';
	const spans: HTMLSpanElement[] = [];
	for (const word of text.split(' ')) {
		const s = document.createElement('span');
		s.textContent = word;
		s.className = 'w';
		s.setAttribute('aria-hidden', 'true');
		spans.push(s);
		node.append(s, ' ');
	}

	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let sweep = 0;
	let listening = false;

	const paint = (p: number) => {
		const n = spans.length;
		for (let i = 0; i < n; i++) spans[i].classList.toggle('on', (i + 0.6) / n <= p);
	};

	const update = () => {
		const r = node.getBoundingClientRect();
		const vh = window.innerHeight;
		const start = vh * 0.9;
		const end = vh * 0.5;
		const p = reduced ? 1 : clamp((start - r.top) / (start - end), 0, 1);
		paint(Math.max(p, sweep));
		if (Math.max(p, sweep) >= 1) {
			window.removeEventListener('scroll', onScroll);
			listening = false;
		}
	};
	const onScroll = () => requestAnimationFrame(update);

	if (!reduced && node.getBoundingClientRect().top < window.innerHeight) {
		// Above the fold: timed sweep so it reads as a decode-in on load.
		const t0 = performance.now();
		const tw = (now: number) => {
			sweep = Math.min(1, (now - t0) / 1300);
			paint(sweep);
			if (sweep < 1) requestAnimationFrame(tw);
		};
		requestAnimationFrame(tw);
	} else {
		listening = true;
		window.addEventListener('scroll', onScroll, { passive: true });
		update();
	}
	return {
		destroy: () => {
			if (listening) window.removeEventListener('scroll', onScroll);
		}
	};
}
