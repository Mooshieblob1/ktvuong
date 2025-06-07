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
		},
		{
			title: 'GPU Garden Website',
			description:
				'Front-end contributor to the GPU Garden site, a community AI project for TouhouAI. Built with SvelteKit and Tailwind CSS.',
			image: 'https://opengraph.githubassets.com/1/mchaker/gpugarden-site', // GitHub Open Graph image
			tags: ['SvelteKit', 'Tailwind', 'Open Source'],
			link: 'https://gpu.garden'
		}
	];

        let githubRepos: { name: string; html_url: string; description: string }[] = [];

        function handleEmailClick() {
        }
        function handleContactClick() {
        }

        onMount(async () => {
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

                try {
                        const res = await fetch('/api/github');
                        if (res.ok) {
                                githubRepos = await res.json();
                        }
                } catch (e) {
                        console.error('Failed to load GitHub data', e);
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
				<ul class="flex justify-start gap-6">
					<li>
						<a
							href="https://github.com/Mooshieblob1"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit Kent's GitHub"
							class="text-gray-300 transition hover:text-amber-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"
								/>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/kentvuong88/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit Kent's LinkedIn"
							class="text-gray-300 transition hover:text-amber-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5v-7h3v7zM6.5 10.732c-.966 0-1.75-.79-1.75-1.764 0-.974.784-1.764 1.75-1.764s1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM19 19h-3v-5h-1v5h-3v-7h7v7z"
								/>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="mailto:contact@ktvuong.com"
							data-cfemail="717f746e5a716e6c6f75747d34797577"
							aria-label="Email Kent Vuong"
							class="text-gray-300 transition hover:text-amber-400"
							on:click|preventDefault={handleEmailClick}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M0 3v18h24V3H0zm12 11.77l-9.518-7.71h19.036L12 14.77zm10 1.232h-20V6.183l10 8.102 10-8.102V17z"
								/>
							</svg>
						</a>
					</li>
				</ul>
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

        <section id="github" class="section container mx-auto px-12 py-12">
                <h2 class="mb-8">{$t('github_heading')}</h2>
                <ul>
                        {#each githubRepos as repo}
                                <li class="mb-4">
                                        <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="text-amber-600 hover:underline"
                                        >
                                                {repo.name}
                                        </a>
                                        {#if repo.description}
                                                <p class="text-sm text-gray-700">{repo.description}</p>
                                        {/if}
                                </li>
                        {/each}
                </ul>
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
