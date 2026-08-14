<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	let { children } = $props();

	let dark = $state(false);

	onMount(() => {
		dark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
	}
</script>

<div class="flex min-h-screen">
	<Sidebar />

	<div class="flex min-w-0 flex-1 flex-col">
		<header
			class="sticky top-0 z-20 flex items-center gap-4 border-b border-surface-200-800 bg-surface-100-900/80 px-5 py-3 backdrop-blur"
		>
			<a href="/" class="font-heading text-lg font-semibold md:hidden">База знаний</a>
			<SearchBar />
			<button
				class="btn btn-icon ml-auto"
				aria-label="Переключить тему"
				title="Переключить тему"
				onclick={toggleTheme}
			>
				{dark ? '🌙' : '☀️'}
			</button>
		</header>

		<main class="flex-1 px-5 py-6 md:px-8">{@render children()}</main>

		<footer
			class="border-t border-surface-200-800 px-6 py-3 text-center text-xs text-surface-600-400"
		>
			Локальная база знаний · SvelteKit + MDsveX + Skeleton + MiniSearch
		</footer>
	</div>
</div>

