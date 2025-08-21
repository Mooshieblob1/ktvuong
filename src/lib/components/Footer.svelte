<script lang="ts">
	const year = new Date().getFullYear();
</script>

<!-- Footer -->
<footer class="bg-gray-900 py-8 text-white">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between md:flex-row">
			<div class="mb-4 md:mb-0">
				<span class="gradient-text text-xl font-bold">Kent Vuong</span>
				<p class="mt-1 text-gray-400">Full-Stack & DevOps Engineer</p>
			</div>
			<div class="flex space-x-6">
				<a
					href="https://github.com/mooshieblob1"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-400 transition hover:text-white"
					aria-label="GitHub profile"
				>
					<i class="fab fa-github"></i>
				</a>
				<a
					href="https://linkedin.com/in/kentvuong"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-400 transition hover:text-white"
					aria-label="LinkedIn profile"
				>
					<i class="fab fa-linkedin-in"></i>
				</a>
				<a href="#" class="text-gray-400 transition hover:text-white" aria-label="Twitter profile">
					<i class="fab fa-twitter"></i>
				</a>
			</div>
		</div>
		<div class="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
			<p>&copy; {year} Kent Vuong. All rights reserved.</p>
		</div>
	</div>
</footer>
