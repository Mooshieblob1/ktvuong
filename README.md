# Personal Portfolio

A modern, responsive portfolio website built with Svelte and Tailwind CSS.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Project showcase with filterable cards
- Skills and expertise section
- Contact form for inquiries
- Fast performance and accessibility features

## Tech Stack

- **Frontend Framework**: Svelte
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
portfolio/
├── public/              # Static assets
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
├── tailwind.config.js
└── vite.config.js
```

## Customization

### Adding Projects

To add a new project, edit the `src/data/projects.js` file:

```javascript
export const projects = [
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

Edit the `src/data/skills.js` file to update your skills:

```javascript
export const skills = [
	{
		category: 'Frontend',
		items: ['Svelte', 'React', 'Vue.js', 'Tailwind CSS', 'JavaScript']
	}
	// Add more skill categories
];
```

## Deployment

This project is deployed using Cloudflare Pages.

### Cloudflare Pages Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Cloudflare Pages
3. Set the build command to `npm run build` or `yarn build`
4. Set the build output directory to `dist`
5. Deploy

### Alternative Deployment Options

The project can also be deployed on other platforms like Vercel or Netlify using similar steps.

## License

MIT

## Contact

Kent Vuong - [kent@ktvuong.com](mailto:kent@ktvuong.com)

Project Link: [https://github.com/Mooshieblob1/portfolio](https://github.com/Mooshieblob1/portfolio)
