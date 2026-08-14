<script lang="ts">
	import { page } from '$app/state';
	import type { Note, SearchResult } from '$lib/types';

	// Принимает либо полноценную Note, либо результат поиска (SearchResult).
	let {
		note,
		result,
		compact = false
	}: { note?: Note; result?: SearchResult; compact?: boolean } = $props();

	$effect(() => {
		// допускаем оба варианта
		void note;
		void result;
	});

	function title(): string {
		return note ? note.title : result ? result.title : '';
	}
	function summary(): string {
		return note ? note.summary : result ? result.summary : '';
	}
	function tags(): string[] {
		return note ? note.tags : result ? result.tags : [];
	}
	function category(): string {
		return note ? note.category : result ? result.category : '';
	}
	function slug(): string {
		return note ? note.slug : result ? result.id : '';
	}
	function date(): string | undefined {
		return note ? note.date : undefined;
	}
</script>

<a
	href="/note/{slug()}"
	class="card card-hover flex h-full flex-col gap-2 p-5 no-underline"
>
	<div class="flex items-start justify-between gap-3">
		<h3 class="font-heading text-lg font-semibold leading-snug text-surface-900-100">
			{title()}
		</h3>
	</div>

	{#if summary()}
		<p class="line-clamp-3 text-sm text-surface-700-300">{summary()}</p>
	{/if}

	<div class="mt-auto flex flex-wrap items-center gap-2 pt-2">
		{#if page.url.pathname !== '/search'}
			<span
				class="rounded-full px-2.5 py-0.5 text-xs font-medium"
				style="background: var(--color-primary-500); color: var(--color-surface-50)"
			>
				{category()}
			</span>
		{/if}
		{#each tags().slice(0, compact ? 2 : 4) as tag}
			<span class="chip">{tag}</span>
		{/each}
		{#if date()}
			<span class="ml-auto text-xs text-surface-600-400">{date()}</span>
		{/if}
	</div>
</a>
