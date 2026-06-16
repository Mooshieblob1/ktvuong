export interface SkillGroup {
	title: string;
	icon: string;
	skills: string[];
}

/** Trimmed to what the repos actually demonstrate — not an aspirational list. */
export const skillGroups: SkillGroup[] = [
	{
		title: 'Frontend',
		icon: '◆',
		skills: ['Svelte', 'SvelteKit', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Nuxt.js']
	},
	{
		title: 'Systems & Desktop',
		icon: '◆',
		skills: ['Rust', 'Tauri', 'Cross-platform builds', 'Native APIs']
	},
	{
		title: 'AI / ML',
		icon: '◆',
		skills: ['ComfyUI', 'Stable Diffusion', 'NovelAI API', 'OCR & ML pipelines', 'Local LLM / TTS']
	},
	{
		title: 'Backend & Infra',
		icon: '◆',
		skills: ['Python', 'Node.js', 'Docker', 'Cloudflare', 'REST APIs']
	}
];
