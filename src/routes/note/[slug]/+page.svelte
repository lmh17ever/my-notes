<script lang="ts">
	import { page } from '$app/state';
	import { getNoteBySlug, getRelated } from '$lib/catalog';

	let note = $derived(getNoteBySlug(String(page.params.slug)));
	let related = $derived(note ? getRelated(note) : []);

	const statusLabel: Record<string, string> = {
		active: 'Активная',
		draft: 'Черновик',
		archived: 'Архив'
	};
</script>

<svelte:head>
	<title>{note?.title ?? 'Заметка'} — База знаний</title>
</svelte:head>

{#if note}
	{@const Cmp = note.component}
	<article class="mx-auto max-w-3xl">
		<nav class="mb-4 flex flex-wrap items-center gap-2 text-sm text-surface-600-400">
			<a href="/" class="hover:underline">Обзор</a>
			<span>/</span>
			<a href="/category/{note.category}" class="hover:underline">{note.category}</a>
			<span>/</span>
			<span>{note.title}</span>
		</nav>

		<header class="mb-6">
			<h1 class="font-heading text-3xl font-bold leading-tight">{note.title}</h1>

			<div class="mt-3 flex flex-wrap items-center gap-2">
				{#if note.status !== 'active'}
					<span class="chip" style="color: var(--color-warning-500)">
						{statusLabel[note.status] ?? note.status}
					</span>
				{/if}
				{#each note.tags as tag}
					<span class="chip">{tag}</span>
				{/each}
				{#if note.date}
					<span class="ml-auto text-sm text-surface-600-400">{note.date}</span>
				{/if}
			</div>

			{#if note.summary}
				<p class="mt-4 text-lg text-surface-700-300">{note.summary}</p>
			{/if}

			<hr class="hr mt-6" />
		</header>

		<div class="note-content">
			<Cmp />
		</div>

		{#if related.length > 0}
			<footer class="mt-12 rounded-lg p-5" style="background: var(--color-surface-100-900)">
				<h2 class="mb-3 font-heading text-lg font-semibold">Связанные заметки</h2>
				<ul class="grid gap-2">
					{#each related as r}
						<li>
							<a href="/note/{r.slug}" class="hover:underline">
								<span class="mr-2 text-primary-500">•</span>{r.title}
							</a>
						</li>
					{/each}
				</ul>
			</footer>
		{/if}
	</article>
{:else}
	<section class="mx-auto max-w-3xl card p-8 text-center">
		<p class="text-lg font-semibold">Заметка не найдена</p>
		<a href="/" class="mt-2 inline-block text-primary-500 underline">Вернуться к обзору</a>
	</section>
{/if}
