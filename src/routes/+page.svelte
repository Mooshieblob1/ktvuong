<script lang="ts">
	let mobileMenuOpen = false;
	let currentProjectIndex = 0;
	let touchStartX = 0;
	let touchEndX = 0;

	const projects = [
		{
			id: 1,
			title: 'mooshieblob.com',
			description:
				'My fun alias profile showcasing my AI projects and online persona, featuring interactive demos and creative experiments.',
			tech: ['Nuxt.js', 'Tailwind', 'Cloudflare', 'AI Integration'],
			github: 'https://github.com/Mooshieblob1/mooshieblob1.github.io',
			demo: 'https://mooshieblob.com',
			image: '/site1img/thumb1.webp'
		},
		{
			id: 2,
			title: 'ktvuong.com',
			description:
				"This is the site you're on right now! My personal portfolio website highlighting my technical skills, professional journey, and project accomplishments.",
			tech: ['HTML/CSS', 'JavaScript', 'TailwindCSS'],
			github: 'https://github.com/Mooshieblob1/ktvuong',
			demo: null,
			image: null
		},
		{
			id: 3,
			title: 'team-blob.mooshieblob.com',
			description:
				'A fictional esports team website with interactive elements, player profiles, and match history - all built for fun.',
			tech: ['SvelteKit', 'Tailwind', 'Cloudflare', 'Interactive UI'],
			github: 'https://github.com/Mooshieblob1/team-blob',
			demo: 'https://team-blob.mooshieblob.com',
			image: '/site3img/thumb.png'
		},
		{
			id: 4,
			title: 'gpu.garden',
			description:
				'A frontend for a free shared GPU server for TouhouAI members, featuring image generation tools and notion-like notebooks.',
			tech: ['SvelteKit', 'Tailwind', 'GPU Sharing', 'AI Tools'],
			github: 'https://github.com/mchaker/gpugarden-site',
			demo: 'https://gpu.garden',
			image: '/site4img/thumb.png'
		},
		{
			id: 5,
			title: 'ComfyUI_NAIDGenerator',
			description:
				'A custom ComfyUI node that enables NovelAI API key integration, expanding generation options for users.',
			tech: ['ComfyUI', 'NovelAI', 'Python', 'API Integration'],
			github: 'https://github.com/Mooshieblob1/ComfyUI_NAIDGenerator',
			demo: null,
			image: '/site5img/thumb.png'
		}
	];

	const skills = [
		{ name: 'JavaScript/TypeScript', level: 95 },
		{ name: 'React/Vue/Svelte', level: 90 },
		{ name: 'Node.js/Express', level: 88 },
		{ name: 'AWS/Azure/GCP', level: 85 },
		{ name: 'Docker/Kubernetes', level: 82 },
		{ name: 'Python/Go', level: 78 }
	];

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function nextProject() {
		currentProjectIndex = (currentProjectIndex + 1) % projects.length;
	}

	function prevProject() {
		currentProjectIndex = currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1;
	}

	function scrollToSection(sectionId: string) {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
		mobileMenuOpen = false;
	}

	// Touch handling for project swiping on mobile
	function handleTouchStart(event: TouchEvent) {
		touchStartX = event.changedTouches[0].screenX;
	}

	function handleTouchEnd(event: TouchEvent) {
		touchEndX = event.changedTouches[0].screenX;
		handleSwipeGesture();
	}

	function handleSwipeGesture() {
		const swipeThreshold = 50;
		const swipeDistance = touchStartX - touchEndX;

		if (Math.abs(swipeDistance) > swipeThreshold) {
			if (swipeDistance > 0) {
				// Swipe left - next project
				nextProject();
			} else {
				// Swipe right - previous project
				prevProject();
			}
		}
	}

	// Contact form handling
	let contactForm = {
		name: '',
		email: '',
		message: ''
	};

	function handleSubmit(event: Event) {
		event.preventDefault();
		// Handle form submission here
		console.log('Form submitted:', contactForm);
		// Reset form
		contactForm = { name: '', email: '', message: '' };
		alert('Message sent successfully!');
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
				Hi, I'm <span class="highlight">Kent Vuong</span>
			</h1>
			<p class="hero-subtitle">Full-Stack & DevOps Engineer</p>
			<p class="hero-description">
				I build scalable web applications and robust cloud infrastructure. Passionate about clean
				code, automation, and delivering exceptional user experiences.
			</p>
			<div class="hero-buttons">
				<button class="btn btn-primary" on:click={() => scrollToSection('projects')}>
					View My Work
				</button>
				<button class="btn btn-secondary" on:click={() => scrollToSection('contact')}>
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

		<!-- Mobile Navigation Buttons -->
		<div class="mobile-project-nav mb-4 md:hidden">
			<button
				class="mobile-nav-btn mobile-nav-prev"
				on:click={prevProject}
				aria-label="Previous project"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 18L9 12L15 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Previous
			</button>
			<button
				class="mobile-nav-btn mobile-nav-next"
				on:click={nextProject}
				aria-label="Next project"
			>
				Next
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9 18L15 12L9 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>

		<div class="project-showcase">
			<button
				class="project-nav project-nav-prev hidden md:flex"
				on:click={prevProject}
				aria-label="Previous project"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 18L9 12L15 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<div class="project-card" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
				{#if projects[currentProjectIndex].image}
					<div class="project-image">
						<img
							src={projects[currentProjectIndex].image}
							alt={projects[currentProjectIndex].title}
							loading="lazy"
						/>
					</div>
				{/if}
				<div class="project-info">
					<h3 class="project-title">{projects[currentProjectIndex].title}</h3>
					<p class="project-description">{projects[currentProjectIndex].description}</p>
					<div class="project-tech">
						{#each projects[currentProjectIndex].tech as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>
					<div class="project-links">
						<a
							href={projects[currentProjectIndex].github}
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-outline"
						>
							<svg
								class="h-5 w-5"
								width="20"
								height="20"
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
							Code
						</a>
						{#if projects[currentProjectIndex].demo}
							<a
								href={projects[currentProjectIndex].demo}
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-primary"
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18 13V6C18 5.44772 17.5523 5 17 5H5C4.44772 5 4 5.44772 4 6V18C4 18.5523 4.44772 19 5 19H12M18 13L22 17M18 13V17M18 13H14"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								Visit
							</a>
						{/if}
					</div>
				</div>
			</div>

			<button
				class="project-nav project-nav-next hidden md:flex"
				on:click={nextProject}
				aria-label="Next project"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9 18L15 12L9 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>

		<div class="project-indicators">
			{#each projects as project, index}
				<button
					class="indicator {index === currentProjectIndex ? 'active' : ''}"
					on:click={() => (currentProjectIndex = index)}
					aria-label="Go to project {index + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>

<!-- Skills Section -->
<section id="skills" class="skills">
	<div class="container">
		<h2 class="section-title">Skills & Expertise</h2>
		<p class="section-subtitle">Technologies I work with</p>

		<div class="skills-grid">
			{#each skills as skill}
				<div class="skill-item">
					<div class="skill-header">
						<span class="skill-name">{skill.name}</span>
						<span class="skill-percentage">{skill.level}%</span>
					</div>
					<div class="skill-bar">
						<div class="skill-progress" style="width: {skill.level}%"></div>
					</div>
				</div>
			{/each}
		</div>

		<div class="skills-categories">
			<div class="skill-category">
				<h3>Frontend</h3>
				<ul>
					<li>React, Vue.js, Svelte</li>
					<li>Next.js, Nuxt.js</li>
					<li>TypeScript, JavaScript</li>
					<li>Tailwind CSS, SCSS</li>
				</ul>
			</div>
			<div class="skill-category">
				<h3>Backend</h3>
				<ul>
					<li>Node.js, Express</li>
					<li>Python, Django</li>
					<li>PostgreSQL, MongoDB</li>
					<li>REST APIs, GraphQL</li>
				</ul>
			</div>
			<div class="skill-category">
				<h3>DevOps & Cloud</h3>
				<ul>
					<li>AWS, Azure, GCP</li>
					<li>Docker, Kubernetes</li>
					<li>CI/CD, GitHub Actions</li>
					<li>Terraform, Ansible</li>
				</ul>
			</div>
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
						class="email-obfuscated"
						data-cfemail="6a0f1e05040f1e09052a0f120b071a060f44090507"
						style="background: none; border: none; color: inherit; text-decoration: underline; cursor: pointer; padding: 0; font: inherit;"
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
					<a href="https://linkedin.com/in/kentvuong" target="_blank" rel="noopener noreferrer"
						>LinkedIn</a
					>
				</div>
			</div>

			<form class="contact-form" on:submit={handleSubmit}>
				<div class="form-group">
					<label for="name">Name</label>
					<input
						type="text"
						id="name"
						bind:value={contactForm.name}
						required
						placeholder="Your name"
					/>
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input
						type="email"
						id="email"
						bind:value={contactForm.email}
						required
						placeholder="Your email"
					/>
				</div>
				<div class="form-group">
					<label for="message">Message</label>
					<textarea
						id="message"
						bind:value={contactForm.message}
						required
						placeholder="Your message"
						rows="5"
					></textarea>
				</div>
				<button type="submit" class="btn btn-primary btn-full"> Send Message </button>
			</form>
		</div>
	</div>
</section>
