<script>
	import { onMount } from 'svelte';

	// Sample portfolio data
	const projects = [
		{
			title: 'Blob Site',
			description:
				'An elegant gallery platform showcasing curated AI-generated artwork with advanced filtering capabilities',
			image: 'site1img/thumb1.webp',
			tags: ['Vue.js', 'Nuxt.js', 'TailwindCSS'],
			link: 'https://mooshieblob.com',
		},
		{
			title: 'ComfyTut',
			description:
				'Comprehensive educational resource for mastering AI image generation through ComfyUI workflows and techniques',
			image: 'site2img/thumb.webp',
			tags: ['SvelteJS', 'Node.js'],
			link: 'https://comfytut.mooshieblob.com',
		},
	];

	// Functions for handling email link clicks
	function handleEmailClick() {
		console.log('Email icon clicked');
	}
	function handleContactClick() {
		console.log('Contact Me button clicked');
	}

	// Email protection script loading
	onMount(() => {
		document.body.classList.add('loaded');

		// Ensure script is added only once
		if (!document.querySelector('[src^="/emailProtection.js"]')) {
			const script = document.createElement('script');
			script.src = '/emailProtection.js'; // Static URL (or version-controlled via build process)
			script.async = true;

			script.onload = () => {
				console.log('Email protection script loaded');

				// Manually trigger DOMContentLoaded
				if (document.readyState !== 'complete') {
					const event = new Event('DOMContentLoaded');
					document.dispatchEvent(event);
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
	<title>Kent Vuong | Full-Stack Software Developer</title>
</svelte:head>

<header class="bg-gray-900 text-white">
	<div class="container mx-auto px-6 py-12"> <!-- Adjusted padding -->
		<div class="flex flex-col items-center md:flex-row md:justify-between">
			<div class="text-center md:text-left">
				<img
					src="/pfp.webp"
					alt="Kent Vuong"
					class="mb-4 h-32 w-32 rounded-full border-4 border-amber-400 object-cover shadow-lg"
				/>
				<h1 class="text-3xl font-bold">Kent Vuong</h1>
				<p class="text-xl mt-2 font-medium">Full-Stack Software Developer</p>
			</div>
			<nav aria-label="Social links" class="mt-6 md:mt-0">
				<ul class="flex gap-6 justify-center md:justify-start">
					<li>
						<a
							href="https://github.com/Mooshieblob1"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit Kent's GitHub"
							class="text-gray-300 hover:text-amber-400 transition"
						>
							<!-- GitHub SVG here -->
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/kentvuong88/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit Kent's LinkedIn"
							class="text-gray-300 hover:text-amber-400 transition"
						>
							<!-- LinkedIn SVG here -->
						</a>
					</li>
					<li>
						<a
							href="#"
							role="button"
							data-cfemail="717f746e5a716e6c6f75747d34797577"
							aria-label="Email Kent Vuong"
							class="text-gray-300 hover:text-amber-400 transition"
							on:click|preventDefault={handleEmailClick}
						>
							<!-- Email SVG here -->
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</header>

<main class="bg-gray-100 text-gray-900">
	<section id="about" class="container mx-auto px-6 py-12 mt-12"> <!-- Added top margin -->
		<h2 class="text-2xl font-bold text-center mb-6">About Me</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
			<div>
				<p class="mb-6">
					Hello! I'm Kent, a versatile full-stack software developer who transforms complex challenges into
					elegant digital solutions.
				</p>
				<p class="mb-6">
					My approach combines analytical precision with creative problem-solving. I specialize in building
					user-focused applications using JavaScript/TypeScript, Svelte, React, and Node.js.
				</p>
			</div>
			<div>
				<h3 class="font-semibold text-lg mb-4">Technical Skills</h3>
				<ul class="skills flex flex-wrap gap-2">
					<li class="bg-amber-200 text-sm px-3 py-2 rounded-md">JavaScript</li>
					<li class="bg-amber-200 text-sm px-3 py-2 rounded-md">TypeScript</li>
					<li class="bg-amber-200 text-sm px-3 py-2 rounded-md">Svelte</li>
					<li class="bg-amber-200 text-sm px-3 py-2 rounded-md">React</li>
					<li class="bg-amber-200 text-sm px-3 py-2 rounded-md">Node.js</li>
				</ul>
			</div>
		</div>
	</section>

	<section id="projects" class="section container mx-auto px-4 py-12 text-center">
		<h2 class="text-center">Projects</h2>
		<div class="projects-grid grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, index (index)}
				<div
					class="project-card mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-amber-50 shadow-md"
				>
					<img src={project.image} alt={project.title} class="h-auto w-full object-cover" />
					<h3 class="mt-4">{project.title}</h3>
					<p class="text-center">{project.description}</p>
					<div class="project-tags mt-2 flex flex-wrap justify-center gap-2">
						{#each project.tags as tag, tagIndex (tagIndex)}
							<span class="tag">{tag}</span>
						{/each}
					</div>
					<a href={project.link} class="project-link mt-4">View Project</a>
				</div>
			{/each}
		</div>
	</section>
	<section id="contact" class="section container">
		<h2>Get In Touch</h2>
		<p>
			I'm always open to new opportunities and collaborations. Feel free to reach out if you want to
			connect!
		</p>
		<!-- This is an additional email reference that should be obfuscated as well -->
		<a
			href="#"
			data-cfemail="717f746e5a716e6c6f75747d34797577"
			class="contact-button"
			on:click={handleContactClick}
		>
			Contact Me
		</a>
	</section>
</main>

<footer class="bg-amber-50">
	<div class="container">
		<p>© {new Date().getFullYear()} Kent Vuong. All rights reserved.</p>
	</div>
</footer>