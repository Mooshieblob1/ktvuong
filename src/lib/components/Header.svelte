<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// Mobile menu toggle
		document.getElementById('mobile-menu-button')?.addEventListener('click', function () {
			const menu = document.getElementById('mobile-menu');
			menu?.classList.toggle('hidden');
		});

		// Close mobile menu when clicking on a link
		document.querySelectorAll('#mobile-menu a').forEach((link) => {
			link.addEventListener('click', function () {
				document.getElementById('mobile-menu')?.classList.add('hidden');
			});
		});

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
	class="fixed z-50 w-full border-b border-[#FFCC00]/30 bg-[#FFF5DB]/90 shadow-sm backdrop-blur-sm"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex flex-shrink-0 items-center">
				<span class="gradient-text text-xl font-bold">KV</span>
			</div>
			<div class="hidden md:block">
				<div class="ml-10 flex items-center space-x-4">
					<a
						href="#about"
						class="rounded-md px-3 py-2 text-sm font-medium text-[#5A4A2A] hover:text-[#8A6D00]"
						>About</a
					>
					<a
						href="#projects"
						class="rounded-md px-3 py-2 text-sm font-medium text-[#5A4A2A] hover:text-[#8A6D00]"
						>Projects</a
					>
					<a
						href="#contact"
						class="rounded-md px-3 py-2 text-sm font-medium text-[#5A4A2A] hover:text-[#8A6D00]"
						>Contact</a
					>
					<span
						class="inline-flex items-center rounded-full bg-[#FFCC00]/20 px-3 py-1 text-xs font-medium text-[#8A6D00]"
					>
						Available for work
					</span>
				</div>
			</div>
			<div class="-mr-2 flex md:hidden">
				<button
					type="button"
					id="mobile-menu-button"
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
				>
					<span class="sr-only">Open main menu</span>
					<i class="fas fa-bars"></i>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	<div id="mobile-menu" class="mx-4 mb-4 hidden rounded-lg bg-white shadow-lg md:hidden">
		<div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
			<a
				href="#about"
				class="block rounded-md px-3 py-2 text-base font-medium text-[#5A4A2A] hover:bg-[#FFF5DB]/50 hover:text-[#8A6D00]"
				>About</a
			>
			<a
				href="#projects"
				class="block rounded-md px-3 py-2 text-base font-medium text-[#5A4A2A] hover:bg-[#FFF5DB]/50 hover:text-[#8A6D00]"
				>Projects</a
			>
			<a
				href="#contact"
				class="block rounded-md px-3 py-2 text-base font-medium text-[#5A4A2A] hover:bg-[#FFF5DB]/50 hover:text-[#8A6D00]"
				>Contact</a
			>
		</div>
	</div>
</nav>
