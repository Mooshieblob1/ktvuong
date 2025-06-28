<script lang="ts">
	import { onMount } from 'svelte';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	onMount(() => {
		// Smooth scrolling for anchor links
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();

				const targetId = this.getAttribute('href');
				if (targetId === '#') return;

				const targetElement = document.querySelector(targetId);

				if (targetElement) {
					window.scrollTo({
						top: targetElement.offsetTop - 80,
						behavior: 'smooth'
					});
				}
			});
		});
	});
</script>

<!-- Navigation -->
<nav
	class="bg-opacity-90 bg-background fixed top-0 z-50 w-full border-b border-slate-800 py-4 backdrop-blur-sm"
>
	<div class="container mx-auto flex items-center justify-between px-4 md:px-8">
		<div class="flex items-center space-x-2">
			<div class="bg-accent flex h-8 w-8 items-center justify-center rounded-full">
				<span class="font-mono text-lg font-bold">KV</span>
			</div>
			<span class="text-xl font-bold">Kent Vuong</span>
		</div>
		<div class="hidden space-x-8 md:flex">
			<a href="#about" class="hover:text-accent transition-colors">About</a>
			<a href="#projects" class="hover:text-accent transition-colors">Projects</a>
			<a href="#skills" class="hover:text-accent transition-colors">Skills</a>
			<a href="#contact" class="hover:text-accent transition-colors">Contact</a>
		</div>
		<div class="md:hidden">
			<button id="menu-toggle" on:click={toggleMenu} class="text-accent" aria-label="Toggle mobile menu">
				<i class="fas fa-bars text-2xl"></i>
			</button>
		</div>
	</div>
	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div id="mobile-menu" class="bg-secondary py-4 md:hidden">
			<div class="container mx-auto flex flex-col space-y-4 px-4">
				<a href="#about" on:click={closeMenu} class="hover:text-accent transition-colors">About</a>
				<a href="#projects" on:click={closeMenu} class="hover:text-accent transition-colors"
					>Projects</a
				>
				<a href="#skills" on:click={closeMenu} class="hover:text-accent transition-colors">Skills</a
				>
				<a href="#contact" on:click={closeMenu} class="hover:text-accent transition-colors"
					>Contact</a
				>
			</div>
		</div>
	{/if}
</nav>
