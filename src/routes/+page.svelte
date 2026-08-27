<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
	import RepoGrid from '$lib/components/RepoGrid.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';

	let { data } = $props();
</script>

<Hero />
<FeaturedProjects />
<RepoGrid data={data.reposData} />
<Skills />
<Contact />
