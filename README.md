<p align="center">
  <img src="static/favicon.svg" width="80" height="80" alt="KV Logo" />
</p>

<h1 align="center">Kent Vuong — Portfolio</h1>

<p align="center">
  A modern, responsive portfolio website built with SvelteKit and Tailwind CSS, deployed on Cloudflare Pages.
</p>

## Features

- Responsive mobile-first design
- Custom KV gradient logo and branded gradient text
- Animated drifting gradient orbs in the hero section
- Smooth scrolling via [Lenis](https://github.com/darkroomengineering/lenis) on Chromium, native CSS smooth scroll on Firefox
- Project showcase with swipeable carousel
- Technical skills visualization with categorized progress bars
- Email obfuscation to prevent scraping by bots
- Cloudflare Web Analytics

## Tech Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Smooth Scroll**: Lenis (Chromium) / native CSS (Firefox)
- **Deployment**: Cloudflare Pages
- **Analytics**: Cloudflare Web Analytics

## Runtime Requirements

- Node.js `>= 20.19.0`
- pnpm `>= 10.32.1`

## Project Structure

```
ktvuong/
├── src/
│   ├── lib/components/    # Header, Footer, Hero
│   ├── routes/
│   │   ├── +layout.svelte # Lenis init, global layout
│   │   └── +page.svelte   # Main page (about, projects, skills, contact)
│   ├── app.css            # Global styles, gradient text, orb animations
│   └── app.html           # HTML template
├── static/
│   ├── favicon.svg        # KV gradient logo
│   ├── emailProtection.js # Email obfuscation script
│   └── site*img/          # Project thumbnails
├── svelte.config.js
├── vite.config.js
└── package.json
```

## Email Obfuscation

The site uses a custom email obfuscation system to protect against harvesting bots:

- XOR cipher encodes the email address in HTML
- Client-side JavaScript decodes it only when needed
- No plain text email addresses in source code or DOM

## License

MIT

## Contact

Kent Vuong — [GitHub](https://github.com/Mooshieblob1) · [LinkedIn](https://www.linkedin.com/in/kentvuong88/)
