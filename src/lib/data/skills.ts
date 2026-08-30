export interface SkillGroup {
	title: string;
	icon: string;
	skills: string[];
}

/** Trimmed to what the repos actually demonstrate, not an aspirational list. */
export const skillGroups: SkillGroup[] = [
	{
		title: 'Generative AI',
		icon: '◆',
		skills: ['ComfyUI', 'Stable Diffusion', 'Flux', 'NovelAI API', 'ControlNet', 'Tiled diffusion']
	},
	{
		title: 'Tool & App Building',
		icon: '◆',
		skills: ['Svelte', 'SvelteKit', 'TypeScript', 'Tauri', 'Rust', 'Tailwind CSS']
	},
	{
		title: 'ML Pipelines',
		icon: '◆',
		skills: ['Python', 'OCR & captioning (WD14)', 'Model workflows', 'Local LLM / TTS']
	},
	{
		title: 'Web & Deploy',
		icon: '◆',
		skills: ['Node.js', 'Cloudflare', 'REST APIs', 'Nuxt.js']
	}
];
