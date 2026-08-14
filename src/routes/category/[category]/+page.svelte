<script lang="ts">
	import { page } from '$app/state';
	import { getCategory } from '$lib/catalog';
	import NoteCard from '$lib/components/NoteCard.svelte';

	let cat = $derived(getCategory(String(page.params.category)));
</script>

<svelte:head>
	<title>{cat?.name ?? 'Категория'} — База знаний</title>
</svelte:head>

{#if cat}
	<div class="mb-6">
		<a href="/" class="text-sm text-surface-600-400 hover:underline">← Обзор</a>
		<h1 class="mt-1 font-heading text-2xl font-bold md:text-3xl">{cat.name}</h1>
		<p class="mt-1 text-surface-700-300">{cat.notes.length} заметок</p>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each cat.notes as note}
			<NoteCard {note} />
		{/each}
	</div>
{:else}
	<section class="card p-8 text-center">
		<p class="text-lg font-semibold">Категория не найдена</p>
		<a href="/" class="mt-2 inline-block text-primary-500 underline">Вернуться к обзору</a>
	</section>
{/if}
