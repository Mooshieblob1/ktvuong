<script lang="ts">
	let { projects } = $props<{
		projects: {
			title: string;
			description: string;
			image: string;
			tags: string[];
			link: string;
		}[];
	}>();
</script>

<section id="projects" class="mx-auto max-w-6xl border-b-0 px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-12 text-center">
		<h2 class="mb-4 text-3xl font-bold">Featured Projects</h2>
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
							<span class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800"
								>Nuxt.js</span
							>
							<span class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800"
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
