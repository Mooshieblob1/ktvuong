<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n/i18n'; // i18n import

	const projects = [
		{
			title: 'Blob Site',
			description:
				'An elegant gallery platform showcasing curated AI-generated artwork with advanced filtering capabilities',
			image: 'site1img/thumb1.webp',
			tags: ['Vue.js', 'Nuxt.js', 'TailwindCSS'],
			link: 'https://mooshieblob.com'
		},
		{
			title: 'ComfyTut',
			description:
				'Comprehensive educational resource for mastering AI image generation through ComfyUI workflows and techniques',
			image: 'site2img/thumb.webp',
			tags: ['SvelteJS', 'Node.js'],
			link: 'https://comfytut.mooshieblob.com'
		},
		{
			title: 'Team Blob',
			description:
				'A mock esports team site for League of Legends built with SvelteKit and TailwindCSS. It features a dynamic roster, match schedule, news, and personality-driven branding.',
			image: 'site3img/blob-thumb.jpg',
			tags: ['SvelteKit', 'TailwindCSS', 'Design'],
			link: 'https://team-blob.mooshieblob.com/'
		},
		{
			title: 'ComfyUI NAI Diffusion Support',
			description:
				'Active contributor to the ComfyUI_NAIDGenerator open-source project, including support for NAI Diffusion 4.5 Curated Preview.',
			image: 'https://opengraph.githubassets.com/1/bedovyy/ComfyUI_NAIDGenerator', // Optional image pulled from GitHub's Open Graph
			tags: ['Python', 'ComfyUI', 'Open Source'],
			link: 'https://github.com/bedovyy/ComfyUI_NAIDGenerator/pull/27' // Use actual PR link or repo
		}
	];

	function handleEmailClick() {
		console.log('Email icon clicked');
	}
	function handleContactClick() {
		console.log('Contact Me button clicked');
	}

	onMount(() => {
		document.body.classList.add('loaded');

		if (!document.querySelector('[src^="/emailProtection.js"]')) {
			const script = document.createElement('script');
			script.src = '/emailProtection.js';
			script.async = true;

			script.onload = () => {
				if (document.readyState !== 'complete') {
					document.dispatchEvent(new Event('DOMContentLoaded'));
				}
			};

			document.body.appendChild(script);
		}

		return () => {
			const script = document.querySelector(`[src^="/emailProtection.js"]`);
			if (script?.parentNode) {
				script.parentNode.removeChild(script);
			}
		};
	});
</script>

<svelte:head>
	<title>{$t('page_title')}</title>
</svelte:head>

<header class="bg-gray-900 text-white">
	<div class="container mx-auto px-12 py-12">
		<div class="flex flex-col md:justify-between">
			<div class="text-left">
				<img
					src="/pfp.webp"
					alt={$t('full_name')}
					class="mb-4 h-64 w-64 rounded-full border-4 border-amber-400 object-cover shadow-lg"
				/>
				<h1 class="text-3xl font-bold">{$t('full_name')}</h1>
				<p class="mt-2 mb-4 text-xl font-medium">{$t('tagline')}</p>
			</div>

			<!-- social links (unchanged) -->
			<nav aria-label="Social links" class="mt-6 md:mt-0">
				<!-- ... social icons here ... -->
			</nav>
		</div>
	</div>
</header>

<main class="bg-amber-50 text-gray-900">
	<section id="about" class="container mx-auto">
		<h2 class="mb-6 text-2xl font-bold">{$t('about_heading')}</h2>
		<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
			<div class="container mx-auto">
				<p class="mb-6 text-lg leading-relaxed">{$t('about_intro')}</p>
				<p class="mb-6 text-lg leading-relaxed">{$t('about_stack')}</p>
			</div>
			<div>
				<h3 class="mb-6 text-xl font-semibold">{$t('skills_heading')}</h3>
				<ul class="skills flex flex-wrap gap-3 font-semibold">
					<li class="rounded-md bg-amber-200 px-3 py-2 text-sm">JavaScript</li>
					<li class="rounded-md bg-amber-200 px-3 py-2 text-sm">TypeScript</li>
					<li class="rounded-md bg-amber-200 px-3 py-2 text-sm">Svelte</li>
					<li class="rounded-md bg-amber-200 px-3 py-2 text-sm">React</li>
					<li class="rounded-md bg-amber-200 px-3 py-2 text-sm">Node.js</li>
					<li class="rounded-md bg-amber-200 px-3 py-2 text-sm">Nuxt.js</li>
					<li class="rounded-md bg-amber-200 px-3 py-2 text-sm">Tailwindcss</li>
				</ul>
			</div>
		</div>
	</section>

	<section id="projects" class="section container mx-auto px-12 py-12">
		<h2 class="mb-8">{$t('projects_heading')}</h2>
		<div class="projects-grid grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, index (index)}
				<div
					class="project-card mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md"
				>
					<img src={project.image} alt={project.title} class="h-auto w-full object-cover" />
					<h3 class="mt-4">
						{#if index === 0}
							{$t('project_blob_title')}
						{:else if index === 1}
							{$t('project_comfytut_title')}
						{:else if index === 2}
							{$t('project_teamblob_title')}
						{:else}
							{project.title}
						{/if}
					</h3>
					<p class="text-center">
						{#if index === 0}
							{$t('project_blob_desc')}
						{:else if index === 1}
							{$t('project_comfytut_desc')}
						{:else if index === 2}
							{$t('project_teamblob_desc')}
						{:else}
							{project.description}
						{/if}
					</p>
					<div class="project-tags mt-2 flex flex-wrap justify-center gap-2">
						{#each project.tags as tag, tagIndex (tagIndex)}
							<span class="tag">{tag}</span>
						{/each}
					</div>
					<a href={project.link} class="project-link mt-4">{$t('view_project')}</a>
				</div>
			{/each}
		</div>
	</section>

	<section id="contact" class="section container mx-auto px-12 py-12">
		<h2>{$t('contact_heading')}</h2>
		<p>{$t('contact_text')}</p>
		<a
			href="mailto:contact@ktvuong.com"
			data-cfemail="717f746e5a716e6c6f75747d34797577"
			class="contact-button"
			on:click|preventDefault={handleContactClick}
		>
			{$t('contact_button')}
		</a>
	</section>
</main>

<footer class="section container mx-auto px-12 py-12 text-center">
	<div class="container">
		<p>© {new Date().getFullYear()} {$t('footer_name')}. {$t('footer_rights')}</p>
	</div>
</footer>
