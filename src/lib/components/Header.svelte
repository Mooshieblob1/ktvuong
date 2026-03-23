<script lang="ts">
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function scrollTo(e: Event, targetId: string) {
		e.preventDefault();
		closeMenu();
		const el = document.querySelector<HTMLElement>(targetId);
		if (el) {
			const lenis = window.__lenis;
			if (lenis) {
				lenis.scrollTo(el, { offset: -80 });
			} else {
				window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
			}
		}
	}
</script>

<!-- Navigation -->
<nav
	class="bg-opacity-90 bg-background fixed top-0 z-50 w-full border-b border-slate-800 py-4 backdrop-blur-sm"
>
	<div class="container mx-auto flex items-center justify-between px-4 md:px-8">
		<div class="flex items-center space-x-2">
			<img src="/favicon.svg" alt="KV logo" class="h-8 w-8 rounded-lg" />
			<span class="text-xl font-bold">Kent Vuong</span>
		</div>
		<div class="hidden space-x-8 font-bold md:flex">
			<a
				href="#about"
				on:click={(e) => scrollTo(e, '#about')}
				class="hover:text-accent transition-colors">About</a
			>
			<a
				href="#projects"
				on:click={(e) => scrollTo(e, '#projects')}
				class="hover:text-accent transition-colors">Projects</a
			>
			<a
				href="#skills"
				on:click={(e) => scrollTo(e, '#skills')}
				class="hover:text-accent transition-colors">Skills</a
			>
			<a
				href="#contact"
				on:click={(e) => scrollTo(e, '#contact')}
				class="hover:text-accent transition-colors">Contact</a
			>
		</div>
		<div class="md:hidden">
			<button
				id="menu-toggle"
				on:click={toggleMenu}
				class="text-accent"
				aria-label="Toggle mobile menu"
			>
				<i class="fas fa-bars text-2xl"></i>
			</button>
		</div>
	</div>
	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div id="mobile-menu" class="bg-secondary py-4 md:hidden">
			<div class="container mx-auto flex flex-col space-y-4 px-4">
				<a
					href="#about"
					on:click={(e) => scrollTo(e, '#about')}
					class="hover:text-accent transition-colors">About</a
				>
				<a
					href="#projects"
					on:click={(e) => scrollTo(e, '#projects')}
					class="hover:text-accent transition-colors">Projects</a
				>
				<a
					href="#skills"
					on:click={(e) => scrollTo(e, '#skills')}
					class="hover:text-accent transition-colors">Skills</a
				>
				<a
					href="#contact"
					on:click={(e) => scrollTo(e, '#contact')}
					class="hover:text-accent transition-colors">Contact</a
				>
			</div>
		</div>
	{/if}
</nav>
