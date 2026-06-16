<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const ACC = '#ffcc00';
		const ACC2 = '#ffe680';

		type Node = { id: string; nx: number; ny: number; label: string; sub: string; big?: boolean };
		const nodes: Node[] = [
			{ id: 'prompt', nx: 0.16, ny: 0.24, label: 'PROMPT', sub: 'clip encode' },
			{ id: 'model', nx: 0.16, ny: 0.76, label: 'MODEL', sub: 'checkpoint' },
			{ id: 'sampler', nx: 0.5, ny: 0.5, label: 'SAMPLER', sub: 'euler · 30', big: true },
			{ id: 'vae', nx: 0.83, ny: 0.27, label: 'VAE', sub: 'decode' },
			{ id: 'output', nx: 0.83, ny: 0.73, label: 'OUTPUT', sub: '1024²' }
		];
		const byId: Record<string, Node> = {};
		nodes.forEach((n) => (byId[n.id] = n));
		const edges = [
			['prompt', 'sampler'],
			['model', 'sampler'],
			['sampler', 'vae'],
			['sampler', 'output'],
			['vae', 'output']
		].map((e) => ({ a: byId[e[0]], b: byId[e[1]] }));

		let W = 0;
		let H = 0;
		const dims = () => {
			const r = canvas.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;
			W = r.width;
			H = r.height;
			canvas.width = Math.max(1, Math.round(W * dpr));
			canvas.height = Math.max(1, Math.round(H * dpr));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		dims();
		const onResize = () => dims();
		window.addEventListener('resize', onResize);

		const nodeW = () => Math.min(128, Math.max(92, W * 0.3));
		const ports = (n: Node) => {
			const cx = n.nx * W;
			const cy = n.ny * H;
			const hw = nodeW() / 2;
			return { cx, cy, lx: cx - hw, rx: cx + hw };
		};
		const ctrl = (a: Node, b: Node) => {
			const pa = ports(a);
			const pb = ports(b);
			const x0 = pa.rx;
			const y0 = pa.cy;
			const x1 = pb.lx;
			const y1 = pb.cy;
			const mx = (x0 + x1) / 2;
			return { x0, y0, c1x: mx, c1y: y0, c2x: mx, c2y: y1, x1, y1 };
		};
		const bez = (p0: number, p1: number, p2: number, p3: number, t: number) => {
			const m = 1 - t;
			return m * m * m * p0 + 3 * m * m * t * p1 + 3 * m * t * t * p2 + t * t * t * p3;
		};
		const rr = (x: number, y: number, w: number, h: number, r: number) => {
			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.arcTo(x + w, y, x + w, y + h, r);
			ctx.arcTo(x + w, y + h, x, y + h, r);
			ctx.arcTo(x, y + h, x, y, r);
			ctx.arcTo(x, y, x + w, y, r);
			ctx.closePath();
		};

		const pulses = edges.map((e, i) => ({ e, t: (i * 0.27) % 1, sp: 0.2 + Math.random() * 0.12 }));

		const drawNode = (n: Node, active: boolean) => {
			const p = ports(n);
			const w = nodeW();
			const h = n.big ? 52 : 42;
			const x = p.cx - w / 2;
			const y = p.cy - h / 2;
			ctx.save();
			if (active) {
				ctx.shadowColor = 'rgba(255,204,0,0.45)';
				ctx.shadowBlur = 16;
			}
			rr(x, y, w, h, 9);
			ctx.fillStyle = 'rgba(255,255,255,0.045)';
			ctx.fill();
			ctx.restore();
			rr(x, y, w, h, 9);
			ctx.lineWidth = 1;
			ctx.strokeStyle = active ? ACC : 'rgba(255,255,255,0.14)';
			ctx.stroke();
			[
				[p.lx, p.cy],
				[p.rx, p.cy]
			].forEach((pt) => {
				ctx.beginPath();
				ctx.arc(pt[0], pt[1], 3, 0, 7);
				ctx.fillStyle = active ? ACC : 'rgba(255,255,255,0.3)';
				ctx.fill();
			});
			ctx.textAlign = 'center';
			ctx.fillStyle = active ? ACC2 : 'rgba(245,245,245,0.92)';
			ctx.font = '600 10px ui-monospace, SFMono-Regular, Menlo, monospace';
			ctx.fillText(n.label, p.cx, p.cy - 1);
			ctx.fillStyle = 'rgba(163,163,163,0.7)';
			ctx.font = '9px ui-monospace, SFMono-Regular, Menlo, monospace';
			ctx.fillText(n.sub, p.cx, p.cy + 12);
		};
		const grid = () => {
			ctx.fillStyle = 'rgba(255,255,255,0.05)';
			const g = 22;
			for (let x = g; x < W; x += g)
				for (let y = g; y < H; y += g) {
					ctx.beginPath();
					ctx.arc(x, y, 0.8, 0, 7);
					ctx.fill();
				}
		};

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let activeIdx = 2;
		const draw = (dt: number, now: number) => {
			ctx.clearRect(0, 0, W, H);
			grid();
			edges.forEach((e) => {
				const c = ctrl(e.a, e.b);
				ctx.beginPath();
				ctx.moveTo(c.x0, c.y0);
				ctx.bezierCurveTo(c.c1x, c.c1y, c.c2x, c.c2y, c.x1, c.y1);
				ctx.strokeStyle = 'rgba(255,255,255,0.10)';
				ctx.lineWidth = 1.4;
				ctx.stroke();
			});
			pulses.forEach((pl) => {
				if (!reduced) {
					pl.t += dt * pl.sp;
					if (pl.t > 1) pl.t -= 1;
				}
				const c = ctrl(pl.e.a, pl.e.b);
				const x = bez(c.x0, c.c1x, c.c2x, c.x1, pl.t);
				const y = bez(c.y0, c.c1y, c.c2y, c.y1, pl.t);
				const grd = ctx.createRadialGradient(x, y, 0, x, y, 7);
				grd.addColorStop(0, 'rgba(255,214,77,0.95)');
				grd.addColorStop(1, 'rgba(255,204,0,0)');
				ctx.fillStyle = grd;
				ctx.beginPath();
				ctx.arc(x, y, 7, 0, 7);
				ctx.fill();
				ctx.fillStyle = ACC;
				ctx.beginPath();
				ctx.arc(x, y, 2, 0, 7);
				ctx.fill();
			});
			if (!reduced) activeIdx = Math.floor(now / 1300) % nodes.length;
			nodes.forEach((n, i) => drawNode(n, i === activeIdx));
		};

		draw(0, performance.now());
		let raf = 0;
		if (!reduced) {
			let last = performance.now();
			const loop = (now: number) => {
				const dt = Math.min(0.05, (now - last) / 1000);
				last = now;
				draw(dt, now);
				raf = requestAnimationFrame(loop);
			};
			raf = requestAnimationFrame(loop);
		}

		return () => {
			window.removeEventListener('resize', onResize);
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<div class="frame">
	<div class="bar">
		<span class="d red"></span>
		<span class="d yellow"></span>
		<span class="d green"></span>
		<span class="title">render — generation graph</span>
		<span class="live"><span class="ldot"></span>live</span>
	</div>
	<div class="stage">
		<canvas bind:this={canvas}></canvas>
	</div>
	<div class="foot">
		<span>node-graph · canvas / raf</span>
		<span class="loc">
			<svg
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="var(--accent-500)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" /><circle
					cx="12"
					cy="10"
					r="3"
				/></svg
			>
			Perth, WA
		</span>
	</div>
</div>

<style>
	.frame {
		border-radius: var(--radius-xl);
		overflow: hidden;
		border: 1px solid var(--border-700);
		background: var(--surface-900);
		box-shadow: var(--shadow-panel);
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 9px 12px;
		border-bottom: 1px solid color-mix(in srgb, var(--border-700) 60%, transparent);
	}
	.d {
		width: 9px;
		height: 9px;
		border-radius: 50%;
	}
	.red {
		background: var(--danger-hover);
	}
	.yellow {
		background: var(--warning);
	}
	.green {
		background: var(--success);
	}
	.title {
		margin-left: 6px;
		font-family: var(--font-mono);
		font-size: var(--text-10);
		color: var(--text-subtle);
	}
	.live {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: var(--text-10);
		color: var(--text-subtle);
	}
	.ldot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--success);
		box-shadow: 0 0 6px var(--success);
	}
	.stage {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 10;
		background: radial-gradient(
			120% 100% at 50% 0%,
			color-mix(in srgb, var(--accent-500) 7%, transparent),
			transparent 62%
		);
	}
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
	}
	.foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 9px 12px;
		border-top: 1px solid color-mix(in srgb, var(--border-700) 60%, transparent);
		font-family: var(--font-mono);
		font-size: var(--text-10);
		color: var(--text-subtle);
	}
	.loc {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
</style>
