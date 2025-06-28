<script lang="ts">
	import { onMount } from 'svelte';
	let year = new Date().getFullYear();

	onMount(() => {
		const yearEl = document.getElementById('year');
		if (yearEl) {
			yearEl.textContent = new Date().getFullYear().toString();
		}
	});
</script>

<!-- Footer -->
<footer class="border-t border-slate-800 py-8">
	<div class="container mx-auto px-4 md:px-8">
		<div class="flex flex-col items-center justify-between md:flex-row">
			<div class="mb-4 flex items-center space-x-2 md:mb-0">
				<div class="bg-accent flex h-6 w-6 items-center justify-center rounded-full">
					<span class="font-mono text-sm font-bold">KV</span>
				</div>
				<span class="text-lg font-bold">Kent Vuong</span>
			</div>

			<div class="text-slate-400 md:text-center">
				&copy; {new Date().getFullYear()} Kent Vuong. All rights reserved.
			</div>

			<div class="mt-4 flex space-x-4 md:mt-0">
				<a
					href="https://github.com/mooshieblob1"
					target="_blank"
					class="hover:text-accent text-slate-400 transition-colors"
				>
					<i class="fab fa-github fa-lg"></i>
				</a>
				<a
					href="https://linkedin.com/in/kentvuong"
					target="_blank"
					class="hover:text-accent text-slate-400 transition-colors"
				>
					<i class="fab fa-linkedin-in fa-lg"></i>
				</a>
			</div>
		</div>
	</div>
</footer>
