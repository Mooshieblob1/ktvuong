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
			link: 'https://mooshieblob.com'
		},
		{
			title: 'ComfyTut',
			description:
				'Comprehensive educational resource for mastering AI image generation through ComfyUI workflows and techniques',
			image: 'site2img/thumb.webp',
			tags: ['SvelteJS', 'Node.js'],
			link: 'https://comfytut.mooshieblob.com'
		}
	];

	// Optional animation for page load
	onMount(() => {
		document.body.classList.add('loaded');
	});
</script>

<svelte:head>
	<title>Kent Vuong | Full-Stack Software Developer</title>
</svelte:head>

<header class="text-amber-50">
	<div class="container">
		<div class="flex flex-col items-center">
			<img
				src="/pfp.webp"
				alt="Kent Vuong"
				class="mb-4 h-32 w-32 rounded-full border-2 border-amber-50 object-cover shadow-md"
			/>
			<h1>Kent Vuong</h1>
		</div>
		<h2>Full-Stack Software Developer</h2>
		<div class="social-links">
			<a href="https://github.com/Mooshieblob1" target="_blank" rel="noopener noreferrer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
				<span>GitHub</span>
			</a>
			<a href="https://www.linkedin.com/in/kentvuong88/" target="_blank" rel="noopener noreferrer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
					/>
				</svg>
				<span>LinkedIn</span>
			</a>
			<a href="mailto:kent@ktvuong.com">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"
					/>
				</svg>
				<span>Contact</span>
			</a>
		</div>
	</div>
</header>

<main class="bg-amber-50">
	<section id="about" class="section container">
		<h2>About Me</h2>
		<div class="about-content">
			<div class="about-text">
				<p>
					Hello! I'm Kent, a versatile full-stack software developer who transforms complex
					challenges into elegant digital solutions. I architect and engineer applications that
					combine technical excellence with intuitive user experiences.
				</p>

				<br />

				<p>
					My technical toolkit includes JavaScript/TypeScript, Svelte, React, and Node.js,
					complemented by my expertise in RESTful API development and system integration. I
					specialize in building responsive, performance-optimized applications that deliver real
					business value.
				</p>

				<br />

				<p>
					When I'm not crafting code, I'm constantly exploring emerging technologies and refining my
					craft. My approach combines analytical precision with creative problem-solving—skills I've
					honed through both formal education and hands-on development experience. I believe great
					software is invisible to users while powerfully solving their problems. This philosophy
					guides every line of code I write.
				</p>
			</div>
			<div class="skills">
				<h3>Skills</h3>
				<div class="skill-tags">
					<span>JavaScript</span>
					<span>TypeScript</span>
					<span>Svelte</span>
					<span>React</span>
					<span>Node.js</span>
					<span>SQL</span>
					<span>Git</span>
					<span>CI/CD</span>
					<span>Nuxt.js</span>
					<span>Vue.js</span>
					<span>Express.js</span>
				</div>
			</div>
		</div>
	</section>

	<section id="projects" class="section container mx-auto px-4 py-12 text-center">
		<h2 class="text-center">Projects</h2>
		<div class="projects-grid grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<div
					class="project-card mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-amber-50 shadow-md"
				>
					<img src={project.image} alt={project.title} class="h-auto w-full object-cover" />
					<h3 class="mt-4">{project.title}</h3>
					<p class="text-center">{project.description}</p>
					<div class="project-tags mt-2 flex flex-wrap justify-center gap-2">
						{#each project.tags as tag}
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
		<a href="mailto:kent@ktvuong.com" class="contact-button">Contact Me</a>
	</section>
</main>

<footer class="bg-amber-50">
	<div class="container">
		<p>© {new Date().getFullYear()} Kent Vuong. All rights reserved.</p>
	</div>
</footer>
