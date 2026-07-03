# Full-screen hero redesign — design doc

**Date:** 2026-07-03
**Status:** Approved (pending final spec review)
**Component of change:** `src/lib/components/Hero.svelte`, `src/lib/components/Header.svelte`, `src/app.css`

## Goal

Adapt the structural and motion ideas from a SaaS "Power AI" landing-page spec into
Kent Vuong's SvelteKit portfolio, **keeping the existing MooshieUI brand** (near-black
dark, Mooshie Yellow `#ffcc00`, Hanken Grotesk). Borrow the spec's composition — a
full-screen centered hero, a soft blur shape, a giant gradient-clipped headline, a
liquid-glass tech marquee — but drop the parts that are SaaS-specific or that don't fit
the personal-portfolio content.

## Decisions (locked with the user)

1. **Visual identity:** Keep MooshieUI (Mooshie Yellow + Hanken Grotesk, near-black).
   Do **not** adopt the spec's blue-purple bg / Geist / General Sans / indigo-purple-amber
   gradient. Structure and motion are borrowed; palette and type stay on-brand.
2. **Backdrop:** No background video. Build a CSS animated aurora backdrop (yellow-on-black
   drifting glows) plus the spec's soft blur shape. The spec's video + JS `requestAnimationFrame`
   fade loop is **dropped** (it was video-specific). Reduced-motion must pause animation.
3. **Marquee:** A tech-stack marquee ("Built with the tools I reach for"), not a
   SaaS-customer logo strip. Reuse the exact liquid-glass tile + infinite-scroll design.
4. **Navbar:** Keep the existing global `Header.svelte` (real links + GitHub). Do **not**
   add a second navbar. Restyle the Header with the spec's touches: transparent over the
   hero + a gradient divider line. One nav, sitewide.
5. **Headline:** "Kent **Vuong**" — name-forward, with "Vuong" in the yellow gradient.
   Subtitle carries the existing hero copy.
6. **Composition:** Approach A — full replacement of the current split (NodeGraph + terminal)
   hero with a single-column centered full-screen hero. The aurora backdrop makes the
   NodeGraph/terminal redundant, so they are removed from the hero.
7. **CTAs:** Keep **both** existing CTAs — "View my work" (primary → `#work`) and
   "Get in touch" (secondary → `#contact`) — rendered as rounded pill buttons.
8. **Status pill:** Include the existing `StatusDot` "Available for work" pill in the eyebrow.

## Non-goals

- No change to the sections below the hero (`FeaturedProjects`, `RepoGrid`, `Skills`,
  `Contact`) beyond what the Header restyle implies.
- No new fonts, no new color system, no external video/CDN dependency.
- No new dependencies. Everything is CSS + Svelte 5 + existing design tokens.
- Not a literal port of the spec's Tailwind utility classes — the codebase writes
  components in **scoped `<style>` blocks using CSS custom-property tokens**, and this
  work follows that existing convention (the `.liquid-glass` utility is the one global
  exception, since the spec defines it as a reusable utility class).

## Architecture / composition

The hero is a `min-h-screen` flex column with three stacked concerns:

```
<section id="about" class="hero">        min-height:100vh; display:flex; flex-direction:column
  ├─ .backdrop (aria-hidden, pointer-events:none, absolute inset:0, z-index:0, overflow:hidden)
  │    ├─ .aurora        drifting radial-gradient glows (Mooshie Yellow on near-black)
  │    └─ .blur-shape    984×527 soft dark rectangle, blur(82px), centered
  ├─ .content (position:relative; z-index:10; flex:1; centered)
  │    ├─ eyebrow  → StatusDot "Available for work" + "Full-stack · DevOps · AI tooling"
  │    ├─ h1       → "Kent " + <span class="grad">Vuong</span>
  │    ├─ .lead    → existing subtitle copy
  │    └─ .cta     → Button "View my work" (primary) + "Get in touch" (secondary)
  └─ .marquee (position:relative; z-index:10; padding-bottom)
       ├─ .marquee-label   "Built with / the tools I reach for"
       └─ .marquee-track   infinite translateX(0 → -50%) scroll, list duplicated
```

Rather than the spec's `overflow: visible` section, the `.backdrop` layer clips its own
children (`overflow: hidden`). Because the hero is full-viewport and the blur shape is
centered, clipping at the backdrop bounds is visually invisible, and it guarantees the
oversized aurora / blur never force horizontal page scroll on mobile. The global `Header`
is fixed above this section (unchanged structure).

### Backdrop

- **Aurora:** 2–3 layered `radial-gradient` glows in `--accent-500` at low alpha over
  `var(--bg)` (`#0a0a0a`). Animated with a slow (~24s) CSS `@keyframes` drift (transform /
  background-position). `pointer-events: none`, `aria-hidden`. Paused entirely under
  `@media (prefers-reduced-motion: reduce)` — falls back to a static glow.
- **Blur shape:** one element, `width:984px; height:527px; opacity:~0.9;`
  `background: var(--surface-950)` (near-black), `filter: blur(82px)`, absolutely centered
  via `top:50%; left:50%; transform:translate(-50%,-50%)`. Sits above aurora, below content.
  Widths use `max-width` / clamped sizing so it doesn't force horizontal scroll on mobile.

### Header restyle (`Header.svelte`)

- Keep the component, its links (`About / Work / Repositories / Skills / Contact`), the KV
  brand tile, and the GitHub icon.
- Change the background from the current translucent surface to fully transparent (or a
  much lighter wash) so it reads as "over the hero."
- Add a **gradient divider** at the bottom edge: a 1px line
  `linear-gradient(to right, transparent, color-mix(in srgb, var(--text) 20%, transparent), transparent)`
  replacing the current solid `border-bottom`.
- No layout/JS changes; purely stylistic. Verify legibility over the aurora.

### Hero content

- **Eyebrow:** existing `StatusDot` (`status="online"`, `pulse`, `label="Available for work"`)
  alongside the "Full-stack · DevOps · AI tooling" tag text, in a muted mono/eyebrow style
  consistent with the current design.
- **Headline `h1`:** "Kent " as plain `--text-strong`, then `Vuong` in a `.grad` span.
  - Font: `var(--font-sans)` (Hanken Grotesk).
  - Size: **responsive** `clamp(2.75rem, 12vw, 200px)` — the literal 220px from the spec
    overflows the longer "Kent Vuong" on narrow screens; clamp preserves the giant-on-desktop
    impact while staying safe on mobile.
  - `line-height: 1.02; letter-spacing: -0.024em; font-weight: 400` per spec proportions.
  - `.grad`: `background-image: linear-gradient(to left, #cc9900, #ffcc00, #ffe680);`
    `background-clip: text; -webkit-background-clip: text; color: transparent;`
    (yellow ramp — the on-brand replacement for the spec's indigo→purple→amber).
- **Subtitle `.lead`:** "I build fast, practical software — from desktop AI tools to web
  apps and the infrastructure under them." `font-size: var(--text-lg)`, `color:
var(--text-muted)`, constrained width (~`38ch`/`max-w-md`), slightly reduced opacity.
- **CTAs:** existing `Button` component. "View my work" → `scrollToId('work')` (primary),
  "Get in touch" → `scrollToId('contact')` (secondary). Rendered with pill radius
  (`border-radius: var(--radius-full)`) to echo the spec's rounded buttons; use `size="lg"`.

### Tech-stack marquee

- Container `max-width: ~64rem; margin: 0 auto` with generous bottom padding.
- **Label (left, static):** "Built with" / "the tools I reach for" in `--text-subtle`,
  `text-sm`. Two lines.
- **Track (right):** a flex row of tech items, **duplicated once** for a seamless loop,
  animated `@keyframes marquee { from { transform: translateX(0) } to { transform:
translateX(-50%) } }` at `~25s linear infinite`. `gap` ~`4rem` between items.
- **Item:** a `.liquid-glass` `24×24` `rounded-lg` tile showing the tech's first letter,
  followed by the tech name (`font-weight: 600`, `--text` / `--text-strong`).
- **Tech list (accurate to the repos, from `skills.ts`):** Svelte, SvelteKit, TypeScript,
  Rust, Tauri, Python, Docker, Cloudflare, Tailwind CSS.
- Fade masks on the left/right edges of the track (`mask-image` linear-gradient) so items
  enter/exit softly. Under `prefers-reduced-motion: reduce` the scroll animation is disabled
  and the track is clipped by its container (`overflow: hidden`) — showing a static, single
  set of items with no horizontal page scroll (no auto-scroll, no user horizontal scroll).

### Global CSS additions (`app.css`)

- `.liquid-glass` utility + `.liquid-glass::before` gradient-border, **exactly** per the
  spec (the one literal lift, since it's defined as a reusable utility):
  ```css
  .liquid-glass {
  	background: rgba(255, 255, 255, 0.01);
  	background-blend-mode: luminosity;
  	backdrop-filter: blur(4px);
  	border: none;
  	box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  	position: relative;
  	overflow: hidden;
  }
  .liquid-glass::before {
  	content: '';
  	position: absolute;
  	inset: 0;
  	border-radius: inherit;
  	padding: 1.4px;
  	background: linear-gradient(
  		180deg,
  		rgba(255, 255, 255, 0.45) 0%,
  		rgba(255, 255, 255, 0.15) 20%,
  		rgba(255, 255, 255, 0) 40%,
  		rgba(255, 255, 255, 0) 60%,
  		rgba(255, 255, 255, 0.15) 80%,
  		rgba(255, 255, 255, 0.45) 100%
  	);
  	-webkit-mask:
  		linear-gradient(#fff 0 0) content-box,
  		linear-gradient(#fff 0 0);
  	-webkit-mask-composite: xor;
  	mask-composite: exclude;
  	pointer-events: none;
  }
  ```
- `@keyframes marquee` (translateX 0 → -50%).
- `@keyframes` for the aurora drift.
- All new animations respect the existing `@media (prefers-reduced-motion: reduce)` block.

## Accessibility & performance

- Backdrop + blur + marquee are `aria-hidden` / decorative and `pointer-events: none`.
- All motion (aurora, marquee) pauses under `prefers-reduced-motion: reduce`.
- No layout that forces horizontal page scroll: the 984px blur shape and marquee track are
  contained/clipped so `body` never scrolls sideways on mobile.
- No external requests, no new fonts, no JS animation loop — pure CSS keeps it cheap and
  avoids the spec's `requestAnimationFrame` cost.
- Headline color contrast: the `.grad` yellow ramp on near-black passes AA at large text size.

## Testing / verification

- `pnpm check` (svelte-check + types) passes.
- `pnpm lint` (prettier + eslint) passes.
- Manual: `pnpm dev` — hero fills viewport, headline gradient renders, blur shape not
  clipped, marquee loops seamlessly, Header divider gradient visible, CTAs scroll to the
  right sections, no horizontal scrollbar at 375px width, reduced-motion stops animation.

## Files touched

| File                                                              | Change                                                                      |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `src/lib/components/Hero.svelte`                                  | Full rewrite: full-screen centered hero, backdrop, headline, CTAs, marquee. |
| `src/lib/components/Header.svelte`                                | Transparent-over-hero + gradient divider (style-only).                      |
| `src/app.css`                                                     | Add `.liquid-glass`, `@keyframes marquee`, aurora keyframes.                |
| `docs/superpowers/specs/2026-07-03-video-hero-redesign-design.md` | This doc.                                                                   |

```

```
