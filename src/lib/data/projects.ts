export interface Project {
	title: string;
	tag: string;
	description: string;
	tech: string[];
	github: string;
	demo: string | null;
	/** owner/repo — used for the GitHub social-card image and to exclude from the live grid */
	og: string;
}

export const projects: Project[] = [
	{
		title: 'MooshieUI',
		tag: 'Flagship',
		description:
			'A beginner-friendly desktop frontend for ComfyUI, built with Tauri — text-to-image, img2img, inpainting, built-in upscaling and ControlNet behind a clean guided UI. One-click installer, no Python setup.',
		tech: ['Svelte', 'Tauri', 'Rust', 'TypeScript', 'Tailwind'],
		github: 'https://github.com/Mooshieblob1/MooshieUI',
		demo: null,
		og: 'Mooshieblob1/MooshieUI'
	},
	{
		title: 'koharu',
		tag: 'AI / ML',
		description:
			'An ML-powered manga translator written in Rust — text detection, OCR and translation pipelined into one fast native tool.',
		tech: ['Rust', 'Machine Learning', 'OCR'],
		github: 'https://github.com/Mooshieblob1/koharu',
		demo: null,
		og: 'Mooshieblob1/koharu'
	},
	{
		title: 'gpu.garden',
		tag: 'Web',
		description:
			'A SvelteKit frontend for a free shared GPU server for the TouhouAI community — image-generation tools and Notion-like notebooks.',
		tech: ['SvelteKit', 'Tailwind', 'AI Tools'],
		github: 'https://github.com/mchaker/gpugarden-site',
		demo: 'https://gpu.garden',
		og: 'mchaker/gpugarden-site'
	},
	{
		title: 'NAID Generator',
		tag: 'AI / ML',
		description:
			'A custom ComfyUI node that integrates NovelAI Diffusion via API key, expanding generation options directly inside the node graph.',
		tech: ['Python', 'ComfyUI', 'NovelAI', 'API'],
		github: 'https://github.com/Mooshieblob1/ComfyUI_NAIDGenerator',
		demo: null,
		og: 'Mooshieblob1/ComfyUI_NAIDGenerator'
	},
	{
		title: 'team-blob',
		tag: 'Web',
		description:
			'A fictional esports team site with interactive player profiles and match history — built for fun with SvelteKit on Cloudflare.',
		tech: ['SvelteKit', 'Tailwind', 'Cloudflare'],
		github: 'https://github.com/Mooshieblob1/team-blob',
		demo: 'https://team-blob.mooshieblob.com',
		og: 'Mooshieblob1/team-blob'
	},
	{
		title: 'mooshieblob.com',
		tag: 'Persona',
		description:
			'My alias profile showcasing AI projects and creative experiments — interactive demos under my online persona, mooshieblob.',
		tech: ['Nuxt.js', 'Tailwind', 'Cloudflare'],
		github: 'https://github.com/Mooshieblob1/mooshieblob1.github.io',
		demo: 'https://mooshieblob.com',
		og: 'Mooshieblob1/mooshieblob1.github.io'
	}
];

/** Full names (owner/repo) of featured projects — excluded from the live "working on" grid. */
export const featuredFullNames = projects.map((p) => p.og);
