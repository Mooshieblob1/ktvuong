<script lang="ts">
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
		// Mobile menu toggle
		document.getElementById('menu-toggle')?.addEventListener('click', function () {
			const menu = document.getElementById('mobile-menu');
			menu?.classList.toggle('hidden');
		});

		// Smooth scrolling for anchor links
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();

				const targetId = this.getAttribute('href');
				if (targetId === '#') return;

				const targetElement = document.querySelector(targetId);
				if (targetElement) {
					// Close mobile menu if open
					const mobileMenu = document.getElementById('mobile-menu');
					if (!mobileMenu?.classList.contains('hidden')) {
						mobileMenu?.classList.add('hidden');
					}

					// Scroll to target
					window.scrollTo({
						top: targetElement.offsetTop - 80,
						behavior: 'smooth'
					});
				}
			});
		});

		// Add shadow to navbar on scroll
		window.addEventListener('scroll', function () {
			const nav = document.querySelector('nav');
			if (window.scrollY > 10) {
				nav?.classList.add('shadow-lg');
			} else {
				nav?.classList.remove('shadow-lg');
			}
		});
	});
</script>

<svelte:head>
	<title>Kent Vuong | Full-Stack Software Developer</title>
</svelte:head>

<!-- Navigation -->
<nav class="sticky top-0 z-50 bg-gray-800 shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex items-center">
				<a href="#" class="flex items-center">
					<img src="/favicon.svg" alt="Logo" class="h-8 w-auto" />
				</a>
			</div>
			<div class="hidden items-center space-x-8 md:flex">
				<a href="#about" class="nav-link px-3 py-2 text-gray-300 hover:text-white">About</a>
				<a href="#skills" class="nav-link px-3 py-2 text-gray-300 hover:text-white">Skills</a>
				<a href="#projects" class="nav-link px-3 py-2 text-gray-300 hover:text-white">Projects</a>
				<a href="#contact" class="nav-link px-3 py-2 text-gray-300 hover:text-white">Contact</a>
				<a
					href="https://ktvuong.com/resume.pdf"
					target="_blank"
					class="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
					>Résumé</a
				>
			</div>
			<div class="flex items-center md:hidden">
				<button id="menu-toggle" class="text-gray-400 hover:text-white focus:outline-none">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
	<!-- Mobile menu -->
	<div id="mobile-menu" class="hidden border-t border-gray-700 bg-gray-800 md:hidden">
		<div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
			<a
				href="#about"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>About</a
			>
			<a
				href="#skills"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>Skills</a
			>
			<a
				href="#projects"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>Projects</a
			>
			<a
				href="#contact"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>Contact</a
			>
			<a
				href="https://ktvuong.com/resume.pdf"
				target="_blank"
				class="block rounded-md px-3 py-2 text-base font-medium text-indigo-400 hover:bg-gray-700 hover:text-indigo-300"
				>Résumé</a
			>
		</div>
	</div>
</nav>

<!-- Hero Section -->
<header class="bg-gray-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between md:flex-row">
			<div class="mb-10 md:mb-0 md:w-1/2">
				<h1 class="mb-4 text-5xl font-bold text-white md:text-6xl">Kent Vuong</h1>
				<h2 class="gradient-text mb-6 text-2xl font-semibold md:text-3xl">
					Full-Stack Software Developer
				</h2>
				<p class="mb-8 text-lg text-gray-400">
					Building user-focused applications with modern web technologies and AI integrations.
				</p>
				<div class="flex space-x-4">
					<a
						href="https://github.com/Mooshieblob1"
						target="_blank"
						class="social-icon text-2xl text-gray-400 hover:text-indigo-500"
					>
						<i class="fab fa-github"></i>
					</a>
					<a
						href="https://www.linkedin.com/in/kentvuong88/"
						target="_blank"
						class="social-icon text-2xl text-gray-400 hover:text-blue-500"
					>
						<i class="fab fa-linkedin"></i>
					</a>
					<a
						href="mailto:contact@ktvuong.com"
						class="social-icon text-2xl text-gray-400 hover:text-red-500"
					>
						<i class="fas fa-envelope"></i>
					</a>
				</div>
			</div>
			<div class="flex justify-center md:w-1/2">
				<div class="relative">
					<img
						src="https://ktvuong.com/pfp.webp"
						alt="Kent Vuong"
						class="h-64 w-64 rounded-full border-4 border-gray-700 object-cover shadow-lg"
					/>
					<div class="absolute -right-4 -bottom-4 rounded-full bg-gray-800 px-4 py-2 shadow-md">
						<span class="gradient-text font-medium">Available for work</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>

<!-- About Section -->
<section id="about" class="bg-gray-800 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="gradient-text mb-12 text-center text-3xl font-bold">About Me</h2>
		<div class="mx-auto max-w-3xl text-center">
			<p class="mb-8 text-lg text-gray-400">
				Hello! I'm Kent, a versatile full-stack developer specializing in reactive frontend
				architecture and server-side rendering frameworks.
			</p>
			<p class="text-lg text-gray-400">
				I develop user-focused applications using SvelteKit, React, and Nuxt.js with TypeScript,
				TailwindCSS, and AI integrations.
			</p>
		</div>
	</div>
</section>

<!-- Skills Section -->
<section id="skills" class="bg-gray-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="gradient-text mb-12 text-center text-3xl font-bold">Technical Skills</h2>
		<div class="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
			<span class="skill-pill rounded-full bg-indigo-900 px-4 py-2 font-medium text-indigo-300"
				>JavaScript</span
			>
			<span class="skill-pill rounded-full bg-purple-900 px-4 py-2 font-medium text-purple-300"
				>TypeScript</span
			>
			<span class="skill-pill rounded-full bg-red-900 px-4 py-2 font-medium text-red-300"
				>Svelte</span
			>
			<span class="skill-pill rounded-full bg-blue-900 px-4 py-2 font-medium text-blue-300"
				>React</span
			>
			<span class="skill-pill rounded-full bg-green-900 px-4 py-2 font-medium text-green-300"
				>Node.js</span
			>
			<span class="skill-pill rounded-full bg-emerald-900 px-4 py-2 font-medium text-emerald-300"
				>Nuxt.js</span
			>
			<span class="skill-pill rounded-full bg-cyan-900 px-4 py-2 font-medium text-cyan-300"
				>TailwindCSS</span
			>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="bg-gray-800 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="gradient-text mb-12 text-center text-3xl font-bold">Projects</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<div
					class="project-card overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-md transition-all duration-300"
				>
					<div class="h-48 overflow-hidden">
						<img src={project.image} alt={project.title} class="h-full w-full object-cover" />
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-bold text-white">{project.title}</h3>
						<p class="mb-4 text-gray-400">{project.description}</p>
						<div class="mb-4 flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span class="rounded-full bg-gray-700 px-3 py-1 text-sm font-medium text-gray-300"
									>{tag}</span
								>
							{/each}
						</div>
						<a
							href={project.link}
							target="_blank"
							class="font-medium text-indigo-400 hover:text-indigo-300">View Project &rarr;</a
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="bg-gray-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="gradient-text mb-12 text-center text-3xl font-bold">Get In Touch</h2>
		<div class="mx-auto max-w-3xl text-center">
			<p class="mb-8 text-lg text-gray-400">
				I'm always open to new opportunities and collaborations. Feel free to reach out if you want
				to chat!
			</p>
			<a
				href="mailto:contact@ktvuong.com"
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
			>
				Email Me
			</a>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-gray-900 py-8 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between md:flex-row">
			<p class="text-gray-400">&copy; 2025 Kent Vuong. All rights reserved.</p>
			<div class="mt-4 flex space-x-4 md:mt-0">
				<a
					href="https://github.com/Mooshieblob1"
					target="_blank"
					class="text-gray-400 hover:text-white"
				>
					<i class="fab fa-github"></i>
					<span class="sr-only">GitHub</span>
				</a>
				<a
					href="https://www.linkedin.com/in/kentvuong88/"
					target="_blank"
					class="text-gray-400 hover:text-white"
				>
					<i class="fab fa-linkedin"></i>
					<span class="sr-only">LinkedIn</span>
				</a>
			</div>
		</div>
	</div>
</footer>
