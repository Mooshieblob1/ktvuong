<script lang="ts">
	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- Navigation -->
<nav class="bg-opacity-80 fixed z-50 w-full bg-white shadow-sm backdrop-blur-md">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex items-center">
				<div class="flex flex-shrink-0 items-center">
					<span class="gradient-text text-xl font-bold">KV</span>
				</div>
			</div>
			<div class="hidden items-center space-x-8 md:flex">
				<a href="#about" class="text-gray-700 transition hover:text-indigo-600">About</a>
				<a href="#projects" class="text-gray-700 transition hover:text-indigo-600">Projects</a>
				<a href="#skills" class="text-gray-700 transition hover:text-indigo-600">Skills</a>
				<a href="#contact" class="text-gray-700 transition hover:text-indigo-600">Contact</a>
			</div>
			<div class="flex items-center md:hidden">
				<button on:click={toggleMobileMenu} class="text-gray-700" aria-label="Toggle mobile menu">
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
	{#if mobileMenuOpen}
		<div class="bg-white px-4 py-2 shadow-lg md:hidden">
			<a
				href="#about"
				on:click={closeMobileMenu}
				class="block py-2 text-gray-700 transition hover:text-indigo-600">About</a
			>
			<a
				href="#projects"
				on:click={closeMobileMenu}
				class="block py-2 text-gray-700 transition hover:text-indigo-600">Projects</a
			>
			<a
				href="#skills"
				on:click={closeMobileMenu}
				class="block py-2 text-gray-700 transition hover:text-indigo-600">Skills</a
			>
			<a
				href="#contact"
				on:click={closeMobileMenu}
				class="block py-2 text-gray-700 transition hover:text-indigo-600">Contact</a
			>
		</div>
	{/if}
</nav>
