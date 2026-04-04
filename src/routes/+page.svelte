<script lang="ts">
	import { enhance } from '$app/forms';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let currentProjectIndex = 0;
	let touchStartX = 0;
	let tiltEl: HTMLElement | null = null;

	// Cumulative scroll position (not wrapped) so tweened can interpolate smoothly
	let targetPosition = 0;
	const scrollPosition = tweened(0, { duration: 600, easing: cubicOut });

	function handleMouseMove(e: MouseEvent) {
		const card = e.currentTarget as HTMLElement;
		const inner = card.querySelector('.carousel-card-tilt') as HTMLElement;
		if (!inner) return;
		tiltEl = inner;
		const rect = card.getBoundingClientRect();
		const rx = -(((e.clientY - rect.top) / rect.height - 0.5) * 2) * 5;
		const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * 5;
		inner.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
	}

	function handleMouseLeave() {
		if (!tiltEl) return;
		tiltEl.style.transform = '';
		tiltEl = null;
	}

	const projects = [
		{
			id: 1,
			title: 'MooshieUI',
			description:
				'A modern, beginner-friendly desktop frontend for ComfyUI built with Tauri. Features text-to-image, image-to-image, inpainting, built-in upscaling, ControlNet support, and a one-click installer.',
			tech: ['Svelte', 'Tauri', 'Rust', 'TypeScript', 'Tailwind'],
			github: 'https://github.com/Mooshieblob1/MooshieUI',
			demo: null,
			image:
				'https://opengraph.githubassets.com/ae818a6ebe47065ddc9244709a79988f6212ba21325f34e584e85adddb36e03c/Mooshieblob1/MooshieUI',
			fallback: '/site6img/thumb.png'
		},
		{
			id: 2,
			title: 'mooshieblob.com',
			description:
				'My fun alias profile showcasing my AI projects and online persona, featuring interactive demos and creative experiments.',
			tech: ['Nuxt.js', 'Tailwind', 'Cloudflare', 'AI Integration'],
			github: 'https://github.com/Mooshieblob1/mooshieblob1.github.io',
			demo: 'https://mooshieblob.com',
			image: 'https://mooshieblob.com/assets/images/page.png',
			fallback: '/site1img/thumb1.webp'
		},
		{
			id: 3,
			title: 'ktvuong.com',
			description:
				"This is the site you're on right now! My personal portfolio website highlighting my technical skills, professional journey, and project accomplishments.",
			tech: ['HTML/CSS', 'JavaScript', 'TailwindCSS'],
			github: 'https://github.com/Mooshieblob1/ktvuong',
			demo: null,
			image: null
		},
		{
			id: 4,
			title: 'team-blob.mooshieblob.com',
			description:
				'A fictional esports team website with interactive elements, player profiles, and match history - all built for fun.',
			tech: ['SvelteKit', 'Tailwind', 'Cloudflare', 'Interactive UI'],
			github: 'https://github.com/Mooshieblob1/team-blob',
			demo: 'https://team-blob.mooshieblob.com',
			image: 'https://team-blob.mooshieblob.com/team-blob-logo.png'
		},
		{
			id: 5,
			title: 'gpu.garden',
			description:
				'A frontend for a free shared GPU server for TouhouAI members, featuring image generation tools and notion-like notebooks.',
			tech: ['SvelteKit', 'Tailwind', 'GPU Sharing', 'AI Tools'],
			github: 'https://github.com/mchaker/gpugarden-site',
			demo: 'https://gpu.garden',
			image: 'https://gpu.garden/favicon.png'
		},
		{
			id: 6,
			title: 'ComfyUI_NAIDGenerator',
			description:
				'A custom ComfyUI node that enables NovelAI API key integration, expanding generation options for users.',
			tech: ['ComfyUI', 'NovelAI', 'Python', 'API Integration'],
			github: 'https://github.com/Mooshieblob1/ComfyUI_NAIDGenerator',
			demo: null,
			image:
				'https://opengraph.githubassets.com/b4f99c38b720522271e089d605e565de46e77d02088bb7b6d32781dd8cb8aa14/Mooshieblob1/ComfyUI_NAIDGenerator'
		}
	];

	const skillCategories = [
		{
			title: 'Frontend',
			icon: '◆',
			skills: [
				'JavaScript',
				'TypeScript',
				'React',
				'Vue.js',
				'Svelte',
				'Next.js',
				'Nuxt.js',
				'Tailwind CSS',
				'SCSS'
			]
		},
		{
			title: 'Backend',
			icon: '◆',
			skills: [
				'Node.js',
				'Express',
				'Python',
				'Django',
				'Rust',
				'PostgreSQL',
				'MongoDB',
				'REST APIs',
				'GraphQL',
				'WebSocket'
			]
		},
		{
			title: 'Desktop & Systems',
			icon: '◆',
			skills: ['Tauri', 'Rust', 'Cross-platform Builds', 'IPC & Native APIs']
		},
		{
			title: 'DevOps & Cloud',
			icon: '◆',
			skills: [
				'AWS',
				'Azure',
				'GCP',
				'Docker',
				'Kubernetes',
				'CI/CD',
				'GitHub Actions',
				'Terraform',
				'Ansible'
			]
		}
	];

	function nextProject() {
		targetPosition += 1;
		currentProjectIndex = (currentProjectIndex + 1) % projects.length;
		scrollPosition.set(targetPosition);
	}

	function prevProject() {
		targetPosition -= 1;
		currentProjectIndex = currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1;
		scrollPosition.set(targetPosition);
	}

	function goToProject(index: number) {
		const N = projects.length;
		const currentWrapped = ((targetPosition % N) + N) % N;
		let diff = index - currentWrapped;
		if (diff > N / 2) diff -= N;
		if (diff < -N / 2) diff += N;
		targetPosition += diff;
		currentProjectIndex = index;
		scrollPosition.set(targetPosition);
	}

	function scrollToSection(sectionId: string) {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleTouchStart(event: TouchEvent) {
		touchStartX = event.changedTouches[0].screenX;
	}

	function handleTouchEnd(event: TouchEvent) {
		const swipeDistance = touchStartX - event.changedTouches[0].screenX;
		if (Math.abs(swipeDistance) > 50) {
			if (swipeDistance > 0) {
				nextProject();
			} else {
				prevProject();
			}
		}
	}

	function openExternal(url: string) {
		window.open(url, '_blank', 'noopener,noreferrer');
	}

	let formSuccess = false;
	let formError = '';

	function getFailureErrorMessage(data: unknown): string {
		if (
			typeof data === 'object' &&
			data !== null &&
			'error' in data &&
			typeof (data as { error: unknown }).error === 'string'
		) {
			return (data as { error: string }).error;
		}

		return 'Something went wrong.';
	}
</script>

<svelte:head>
	<title>Kent Vuong - Full-Stack & DevOps Engineer</title>
	<meta
		name="description"
		content="Kent Vuong - Full-Stack Developer and DevOps Engineer specializing in modern web technologies and cloud infrastructure."
	/>
</svelte:head>

<!-- Hero Section -->
<section id="about" class="hero">
	<div class="hero-content">
		<div class="hero-text fade-in">
			<h1 class="hero-title">
				Hi, I'm <span style="white-space: nowrap;"
					><span class="text-gradient-cyan">Kent</span>
					<span class="text-gradient-blue">Vuong</span></span
				>
			</h1>
			<p class="hero-subtitle">Full-Stack & DevOps Engineer</p>
			<p class="hero-description">
				I build scalable web applications and robust cloud infrastructure. Passionate about clean
				code, automation, and delivering exceptional user experiences.
			</p>
			<div class="hero-buttons">
				<button class="btn btn-primary" onclick={() => scrollToSection('projects')}>
					View My Work
				</button>
				<button class="btn btn-secondary" onclick={() => scrollToSection('contact')}>
					Get In Touch
				</button>
			</div>
		</div>

		<div class="hero-terminal fade-in-delay">
			<div class="terminal w-full max-w-md">
				<div class="terminal-header">
					<button class="terminal-dot dot-red" aria-label="Close"></button>
					<button class="terminal-dot dot-yellow" aria-label="Minimize"></button>
					<button class="terminal-dot dot-green" aria-label="Maximize"></button>
				</div>
				<div class="terminal-content">
					<div class="mb-3">
						<span class="command">$ whoami</span><br />
						<span class="path">> Kent Vuong</span><br />
						<span class="path">> Full-Stack Dev</span>
					</div>
					<div class="mb-3">
						<span class="command">$ cat skills.txt</span><br />
						<span class="path">> Cloud | Containers | CI/CD</span><br />
						<span class="path">> Full-Stack | DevOps</span>
					</div>
					<div>
						<span class="command">$ connect --social</span>
						<span class="cursor"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="projects">
	<div class="container" style="max-width: 1600px;">
		<h2 class="section-title">Featured Projects</h2>
		<p class="section-subtitle">Some of my recent work</p>

		<div class="carousel-scene">
			<div class="carousel-track">
				{#each projects as project, index (project.id)}
					{@const rawOffset = index - $scrollPosition}
					{@const offset = rawOffset - Math.round(rawOffset / projects.length) * projects.length}
					{@const absOffset = Math.abs(offset)}
					{@const isActive = index === currentProjectIndex}
					<div
						class="carousel-card"
						class:carousel-card-active={isActive}
						role="presentation"
						style:transform="translateX({offset * 105}%) scale({Math.max(
							0.5,
							1 - absOffset * 0.12
						)}) rotateY({offset * -6}deg)"
						style:opacity={absOffset > 2
							? 0
							: absOffset < 0.5
								? 1
								: Math.max(0, 1 - absOffset * 0.45)}
						style:filter="blur({absOffset < 0.5 ? 0 : absOffset * 2}px)"
						style:z-index={10 - Math.round(absOffset)}
						onmousemove={(e) => {
							if (isActive) handleMouseMove(e);
						}}
						onmouseleave={() => {
							if (isActive) handleMouseLeave();
						}}
						ontouchstart={(e) => {
							if (isActive) handleTouchStart(e);
						}}
						ontouchend={(e) => {
							if (isActive) handleTouchEnd(e);
						}}
					>
						<div class="carousel-card-tilt">
							<div class="carousel-card-inner">
								{#if project.image}
									<div class="project-image">
										<img
									src={project.image}
									alt={project.title}
									loading="lazy"
									onerror={(e) => { if ('fallback' in project && project.fallback) (e.currentTarget as HTMLImageElement).src = project.fallback as string; }}
								/>
									</div>
								{/if}
								<div class="project-info">
									<h3 class="project-title">{project.title}</h3>
									<p class="project-description">{project.description}</p>
									<div class="project-tech">
										{#each project.tech as tech (`${project.id}-${tech}`)}
											<span class="tech-tag">{tech}</span>
										{/each}
									</div>
									<div class="project-links">
										<button
											type="button"
											class="btn btn-outline"
										onclick={() => openExternal(project.github)}
										>
											<i class="fab fa-github"></i> Code
										</button>
										{#if project.demo}
											<button
												type="button"
												class="btn btn-primary"
											onclick={() => openExternal(project.demo)}
											>
												<i class="fas fa-external-link-alt"></i> Visit
											</button>
										{/if}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<button
				class="carousel-nav carousel-nav-prev"
				onclick={prevProject}
				aria-label="Previous project"
			>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
					><path
						d="M15 18L9 12L15 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/></svg
				>
			</button>
			<button
				class="carousel-nav carousel-nav-next"
				onclick={nextProject}
				aria-label="Next project"
			>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
					><path
						d="M9 18L15 12L9 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/></svg
				>
			</button>
		</div>

		<div class="carousel-indicators">
			{#each projects as project, index (project.id)}
				<button
					class="carousel-dot"
					class:active={index === currentProjectIndex}
					onclick={() => {
						goToProject(index);
					}}
					aria-label="Go to project {index + 1}"
				>
					<span class="carousel-dot-fill"></span>
				</button>
			{/each}
		</div>

		<div class="carousel-counter">
			<span class="carousel-counter-current"
				>{String(currentProjectIndex + 1).padStart(2, '0')}</span
			>
			<span class="carousel-counter-sep">/</span>
			<span class="carousel-counter-total">{String(projects.length).padStart(2, '0')}</span>
		</div>
	</div>
</section>

<!-- Skills Section -->
<section id="skills" class="skills">
	<div class="container">
		<h2 class="section-title">Skills & Expertise</h2>
		<p class="section-subtitle">Technologies I work with</p>

		<div class="skills-categories">
			{#each skillCategories as category (category.title)}
				<div class="skill-category">
					<h3>{category.title}</h3>
					<div class="skill-tags">
						{#each category.skills as skill (skill)}
							<span class="skill-tag">{skill}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="contact">
	<div class="container">
		<h2 class="section-title">Get In Touch</h2>
		<p class="section-subtitle">Let's work together on your next project</p>

		<div class="contact-content">
			<div class="contact-info">
				<h3>Contact Information</h3>
				<div class="contact-item">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<polyline
							points="22,6 12,13 2,6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<button
						class="email-obfuscated btn-unstyled"
						data-cfemail="2c474942586c47585a5943424b024f4341"
					>
						Email Me
					</button>
				</div>
				<div class="contact-item">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<circle
							cx="12"
							cy="10"
							r="3"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span>Perth, WA</span>
				</div>
				<div class="contact-item">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9 19C4 20.5 4 16.5 2 16M22 16V18.13C22 19.48 21.36 20.44 20.09 20.93L18 21.5C16.5 22 15.5 21 15.5 19.5V16.5C15.5 15.5 16 14.5 16.5 14C12.5 13.5 8.5 12 8.5 5.5C8.5 4 9 2.5 10 1.5C9.5 0 10 -1.5 12 -1C14 -0.5 15.5 0.5 16.5 1.5C18 1 19.5 1 21 1.5C22 0.5 23.5 -0.5 25.5 -1C27.5 -1.5 28 0 27.5 1.5C28.5 2.5 29 4 29 5.5C29 12 25 13.5 21 14C21.5 14.5 22 15.5 22 16.5V19.5"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<a href="https://github.com/mooshieblob1" target="_blank" rel="noopener noreferrer"
						>GitHub</a
					>
				</div>
				<div class="contact-item">
					<svg
						class="h-6 w-6"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 14C16.4183 14 20 17.5817 20 22H4C4 17.5817 7.58172 14 12 14Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<a
						href="https://www.linkedin.com/in/kentvuong88/"
						target="_blank"
						rel="noopener noreferrer">LinkedIn</a
					>
				</div>
			</div>

			<form
				class="contact-form"
				method="POST"
				action="?/contact"
				use:enhance={() => {
					formSuccess = false;
					formError = '';
					return async ({ result }) => {
						if (result.type === 'success') {
							formSuccess = true;
						} else if (result.type === 'failure') {
							formError = getFailureErrorMessage(result.data);
						} else {
							formError = 'Something went wrong.';
						}
					};
				}}
			>
				{#if formSuccess}
					<div class="mb-4 rounded-lg bg-green-900/50 p-4 text-green-300">
						Message sent! I'll get back to you soon.
					</div>
				{/if}
				{#if formError}
					<div class="mb-4 rounded-lg bg-red-900/50 p-4 text-red-300">
						{formError}
					</div>
				{/if}
				<div class="form-group">
					<label for="name">Name</label>
					<input type="text" id="name" name="name" required placeholder="Your name" />
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" id="email" name="email" required placeholder="Your email" />
				</div>
				<div class="form-group">
					<label for="message">Message</label>
					<textarea id="message" name="message" required placeholder="Your message" rows="5"
					></textarea>
				</div>
				<button type="submit" class="btn btn-primary btn-full"> Send Message </button>
			</form>
		</div>
	</div>
</section>
