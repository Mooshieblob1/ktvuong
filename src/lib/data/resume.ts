/**
 * Resume content, kept as data so the page can render it as an instrument
 * panel on screen and as a plain A4 sheet on print from one DOM.
 */

export interface ResumeEntry {
	org: string;
	role: string;
	/** Rendered in mono, right aligned, like every other readout on the site. */
	period: string;
	points: string[];
}

export interface ResumeSkillGroup {
	label: string;
	items: string[];
}

export interface ResumeProject {
	name: string;
	/** Short mono note: a domain, or how the work came about. */
	meta: string;
	blurb: string;
	href?: string;
}

export const role = 'Frontend & Desktop Engineer';

export const summary =
	'Frontend and desktop engineer specializing in high-performance applications built with Rust, Tauri, TypeScript and Svelte 5. Architects intuitive interfaces over complex backend systems, including local AI model inference and automated environment management. Delivers features end to end, taking ownership from ambiguous requirement through to shipped, maintainable code. Combines product-focused frontend development with a professional background in enterprise IT operations and network diagnostics.';

/** Hairline telemetry strip under the name, same shape as the hero's. */
export const facts = [
	{ label: 'based in', value: 'Perth, WA' },
	{ label: 'focus', value: 'Frontend / desktop' },
	{ label: 'status', value: 'Open to work' }
];

export const experience: ResumeEntry[] = [
	{
		org: 'Independent Software Development',
		role: 'Frontend & Desktop Application Developer',
		period: 'Mar 2025 – Present',
		points: [
			'Designed and shipped MooshieUI, a Rust/Tauri desktop frontend for ComfyUI, handling local model inference, environment management and node-graph abstraction.',
			'Delivered a full frontend redesign of a live browser-based MMO, rebuilding interface architecture and information density for an existing player base.',
			'Researched local reproduction of diffusion-model style transfer pipelines, evaluating IP-Adapter, InstantStyle and PuLID against hosted equivalents.'
		]
	},
	{
		org: 'Aussie Broadband',
		role: 'Technical Support Officer',
		period: 'Apr 2024 – Mar 2025',
		points: [
			'Delivered Tier 1 and Tier 2 technical resolution for home and enterprise network issues, reducing escalations by 30%.',
			'Automated modem configuration checks and improved knowledge-base entries for recurring NBN setup issues.',
			'Collaborated cross-functionally with engineering teams to log, analyze and document system behavior across routers and ISP infrastructure.'
		]
	},
	{
		org: 'Freelance / Contract Roles',
		role: 'IT Systems Support & Technical Ops',
		period: 'Jul 2022 – Dec 2023',
		points: [
			'Developed interactive full-stack internal tools with Vue.js and Supabase, integrating REST APIs to support responsive web layouts and CMS architecture.',
			'Scripted automation tasks including backup and software deployment across Windows environments.',
			'Maintained endpoint devices and ran system diagnostics for SME clients, resolving hardware and software issues and managing updates.'
		]
	},
	{
		org: 'Bunnings Ltd',
		role: 'IT Service Desk Support',
		period: 'Apr 2022 – Jun 2022',
		points: [
			'Managed ticket-based system administration for 300+ staff, including device provisioning, printer network mapping and account troubleshooting.',
			'Conducted diagnostics and deployed security patches across Windows machines.'
		]
	},
	{
		org: 'Probe CX',
		role: 'IT Specialist',
		period: 'Apr 2020 – Jan 2022',
		points: [
			'Delivered Level 2 technical diagnostics and system imaging, transitioning from frontline support to back-office IT operations.'
		]
	}
];

export const skillGroups: ResumeSkillGroup[] = [
	{
		label: 'Languages',
		items: ['TypeScript', 'JavaScript', 'Rust', 'Python', 'C++', 'PHP', 'HTML', 'CSS']
	},
	{
		label: 'Frameworks & libraries',
		items: [
			'Svelte 5',
			'Vue.js',
			'Nuxt',
			'Next.js',
			'Astro',
			'Tailwind CSS',
			'GSAP',
			'Anime.js',
			'Three.js'
		]
	},
	{
		label: 'AI & tooling',
		items: [
			'Local model inference',
			'ComfyUI',
			'Diffusion pipelines',
			'LLM integration',
			'Workflow automation'
		]
	},
	{
		label: 'Dev tools',
		items: [
			'Tauri',
			'Supabase',
			'PostgreSQL',
			'Firebase',
			'Git',
			'REST APIs',
			'GraphQL',
			'Netlify',
			'VS Code'
		]
	},
	{
		label: 'Systems & IT',
		items: [
			'Networking',
			'ISP infrastructure',
			'Linux',
			'Windows & Mac admin',
			'Remote troubleshooting',
			'Ticketing platforms'
		]
	},
	{ label: 'Also', items: ['Craft CMS / Twig', 'Adobe CC', 'Accessibility'] }
];

export const highlights: ResumeProject[] = [
	{
		name: 'MooshieUI',
		meta: 'github.com/Mooshieblob1',
		blurb:
			'Rust/Tauri desktop frontend for ComfyUI, abstracting node-graph workflows into a guided interface.',
		href: 'https://github.com/Mooshieblob1/MooshieUI'
	},
	{
		name: 'Browser MMO Redesign',
		meta: 'client project',
		blurb:
			'Frontend redesign of a live browser MMO, restructuring dense game state into a readable interface.'
	}
];

export const education: ResumeEntry[] = [
	{
		org: 'SAE Institute Australia',
		role: 'Associate Degree, Game Development',
		period: 'Sep 2019 – Dec 2022',
		points: []
	}
];
