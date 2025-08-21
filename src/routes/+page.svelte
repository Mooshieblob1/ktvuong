<script lang="ts">
	import { onMount } from 'svelte';

	function handleFormSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		alert('Thank you for your message!');
		form.reset();
	}

	onMount(() => {
		// Smooth scrolling for anchor links
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
				e.preventDefault();
				const href = this.getAttribute('href');
				if (href) {
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({
							behavior: 'smooth'
						});
					}
				}
			});
		});

		// Initialize particles.js
		window.particlesJS('particles-js', {
			particles: {
				number: { value: 80, density: { enable: true, value_area: 800 } },
				color: { value: '#3b82f6' },
				shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
				opacity: {
					value: 0.3,
					random: false,
					anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
				},
				size: {
					value: 3,
					random: true,
					anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
				},
				line_linked: { enable: true, distance: 150, color: '#3b82f6', opacity: 0.2, width: 1 },
				move: {
					enable: true,
					speed: 2,
					direction: 'none',
					random: false,
					straight: false,
					out_mode: 'out',
					bounce: false,
					attract: { enable: false, rotateX: 600, rotateY: 1200 }
				}
			},
			interactivity: {
				detect_on: 'canvas',
				events: {
					onhover: { enable: true, mode: 'grab' },
					onclick: { enable: true, mode: 'push' },
					resize: true
				},
				modes: {
					grab: { distance: 140, line_linked: { opacity: 1 } },
					bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
					repulse: { distance: 200, duration: 0.4 },
					push: { particles_nb: 4 },
					remove: { particles_nb: 2 }
				}
			},
			retina_detect: true
		});
	});
</script>

<svelte:head>
	<style>
		:global(body) {
			font-family: 'Inter', sans-serif;
			scroll-behavior: smooth;
		}

		.gradient-text {
			background: linear-gradient(90deg, #3b82f6, #8b5cf6);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
		}

		.terminal-line::before {
			content: '$';
			color: #8b5cf6;
			margin-right: 10px;
			font-weight: bold;
		}

		.project-card:hover {
			transform: translateY(-5px);
			box-shadow:
				0 20px 25px -5px rgba(0, 0, 0, 0.1),
				0 10px 10px -5px rgba(0, 0, 0, 0.04);
		}

		.skill-icon {
			transition: all 0.3s ease;
		}

		.skill-card:hover .skill-icon {
			transform: scale(1.1);
		}

		#particles-js {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 0;
		}
	</style>
</svelte:head>

<!-- Particles Background -->
<div id="particles-js" class="fixed"></div>

<!-- Hero Section -->
<section id="about" class="relative flex min-h-screen items-center justify-center pt-16">
	<div class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center md:flex-row">
			<div class="mb-10 md:mb-0 md:w-1/2">
				<h1 class="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
					<span class="gradient-text">Hi, I'm Kent Vuong</span>
				</h1>
				<h2 class="mb-6 text-2xl font-semibold text-gray-700 md:text-3xl">
					Full-Stack & DevOps Engineer
				</h2>
				<p class="mb-8 max-w-lg text-lg text-gray-600">
					I build scalable web applications and robust cloud infrastructure. Passionate about clean
					code, automation, and delivering exceptional user experiences.
				</p>

				<div class="max-w-md rounded-lg bg-gray-800 p-6 font-mono text-gray-100">
					<div class="mb-4 flex items-center">
						<div class="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
						<div class="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
						<div class="h-3 w-3 rounded-full bg-green-500"></div>
					</div>
					<div class="terminal-line mb-2">whoami</div>
					<div class="mb-2 ml-6">&gt; Kent Vuong</div>
					<div class="mb-4 ml-6">&gt; Full-Stack Dev</div>

					<div class="terminal-line mb-2">cat skills.txt</div>
					<div class="mb-2 ml-6">&gt; Cloud | Containers | CI/CD</div>
					<div class="mb-4 ml-6">&gt; Full-Stack | DevOps</div>

					<div class="terminal-line mb-2">connect --social</div>
					<div class="ml-6 flex space-x-4">
						<a href="#" aria-label="GitHub profile" class="text-blue-400 hover:text-blue-300"
							><i class="fab fa-github"></i></a
						>
						<a href="#" aria-label="LinkedIn profile" class="text-blue-400 hover:text-blue-300"
							><i class="fab fa-linkedin"></i></a
						>
						<a href="#" aria-label="Twitter profile" class="text-blue-400 hover:text-blue-300"
							><i class="fab fa-twitter"></i></a
						>
					</div>
				</div>
			</div>
			<div class="flex justify-center md:w-1/2">
				<div class="relative">
					<div
						class="flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl md:h-80 md:w-80"
					>
						<div
							class="flex h-60 w-60 items-center justify-center rounded-full bg-white md:h-72 md:w-72"
						>
							<span class="gradient-text text-6xl font-bold md:text-8xl">KV</span>
						</div>
					</div>
					<div class="absolute -right-5 -bottom-5 rounded-full bg-white px-4 py-2 shadow-md">
						<span class="gradient-text font-semibold">Available for work</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="relative bg-white py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
			<p class="mx-auto max-w-2xl text-xl text-gray-600">Some of my recent work</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			<div
				class="project-card overflow-hidden rounded-xl bg-white shadow-lg transition duration-300"
			>
				<div
					class="flex h-48 items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500"
				>
					<img
						src="https://ktvuong.com/site1img/thumb1.webp"
						alt="mooshieblob.com"
						class="h-full w-full object-cover"
					/>
				</div>
				<div class="p-6">
					<h3 class="mb-2 text-2xl font-bold">mooshieblob.com</h3>
					<p class="mb-4 text-gray-600">
						My fun alias profile showcasing my AI projects and online persona, featuring interactive
						demos and creative experiments.
					</p>
					<div class="mb-4 flex flex-wrap gap-2">
						<span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">Nuxt.js</span>
						<span class="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800"
							>Tailwind</span
						>
						<span class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
							>Cloudflare</span
						>
						<span class="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800"
							>AI Integration</span
						>
					</div>
					<div class="flex space-x-4">
						<a
							href="https://github.com/Mooshieblob1/mooshieblob1.github.io"
							class="flex items-center text-blue-600 transition hover:text-blue-800"
						>
							<i class="fab fa-github mr-2"></i> Code
						</a>
						<a
							href="https://mooshieblob.com/"
							class="flex items-center text-purple-600 transition hover:text-purple-800"
						>
							<i class="fas fa-external-link-alt mr-2"></i> Visit
						</a>
					</div>
				</div>
			</div>

			<div
				class="project-card overflow-hidden rounded-xl bg-white shadow-lg transition duration-300"
			>
				<div
					class="flex h-48 items-center justify-center bg-gradient-to-r from-green-400 to-teal-500"
				>
					<div class="p-4 text-center text-white">
						<i class="fas fa-project-diagram mb-4 text-6xl"></i>
						<p>More projects coming soon</p>
					</div>
				</div>
				<div class="p-6">
					<h3 class="mb-2 text-2xl font-bold">Your Project Here</h3>
					<p class="mb-4 text-gray-600">
						Interested in collaborating? Let's build something amazing together!
					</p>
					<div class="mb-4 flex flex-wrap gap-2">
						<span class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">Your Tech</span>
						<span class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">Stack Here</span>
					</div>
					<a
						href="#contact"
						class="inline-flex items-center text-indigo-600 transition hover:text-indigo-800"
					>
						<i class="fas fa-envelope mr-2"></i> Contact me
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Skills Section -->
<section id="skills" class="relative bg-gray-50 py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold md:text-4xl">Skills & Expertise</h2>
			<p class="mx-auto max-w-2xl text-xl text-gray-600">Technologies I work with</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div
				class="skill-card rounded-xl bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center">
					<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
						<i class="fas fa-laptop-code skill-icon text-xl text-blue-600"></i>
					</div>
					<h3 class="text-xl font-bold">Frontend</h3>
				</div>
				<ul class="space-y-2">
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>React, Vue.js, Svelte</span
						>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>Next.js, Nuxt.js</span>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span
							>TypeScript, JavaScript</span
						>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>Tailwind CSS, SCSS</span>
					</li>
				</ul>
			</div>

			<div
				class="skill-card rounded-xl bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center">
					<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
						<i class="fas fa-server skill-icon text-xl text-purple-600"></i>
					</div>
					<h3 class="text-xl font-bold">Backend</h3>
				</div>
				<ul class="space-y-2">
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>Node.js, Express</span>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>Python, Django</span>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>PostgreSQL, MongoDB</span>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>REST APIs, GraphQL</span>
					</li>
				</ul>
			</div>

			<div
				class="skill-card rounded-xl bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center">
					<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
						<i class="fas fa-cloud skill-icon text-xl text-green-600"></i>
					</div>
					<h3 class="text-xl font-bold">DevOps & Cloud</h3>
				</div>
				<ul class="space-y-2">
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>AWS, Azure, GCP</span>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>Docker, Kubernetes</span>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>CI/CD, GitHub Actions</span
						>
					</li>
					<li class="flex items-center">
						<i class="fas fa-check-circle mr-2 text-green-500"></i><span>Terraform, Ansible</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="relative bg-white py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold md:text-4xl">Get In Touch</h2>
			<p class="mx-auto max-w-2xl text-xl text-gray-600">
				Let's work together on your next project
			</p>
		</div>

		<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
			<div>
				<div class="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
					<h3 class="mb-4 text-2xl font-bold">Contact Information</h3>
					<div class="space-y-4">
						<div class="flex items-start">
							<i class="fas fa-envelope mt-1 mr-4 text-xl"></i>
							<div>
								<h4 class="font-semibold">Email</h4>
								<p>contact@ktvuong.com</p>
							</div>
						</div>
						<div class="flex items-start">
							<i class="fas fa-globe mt-1 mr-4 text-xl"></i>
							<div>
								<h4 class="font-semibold">Website</h4>
								<p>ktvuong.com</p>
							</div>
						</div>
					</div>

					<div class="mt-8">
						<h3 class="mb-4 text-2xl font-bold">Follow Me</h3>
						<div class="flex space-x-4">
							<a
								href="#"
								aria-label="GitHub profile"
								class="bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center rounded-full bg-white transition"
								><i class="fab fa-github"></i></a
							>
							<a
								href="#"
								aria-label="LinkedIn profile"
								class="bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center rounded-full bg-white transition"
								><i class="fab fa-linkedin-in"></i></a
							>
							<a
								href="#"
								aria-label="Twitter profile"
								class="bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center rounded-full bg-white transition"
								><i class="fab fa-twitter"></i></a
							>
							<a
								href="#"
								aria-label="Dev.to profile"
								class="bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center rounded-full bg-white transition"
								><i class="fab fa-dev"></i></a
							>
						</div>
					</div>
				</div>
			</div>

			<div>
				<form on:submit|preventDefault={handleFormSubmit} class="space-y-6">
					<div>
						<label for="name" class="mb-1 block text-sm font-medium text-gray-700">Name</label>
						<input
							type="text"
							id="name"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							id="email"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label for="message" class="mb-1 block text-sm font-medium text-gray-700">Message</label
						>
						<textarea
							id="message"
							rows="5"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>
					<button
						type="submit"
						class="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:from-blue-600 hover:to-purple-700"
					>
						Send Message
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
