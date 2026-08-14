<script lang="ts">
	import { getCategories, getInboxCount, getNoteCount } from '$lib/catalog';
	import { page } from '$app/state';

	// $state — набор раскрытых категорий (Svelte 5 runes).
	const expanded: Record<string, boolean> = {};

	let inboxCount = getInboxCount();
	let noteCount = getNoteCount();
	let categories = getCategories();

	function activeCategory(): string | undefined {
		const p = page.params;
		return 'category' in p ? String(p.category) : undefined;
	}

	function isActiveCategory(cat: string): boolean {
		return activeCategory() === cat;
	}
</script>

<aside
	class="hidden md:flex w-72 shrink-0 flex-col border-r border-surface-200-800 bg-surface-100-900"
>
	<div class="flex items-center gap-2 px-5 py-4">
		<div
			class="grid size-9 place-items-center rounded-lg text-surface-50"
			style="background: var(--color-primary-600)"
		>
			<span class="font-bold">З</span>
		</div>
		<div class="leading-tight">
			<p class="font-heading text-base font-semibold">База знаний</p>
			<p class="text-xs text-surface-700-300">{noteCount} заметок</p>
		</div>
	</div>

	<div class="px-3">
		<hr class="hr" />
	</div>

	<nav class="flex-1 overflow-y-auto px-3 py-3">
		<a
			href="/"
			class="nav-link"
			class:nav-link-active={page.url.pathname === '/'}
		>
			🏠 Обзор
		</a>
		<a
			href="/search"
			class="nav-link"
			class:nav-link-active={page.url.pathname === '/search'}
		>
			🔍 Поиск
		</a>

		<p class="mt-5 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-surface-600-400">
			Категории
		</p>

		{#each categories as cat}
			{@const isOpen = expanded[cat.slug] ?? isActiveCategory(cat.slug)}
			<div class="mb-0.5">
				<button
					class="nav-link w-full"
					class:nav-link-active={isActiveCategory(cat.slug)}
					onclick={() => (expanded[cat.slug] = !isOpen)}
				>
					<span class="flex-1 text-left">{cat.name}</span>
					<span class="rounded-full px-2 text-xs text-surface-600-400">{cat.notes.length}</span>
					<span class="text-xs text-surface-600-400">{isOpen ? '▾' : '▸'}</span>
				</button>
				{#if isOpen}
					<div class="ml-4 border-l border-surface-200-800">
						{#each cat.notes as note}
							<a
								href="/note/{note.slug}"
								class="nav-link nav-link-sub"
								class:nav-link-active={page.params.slug === note.slug}
								title={note.summary}
							>
								{#if note.status !== 'active'}
									<span class="mr-1 text-xs" title="статус: {note.status}">
										{note.status === 'draft' ? '✏️' : '🗄️'}
									</span>
								{/if}
								{note.title}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</nav>

	<div class="border-t border-surface-200-800 p-3">
		<a
			href="/inbox"
			class="btn preset-outlined w-full justify-start"
			class:preset-filled={page.url.pathname === '/inbox'}
		>
			📥 Inbox
			{#if inboxCount > 0}
				<span class="ml-auto rounded-full px-2 text-xs" style="background: var(--color-primary-500)">
					{inboxCount}
				</span>
			{/if}
		</a>
	</div>
</aside>
