<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

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

	onMount(() => {
		// Modern scroll effects
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in');
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('[data-animate]').forEach((el) => {
			observer.observe(el);
		});

		// Parallax effect
		document.addEventListener('scroll', () => {
			const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
			const scrollPosition = window.pageYOffset;

			parallaxElements.forEach((element) => {
				const speed = parseFloat(element.getAttribute('data-parallax') || '0');
				const offset = scrollPosition * speed;
				element.style.transform = `translateY(${offset}px)`;
			});
		});
	});
</script>

<svelte:head>
	<title>Kent Vuong | Full-Stack Software Developer</title>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	/>
</svelte:head>

<Header />

<main class="pt-20">
	<!-- Hero Section -->
	<section
		class="mx-auto max-w-6xl overflow-hidden px-4 pt-8 pb-16 sm:px-6 md:pt-16 md:pb-24 lg:px-8"
		data-animate
		style="--vt-name: hero-section"
	>
		<div class="parallax-bg absolute inset-0 -z-10" data-parallax="0.2"></div>
		<div class="relative">
			<div class="blob top-0 -left-20"></div>
			<div class="blob top-40 right-0"></div>
			<div class="blob bottom-0 left-1/2"></div>

			<div class="flex flex-col items-center md:flex-row">
				<div class="mb-10 md:mb-0 md:w-1/2">
					<h1 class="mb-4 text-4xl leading-tight font-bold md:text-5xl">
						Hi, I'm <span class="gradient-text">Kent Vuong</span>
					</h1>
					<h2 class="mb-6 text-2xl font-semibold text-slate-600 md:text-3xl">
						Full-Stack Software Developer
					</h2>
					<p class="mb-8 text-lg text-slate-600">
						Building user-focused applications with modern web technologies and AI integrations.
					</p>
					<div class="flex space-x-4">
						<a
							href="mailto:contact@ktvuong.com"
							aria-label="Email"
							class="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFCC00]/20 text-[#8A6D00] transition duration-300 hover:bg-[#FFCC00]/30"
						>
							<i class="fas fa-envelope text-xl"></i>
						</a>
						<a
							href="https://github.com/Mooshieblob1"
							target="_blank"
							aria-label="GitHub"
							class="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFCC00]/20 text-[#8A6D00] transition duration-300 hover:bg-[#FFCC00]/30"
						>
							<i class="fab fa-github text-xl"></i>
						</a>
						<a
							href="https://www.linkedin.com/in/kentvuong88/"
							target="_blank"
							aria-label="LinkedIn"
							class="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFCC00]/20 text-[#8A6D00] transition duration-300 hover:bg-[#FFCC00]/30"
						>
							<i class="fab fa-linkedin-in text-xl"></i>
						</a>
					</div>
				</div>
				<div class="flex justify-center md:w-1/2">
					<div class="animate-bob relative">
						<div
							class="h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-xl md:h-80 md:w-80"
						>
							<img
								src="https://ktvuong.com/pfp.webp"
								alt="Kent Vuong"
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="absolute -right-4 -bottom-4 rounded-full bg-white p-3 shadow-lg">
							<span
								class="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800"
							>
								Available for work
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold">About Me</h2>
			<div class="mx-auto h-1 w-20 bg-[#FFCC00]"></div>
		</div>

		<div class="rounded-xl border border-[#FFCC00]/30 bg-[#FFF5DB]/50 p-8 shadow-md md:p-10">
			<p class="mb-6 text-lg text-slate-700">
				Hello! I'm Kent, a versatile full-stack developer specializing in reactive frontend
				architecture and server-side rendering frameworks.
			</p>
			<p class="mb-8 text-lg text-slate-700">
				I develop user-focused applications using SvelteKit, React, and Nuxt.js with TypeScript,
				TailwindCSS, and AI integrations.
			</p>

			<h3 class="mb-4 text-xl font-semibold">Technologies I Work With</h3>
			<div class="flex flex-wrap gap-3">
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]"
					>JavaScript</span
				>
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]"
					>TypeScript</span
				>
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]">Svelte</span
				>
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]">React</span>
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]"
					>Node.js</span
				>
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]"
					>Nuxt.js</span
				>
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]"
					>TailwindCSS</span
				>
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]">Python</span
				>
				<span class="rounded-full bg-[#FFCC00]/20 px-4 py-2 font-medium text-[#8A6D00]"
					>ComfyUI</span
				>
			</div>
		</div>
	</section>

	<!-- Projects Section -->
	<section id="projects" class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold">Featured Projects</h2>
			<div class="mx-auto h-1 w-20 bg-[#FFCC00]"></div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, i}
				<div
					class="project-card overflow-hidden rounded-xl bg-white shadow-md transition duration-300"
				>
					<div class="h-48 overflow-hidden">
						<img
							src={project.image}
							alt={project.title}
							class="h-full w-full object-cover transition duration-500 hover:scale-105"
						/>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-bold">{project.title}</h3>
						<p class="mb-4 text-slate-600">{project.description}</p>
						<div class="mb-4 flex flex-wrap gap-2">
							{#if i === 0}
								<span
									class="rounded-full bg-[#FFCC00]/10 px-3 py-1 text-xs font-medium text-[#8A6D00]"
									>Vue.js</span
								>
								<span
									class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800"
									>Nuxt.js</span
								>
								<span
									class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800"
									>TailwindCSS</span
								>
							{:else}
								{#each project.tags as tag}
									<span
										class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800"
										>{tag}</span
									>
								{/each}
							{/if}
						</div>
						<a
							href={project.link}
							target="_blank"
							class="flex items-center font-medium {i === 0
								? 'text-[#8A6D00] hover:text-[#5A4A2A]'
								: 'text-indigo-600 hover:text-indigo-800'}"
						>
							View Project <i class="fas fa-arrow-right ml-2"></i>
						</a>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Contact Section -->
	<section id="contact" class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold">Get In Touch</h2>
			<div class="mx-auto h-1 w-20 bg-[#FFCC00]"></div>
		</div>

		<div class="rounded-xl bg-white p-8 shadow-md md:p-10">
			<p class="mb-8 text-center text-lg text-slate-700">
				I'm always open to new opportunities and collaborations. Feel free to reach out if you want
				to chat!
			</p>

			<div class="flex flex-col items-center justify-center gap-6 md:flex-row">
				<a
					href="mailto:contact@ktvuong.com"
					class="flex items-center rounded-lg bg-[#FFCC00] px-6 py-3 font-medium text-[#5A4A2A] shadow-md transition duration-300 hover:bg-[#FFAA00] hover:shadow-lg"
				>
					<i class="fas fa-envelope mr-2"></i> Email Me
				</a>

				<div class="flex space-x-4">
					<a
						href="https://github.com/Mooshieblob1"
						target="_blank"
						aria-label="GitHub"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCC00]/20 transition duration-300 hover:bg-[#FFCC00]/30"
					>
						<i class="fab fa-github text-[#8A6D00]"></i>
					</a>
					<a
						href="https://www.linkedin.com/in/kentvuong88/"
						target="_blank"
						aria-label="LinkedIn"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCC00]/20 transition duration-300 hover:bg-[#FFCC00]/30"
					>
						<i class="fab fa-linkedin-in text-[#8A6D00]"></i>
					</a>
				</div>
			</div>
		</div>
	</section>

	<Footer />
</main>
