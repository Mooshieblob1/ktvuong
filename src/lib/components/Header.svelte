<script lang="ts">
    import { onMount } from 'svelte';

    onMount(() => {
        // Mobile menu toggle
        document.getElementById('menu-toggle')?.addEventListener('click', function () {
            const menu = document.getElementById('mobile-menu');
            menu?.classList.toggle('hidden');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu?.classList.contains('hidden')) {
                        mobileMenu?.classList.add('hidden');
                    }

                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add shadow to navbar on scroll
        window.addEventListener('scroll', function () {
            const nav = document.querySelector('nav');
            if (window.scrollY > 10) {
                nav?.classList.add('shadow-md');
            } else {
                nav?.classList.remove('shadow-md');
            }
        });
    });
</script>

<!-- Navigation -->
<nav class="fixed z-50 w-full bg-white/80 shadow-sm backdrop-blur-sm">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
                <a href="#" class="flex items-center">
                    <img src="/favicon.svg" alt="Logo" class="h-8 w-8" />
                    <span class="gradient-text ml-2 text-xl font-semibold">Kent Vuong</span>
                </a>
            </div>
            <div class="hidden space-x-8 md:flex">
                <a href="#about" class="text-gray-600 transition hover:text-yellow-600">About</a>
                <a href="#skills" class="text-gray-600 transition hover:text-yellow-600">Skills</a>
                <a href="#projects" class="text-gray-600 transition hover:text-yellow-600">Projects</a>
                <a href="#contact" class="text-gray-600 transition hover:text-yellow-600">Contact</a>
            </div>
            <div class="md:hidden">
                <button id="menu-toggle" class="text-gray-600 hover:text-yellow-600">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>
        </div>
    </div>
    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden bg-white/95 px-4 pb-4 backdrop-blur-sm md:hidden">
        <a href="#about" class="block py-2 text-gray-600 transition hover:text-yellow-600">About</a>
        <a href="#skills" class="block py-2 text-gray-600 transition hover:text-yellow-600">Skills</a>
        <a href="#projects" class="block py-2 text-gray-600 transition hover:text-yellow-600">Projects</a>
        <a href="#contact" class="block py-2 text-gray-600 transition hover:text-yellow-600">Contact</a>
    </div>
</nav>