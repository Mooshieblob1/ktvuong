<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { locale, t } from '$lib/i18n/i18n'; // Make sure `t` is imported

	onMount(() => {
		const browserLang = navigator.language;
		if (browserLang.startsWith('ja')) {
			locale.set('ja');
		} else {
			locale.set('en');
		}
	});
</script>

<!-- Top-right résumé button -->
<a
	href="/resume.pdf"
	target="_blank"
	class="absolute top-4 right-4 z-50 rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black shadow transition hover:bg-yellow-300"
>
	{$t('resume_button')}
</a>

<!-- Page content -->
<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
	<slot />
</div>
