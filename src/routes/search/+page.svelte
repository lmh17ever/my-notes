<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { searchNotes } from '$lib/search';
	import NoteCard from '$lib/components/NoteCard.svelte';

	let query = $derived(String(page.url.searchParams.get('q') ?? ''));
	let results = $derived(query.trim() ? searchNotes(query) : []);
	let input = $state(query);
</script>

<svelte:head>
	<title>Поиск — База знаний</title>
</svelte:head>

<div class="mx-auto max-w-4xl">
	<h1 class="mb-4 font-heading text-2xl font-bold">Поиск по базе знаний</h1>

	<form
		class="mb-6 flex gap-2"
		onsubmit={(e) => {
			e.preventDefault();
			goto(`/search?q=${encodeURIComponent(input.trim())}`);
		}}
	>
		<input
			type="search"
			class="input flex-1"
			placeholder="Что ищем?"
			bind:value={input}
		/>
		<button class="btn preset-filled" type="submit">Найти</button>
	</form>

	{#if query.trim()}
		<p class="mb-4 text-sm text-surface-600-400">
			Найдено: <strong>{results.length}</strong> · запрос «{query}»
		</p>

		{#if results.length > 0}
			<div class="grid gap-4 sm:grid-cols-2">
				{#each results as r}
					<NoteCard result={r} />
				{/each}
			</div>
		{:else}
			<section class="card p-8 text-center">
				<p class="text-lg font-semibold">Ничего не найдено</p>
				<p class="mt-1 text-sm text-surface-600-400">Попробуйте другой запрос или проверьте Inbox.</p>
			</section>
		{/if}
	{:else}
		<section class="card p-8 text-center text-surface-600-400">
			Начните вводить запрос — ищите по названиям, тегам и содержанию заметок.
		</section>
	{/if}
</div>
