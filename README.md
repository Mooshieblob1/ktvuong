<p align="center">
  <img src="static/favicon.svg" width="80" height="80" alt="KV Logo" />
</p>

<h1 align="center">Kent Vuong · Portfolio</h1>

<p align="center">
  Portfolio for Kent Vuong (a.k.a. Mooshieblob on GitHub), a creative AI toolmaker building
  generative-AI tools that artists actually enjoy using. Built with SvelteKit and Tailwind CSS,
  deployed on Cloudflare Pages.
</p>

## Features

- Responsive mobile-first design
- Mooshie Yellow branding on near-black, lifted from the MooshieUI design system.
  The accent is rationed: it marks things that are **interactive or live** (primary
  buttons, links, hover and active states, the scroll beam, packets moving through
  the node graph) and nothing else. Structural marks (HUD brackets, section
  indices, hairlines) use the neutral `--line` / `--line-strong` tokens.
- Fixed instrument rail on wide screens (numbered sections, live position and
  section readout), collapsing to a compact two-row top bar below 1080px.
  `--rail-w` and `--nav-offset` in `app.css` own that breakpoint; `scroll.ts`
  measures the rail rather than assuming a height.
- One shared `SectionHead` for every section: index, micro-label, rule and a
  live readout, so the page reads as a single instrument
- Cards are spec sheets: aligned label/value rows in mono with tabular numerals
- Compact hero with a hairline telemetry strip, so the work grid starts above the fold
- Animated ComfyUI node-graph canvas in the hero over a schematic blueprint field
- Résumé at `/resume`, built from the same tokens as the rest of the site: instrument
  stripes, hairline telemetry, glass panels and HUD brackets on screen, and a print
  stylesheet that folds the same DOM into a one-page A4 sheet for `Print or save as PDF`.
  Reachable from the rail (`05`), the palette, and `resume` in the terminal
- `ctrl+k` command palette (rofi) and a `ctrl+\`` terminal overlay
- Smooth scrolling via [Lenis](https://github.com/darkroomengineering/lenis) on Chromium, native CSS smooth scroll on Firefox
- Bento-style project showcase grid
- No em dashes anywhere in copy or comments
- Live "currently tinkering on" repo grid, pulled from the GitHub API
- Email obfuscation to prevent scraping by bots
- Cloudflare Web Analytics

## Tech Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Smooth Scroll**: Lenis (Chromium) / native CSS (Firefox)
- **Deployment**: Cloudflare Pages
- **Analytics**: Cloudflare Web Analytics

## Runtime Requirements

- Node.js `>= 22.14.0`
- pnpm `>= 10.32.1`

## Project Structure

```
ktvuong/
├── src/
│   ├── lib/components/    # Header, Footer, Hero, NodeGraph
│   ├── lib/data/          # Featured projects, skills, résumé, GitHub fetcher
│   ├── routes/
│   │   ├── +layout.svelte # Lenis init, global layout
│   │   ├── +page.svelte   # Main page (about, tools, repos, skills, contact)
│   │   └── resume/        # Résumé page, screen and print
│   ├── app.css            # Global styles, tool-window chrome, animations
│   └── app.html           # HTML template
├── static/
│   ├── favicon.svg        # KV gradient logo
│   ├── emailProtection.js # Email obfuscation script
│   └── site*img/          # Project thumbnails
├── svelte.config.js
├── vite.config.ts
└── package.json
```

## Contact Obfuscation

Email and phone are never published as text. `src/lib/data/contact.ts` holds them
as Cloudflare-style tokens (first byte is a random XOR key, rest is the value, all
hex) and decodes only on a user gesture:

- Nothing readable in the server-rendered HTML, so a crawler that reads markup
  gets nothing
- Nothing readable in the JS bundle either, so grepping it for an `@` or a phone
  number also comes up empty
- The résumé reveals both on `beforeprint`, so a printed or PDF copy still has a
  way to reply
- Window titles use `kv@arch:~/...` rather than a real address, so the decoration
  does not hand back what the tokens hide

Regenerate a token with `node encodeEmailForProtection.js "<value>"`. The unused
`static/emailProtection.js` predates this module.

## License

MIT

## Contact

Kent Vuong · [GitHub](https://github.com/Mooshieblob1) · [LinkedIn](https://www.linkedin.com/in/kentvuong88/)
