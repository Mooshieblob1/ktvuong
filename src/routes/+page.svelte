<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Sample portfolio data
	const projects = [
		{
			title: 'Blob Site',
			description:
				'An elegant gallery platform showcasing curated AI-generated artwork with advanced filtering capabilities.',
			image: 'https://ktvuong.com/site1img/thumb1.webp',
			tags: ['Vue.js', 'Nuxt.js', 'TailwindCSS'],
			link: 'https://mooshieblob.com/'
		},
		{
			title: 'ComfyTut',
			description:
				'Comprehensive educational resource for mastering AI image generation through ComfyUI workflows and techniques.',
			image: 'https://ktvuong.com/site2img/thumb.webp',
			tags: ['SvelteJS', 'Node.js'],
			link: 'https://comfytut.mooshieblob.com/'
		},
		{
			title: 'Team Blob',
			description:
				'A mock esports team site for League of Legends built with SvelteKit and TailwindCSS.',
			image: 'https://ktvuong.com/site3img/blob-thumb.jpg',
			tags: ['SvelteKit', 'TailwindCSS', 'Design'],
			link: 'https://team-blob.mooshieblob.com/'
		},
		{
			title: 'ComfyUI NAI Diffusion Support',
			description:
				'Active contributor to the ComfyUI_NAIDGenerator open-source project, including support for NAI Diffusion 4.5 Curated Preview.',
			image: 'https://opengraph.githubassets.com/1/bedovyy/ComfyUI_NAIDGenerator',
			tags: ['Python', 'ComfyUI', 'Open Source'],
			link: 'https://github.com/bedovyy/ComfyUI_NAIDGenerator/pull/27'
		},
		{
			title: 'GPU Garden Website',
			description:
				'Front-end contributor to the GPU Garden site, a community AI project for TouhouAI.',
			image: 'https://opengraph.githubassets.com/1/mchaker/gpugarden-site',
			tags: ['SvelteKit', 'Tailwind', 'Open Source'],
			link: 'https://gpu.garden/'
		}
	];
</script>

<svelte:head>
	<title>Kent Vuong | Full-Stack Software Developer</title>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	/>
</svelte:head>

<Header />

<!-- Header spacer to prevent overlap -->
<div class="h-16"></div>

<!-- Hero Section -->
<section class="relative mx-auto max-w-6xl overflow-hidden px-4 pt-16 pb-20 sm:px-6 lg:px-8">
	<div class="blob top-0 right-0"></div>
	<div class="blob bottom-0 left-0"></div>

	<div class="flex flex-col items-center md:flex-row">
		<div class="mb-10 md:mb-0 md:w-1/2">
			<h1 class="mb-4 text-4xl font-bold md:text-5xl">
				<span class="gradient-text">Full-Stack</span> Software Developer
			</h1>
			<p class="mb-6 text-xl text-gray-600">
				Building user-focused applications with modern web technologies and AI integrations.
			</p>
			<div class="flex items-center">
				<div class="mr-2 h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
				<span class="font-medium text-green-600">Available for work</span>
			</div>
		</div>
		<div class="flex justify-center md:w-1/2">
			<div class="relative">
				<img
					src="https://ktvuong.com/pfp.webp"
					alt="Kent Vuong"
					class="h-64 w-64 rounded-full border-4 border-white object-cover shadow-xl"
				/>
				<div class="absolute -right-2 -bottom-2 rounded-full bg-yellow-100 p-2 shadow-md">
					<i class="fas fa-code text-xl text-yellow-600"></i>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- About Section -->
<section
	id="about"
	class="mx-auto max-w-6xl rounded-xl bg-amber-50/80 px-4 py-20 shadow-sm backdrop-blur-sm sm:px-6 lg:px-8"
>
	<div class="mb-12 text-center">
		<h2 class="mb-2 text-3xl font-bold">About Me</h2>
		<div class="mx-auto h-1 w-20 bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
	</div>
	<div class="mx-auto max-w-3xl text-center">
		<p class="mb-6 text-lg text-gray-700">
			Hello! I'm Kent, a versatile full-stack developer specializing in reactive frontend
			architecture and server-side rendering frameworks.
		</p>
		<p class="text-lg text-gray-700">
			I develop user-focused applications using SvelteKit, React, and Nuxt.js with TypeScript,
			TailwindCSS, and AI integrations.
		</p>
	</div>
</section>

<!-- Skills Section -->
<section id="skills" class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
	<div class="mb-12 text-center">
		<h2 class="mb-2 text-3xl font-bold">Technical Skills</h2>
		<div class="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500"></div>
	</div>
	<div class="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
		<span class="skill-pill rounded-full bg-yellow-50 px-4 py-2 font-medium text-yellow-800"
			>JavaScript</span
		>
		<span class="skill-pill rounded-full bg-yellow-50 px-4 py-2 font-medium text-yellow-800"
			>TypeScript</span
		>
		<span class="skill-pill rounded-full bg-amber-50 px-4 py-2 font-medium text-amber-800"
			>Svelte</span
		>
		<span class="skill-pill rounded-full bg-yellow-50 px-4 py-2 font-medium text-yellow-800"
			>React</span
		>
		<span class="skill-pill rounded-full bg-amber-50 px-4 py-2 font-medium text-amber-800"
			>Node.js</span
		>
		<span class="skill-pill rounded-full bg-amber-50 px-4 py-2 font-medium text-amber-800"
			>Nuxt.js</span
		>
		<span class="skill-pill rounded-full bg-amber-50 px-4 py-2 font-medium text-amber-800"
			>TailwindCSS</span
		>
		<span class="skill-pill rounded-full bg-yellow-50 px-4 py-2 font-medium text-yellow-800"
			>Python</span
		>
		<span class="skill-pill rounded-full bg-amber-100 px-4 py-2 font-medium text-amber-900"
			>ComfyUI</span
		>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="mx-auto max-w-6xl bg-amber-100/50 px-4 py-20 sm:px-6 lg:px-8">
	<div class="mb-12 text-center">
		<h2 class="mb-2 text-3xl font-bold">Featured Projects</h2>
		<div class="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500"></div>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each projects as project}
			<div
				class="project-card overflow-hidden rounded-xl bg-white shadow-md transition duration-300"
			>
				<div class="h-48 overflow-hidden">
					<img src={project.image} alt={project.title} class="h-full w-full object-cover" />
				</div>
				<div class="p-6">
					<h3 class="mb-2 text-xl font-bold">{project.title}</h3>
					<p class="mb-4 text-gray-600">{project.description}</p>
					<div class="mb-4 flex flex-wrap gap-2">
						{#each project.tags as tag}
							{#if tag === 'Vue.js' || tag === 'Nuxt.js'}
								<span class="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800">{tag}</span>
							{:else if tag === 'TailwindCSS'}
								<span class="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">{tag}</span>
							{:else if tag === 'SvelteJS' || tag === 'SvelteKit'}
								<span class="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">{tag}</span>
							{:else if tag === 'Node.js'}
								<span class="rounded bg-green-100 px-2 py-1 text-xs text-green-800">{tag}</span>
							{:else if tag === 'Design'}
								<span class="rounded bg-pink-100 px-2 py-1 text-xs text-pink-800">{tag}</span>
							{:else if tag === 'Tailwind'}
								<span class="rounded bg-teal-100 px-2 py-1 text-xs text-teal-800">{tag}</span>
							{:else if tag === 'Python'}
								<span class="rounded bg-indigo-100 px-2 py-1 text-xs text-indigo-800">{tag}</span>
							{:else if tag === 'ComfyUI'}
								<span class="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">{tag}</span>
							{:else}
								<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">{tag}</span>
							{/if}
						{/each}
					</div>
					<a
						href={project.link}
						target="_blank"
						class="flex items-center font-medium text-yellow-600 transition hover:text-yellow-800"
					>
						View Project <i class="fas fa-arrow-right ml-2"></i>
					</a>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
	<div class="mb-12 text-center">
		<h2 class="mb-2 text-3xl font-bold">Get In Touch</h2>
		<div class="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500"></div>
	</div>
	<div class="mx-auto max-w-2xl text-center">
		<p class="mb-8 text-lg text-gray-700">
			I'm always open to new opportunities and collaborations. Feel free to reach out if you want to
			chat!
		</p>
		<a
			href="mailto:contact@ktvuong.com"
			class="inline-block transform rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-3 font-medium text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg"
		>
			<i class="fas fa-envelope mr-2"></i> Email Me
		</a>
	</div>
</section>

<Footer />
