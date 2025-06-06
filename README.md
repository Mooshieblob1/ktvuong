# Personal Portfolio

A modern, responsive portfolio website built with Svelte and Tailwind CSS.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Clean, modern UI with smooth animations
- Project showcase with detailed cards
- Technical skills visualization
- Email obfuscation to prevent scraping by bots
- Fast performance and accessibility features
- Dark mode support
- SEO optimized

## Tech Stack

- **Frontend Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Email Protection**: Custom obfuscation system
- **Deployment**: Cloudflare Pages
- **Analytics**: Cloudflare Web Analytics

## Key Implementation Details

### Email Obfuscation

The site implements a custom email obfuscation system to protect against email harvesting bots:
- Uses XOR cipher to encode email address in the HTML
- Client-side JavaScript decodes the email only when needed
- No plain text email addresses in source code or DOM
- Works with both header icon and contact button

### Project Showcase

The portfolio includes a showcase of projects with:
- Visual thumbnails
- Project descriptions
- Technology tags
- Direct links to live sites

### Responsive Design

- Mobile-first approach
- Optimized layouts for various screen sizes
- Maintains clean aesthetics across devices

## Project Structure

```
portfolio/
├── static/              # Static assets
│   └── emailProtection.js  # Email protection script
├── src/
│   ├── components/      # Reusable UI components
│   ├── data/            # Project and skills data
│   ├── lib/             # Utility functions
│   ├── routes/          # Page routes
│   ├── app.css          # Global styles
│   ├── app.html         # HTML template
│   └── main.js          # Entry point
├── .gitignore
├── package.json
├── README.md
├── svelte.config.js
└── vite.config.js
```

Note: This project does not include a `tailwind.config.js`; the default Tailwind CSS configuration is used.

## Customization

### Adding Projects

To add a new project, edit the projects array:

```javascript
const projects = [
    {
       title: 'Project Name',
       description: 'Description of the project',
       image: '/path/to/image.jpg',
       tags: ['Tag1', 'Tag2', 'Tag3'],
       link: 'https://project-link.com'
    }
    // Add more projects here
];
```

### Updating Skills

The skills section can be customized by editing the skills list:

```javascript
<ul class="skills flex flex-wrap gap-2">
    <li class="bg-amber-200 text-sm px-3 py-2 rounded-md">JavaScript</li>
    <li class="bg-amber-200 text-sm px-3 py-2 rounded-md">TypeScript</li>
    <!-- Add more skills here -->
</ul>
```

## License

MIT

## Contact

Kent Vuong - Contact information available on the website

Project Link: [https://github.com/Mooshieblob1/ktvuong](https://github.com/Mooshieblob1/ktvuong)