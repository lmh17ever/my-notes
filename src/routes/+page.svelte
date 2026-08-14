<script lang="ts">
	import { getCategories, getAllNotes, getInboxCount, getNoteCount } from '$lib/catalog';
	import NoteCard from '$lib/components/NoteCard.svelte';

	let categories = getCategories();
	let allNotes = getAllNotes();
	let noteCount = getNoteCount();
	let inboxCount = getInboxCount();
	let recent = allNotes.slice(0, 6);
</script>

<svelte:head>
	<title>База знаний — обзор</title>
</svelte:head>

<section class="mb-8">
	<div class="rounded-lg p-6" style="background: var(--color-surface-100-900)">
		<h1 class="font-heading text-2xl font-bold md:text-3xl">Моя база знаний</h1>
		<p class="mt-2 max-w-2xl text-surface-700-300">
			Структурированные заметки по обучению. Новые хаотичные записи складываются в
			<a href="/inbox" class="text-primary-500 underline">Inbox</a> — ИИ-агент по фиксированному
			промпту раскладывает их по категориям и развивает базу.
		</p>
	</div>
</section>

<section class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
	<div class="card p-4 text-center">
		<p class="text-3xl font-bold text-primary-500">{noteCount}</p>
		<p class="text-sm text-surface-600-400">заметок</p>
	</div>
	<div class="card p-4 text-center">
		<p class="text-3xl font-bold text-primary-500">{categories.length}</p>
		<p class="text-sm text-surface-600-400">категорий</p>
	</div>
	<div class="card p-4 text-center">
		<p class="text-3xl font-bold text-primary-500">{allNotes.filter((n) => n.status === 'active').length}</p>
		<p class="text-sm text-surface-600-400">активных</p>
	</div>
	<a href="/inbox" class="card card-hover p-4 text-center no-underline">
		<p class="text-3xl font-bold text-primary-500">{inboxCount}</p>
		<p class="text-sm text-surface-600-400">в Inbox</p>
	</a>
</section>

{#if categories.length > 0}
	<section class="mb-8">
		<h2 class="mb-3 font-heading text-xl font-semibold">Категории</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each categories as cat}
				<a href="/category/{cat.slug}" class="card card-hover p-5 no-underline">
					<div class="flex items-center justify-between">
						<h3 class="font-heading text-lg font-semibold">{cat.name}</h3>
						<span class="rounded-full px-2.5 py-0.5 text-xs" style="background: var(--color-primary-500)">
							{cat.notes.length}
						</span>
					</div>
					<p class="mt-1 line-clamp-2 text-sm text-surface-700-300">
						{cat.notes[0]?.summary || 'Заметки по теме'}
					</p>
				</a>
			{/each}
		</div>
	</section>
{/if}

{#if recent.length > 0}
	<section>
		<h2 class="mb-3 font-heading text-xl font-semibold">Последние заметки</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each recent as note}
				<NoteCard {note} />
			{/each}
		</div>
	</section>
{:else}
	<section class="card p-8 text-center">
		<p class="text-lg font-semibold">База пока пуста</p>
		<p class="mt-1 text-sm text-surface-600-400">
			Закиньте заметки в <code>inbox/</code> и запустите ИИ-агента по промпту из
			<code>AI-NOTES-PROMPT.md</code> — он создаст категории и наполнит базу.
		</p>
	</section>
{/if}

