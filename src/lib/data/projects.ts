export interface Project {
	title: string;
	tag: string;
	/** Snapshot star count, shown as social proof on the flagship. */
	stars?: number;
	description: string;
	tech: string[];
	github: string;
	demo: string | null;
	/** owner/repo, used for the GitHub social-card image and to exclude from the live grid */
	og: string;
}

export const projects: Project[] = [
	{
		title: 'MooshieUI',
		tag: 'Flagship',
		stars: 180,
		description:
			'A beginner-friendly desktop frontend for ComfyUI, built with Tauri. Text-to-image, img2img, inpainting, built-in upscaling and ControlNet behind a clean guided UI. One-click installer: no Python, no terminal.',
		tech: ['Svelte', 'Tauri', 'Rust', 'TypeScript', 'Tailwind'],
		github: 'https://github.com/Mooshieblob1/MooshieUI',
		demo: null,
		og: 'Mooshieblob1/MooshieUI'
	},
	{
		title: 'MooshieTiledDiffusion',
		tag: 'ComfyUI node',
		description:
			'MultiDiffusion and SpotDiffusion tiled diffusion nodes for ComfyUI, with Anima (COSMOS) support, for big-image generation on modest GPUs. Standalone export from MooshieUI.',
		tech: ['Python', 'ComfyUI', 'Diffusion'],
		github: 'https://github.com/Mooshieblob1/ComfyUI-MooshieTiledDiffusion',
		demo: null,
		og: 'Mooshieblob1/ComfyUI-MooshieTiledDiffusion'
	},
	{
		title: 'The ComfyUI Guide',
		tag: 'Education',
		description:
			'A comprehensive tutorial site for ComfyUI. Learn AI art creation, explore workflows and pick up community tips, written for people picking up image generation for the first time.',
		tech: ['SvelteKit', 'Tailwind', 'MDsveX'],
		github: 'https://github.com/Mooshieblob1/comfyui-site.github.io',
		demo: 'https://comfytut.mooshieblob.com',
		og: 'Mooshieblob1/comfyui-site.github.io'
	},
	{
		title: 'Anima Style Library',
		tag: 'Style research',
		stars: 9,
		description:
			'A visual reference library of artist styles for the Anima image model. Browse, compare and copy style recipes so artists spend time creating instead of wrangling tags.',
		tech: ['Svelte', 'Danbooru tags', 'Anima'],
		github: 'https://github.com/Mooshieblob1/mooshie-anima-styles',
		demo: null,
		og: 'Mooshieblob1/mooshie-anima-styles'
	},
	{
		title: 'NAID Generator',
		tag: 'Contribution',
		description:
			'A custom ComfyUI node that integrates NovelAI Diffusion via API key, expanding generation options directly inside the node graph.',
		tech: ['Python', 'ComfyUI', 'NovelAI', 'API'],
		github: 'https://github.com/Mooshieblob1/ComfyUI_NAIDGenerator',
		demo: null,
		og: 'Mooshieblob1/ComfyUI_NAIDGenerator'
	},
	{
		title: 'gpu.garden',
		tag: 'Community',
		description:
			'A SvelteKit frontend for a free shared GPU server for the TouhouAI community, with image-generation tools and Notion-like notebooks for creators. No setup required.',
		tech: ['SvelteKit', 'Tailwind', 'AI Tools'],
		github: 'https://github.com/mchaker/gpugarden-site',
		demo: 'https://gpu.garden',
		og: 'mchaker/gpugarden-site'
	},
	{
		title: 'mooshieblob.com',
		tag: 'Creative lab',
		description:
			'My alias profile showcasing AI projects and creative experiments. Interactive demos under my online persona, mooshieblob.',
		tech: ['Nuxt.js', 'Tailwind', 'Cloudflare'],
		github: 'https://github.com/Mooshieblob1/mooshieblob1.github.io',
		demo: 'https://mooshieblob.com',
		og: 'Mooshieblob1/mooshieblob1.github.io'
	}
];

/** Full names (owner/repo) of featured projects, excluded from the live "working on" grid. */
export const featuredFullNames = projects.map((p) => p.og);
