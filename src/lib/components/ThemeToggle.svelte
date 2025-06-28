<script lang="ts">
    import theme from '$lib/stores/theme';
    import { onMount } from 'svelte';

    function cycleTheme() {
        theme.update((currentTheme) => {
            if (currentTheme === 'light') return 'dark';
            if (currentTheme === 'dark') return 'system';
            return 'light';
        });
    }

    // Prevent the button from rendering on the server to avoid hydration errors.
    let mounted = false;
    onMount(() => (mounted = true));
</script>

{#if mounted}
    <button
        on:click={cycleTheme}
        aria-label="Toggle theme"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCC00]/20 text-[#8A6D00] transition-colors duration-300 hover:bg-[#FFCC00]/30 dark:bg-gray-700 dark:text-amber-300 dark:hover:bg-gray-600"
    >
        {#if $theme === 'light'}
            <i class="fas fa-sun"></i>
        {:else if $theme === 'dark'}
            <i class="fas fa-moon"></i>
        {:else}
            <i class="fas fa-desktop"></i>
        {/if}
    </button>
{/if}