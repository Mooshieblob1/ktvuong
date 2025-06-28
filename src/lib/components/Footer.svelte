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
<footer class="bg-[#FFF5DB]/50 px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl text-center">
		<p class="text-[#8A6D00]">
			&copy; <span id="year">{year}</span> Kent Vuong. All rights reserved.
		</p>
	</div>
</footer>
