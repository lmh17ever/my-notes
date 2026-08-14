<script lang="ts">
	import { getInbox, getInboxCount } from '$lib/catalog';

	let files = getInbox();
	let count = getInboxCount();
</script>

<svelte:head>
	<title>Inbox — База знаний</title>
</svelte:head>

<div class="mx-auto max-w-3xl">
	<h1 class="font-heading text-2xl font-bold">📥 Inbox — необработанные заметки</h1>
	<p class="mt-2 text-surface-700-300">
		Сюда складываются все новые хаотичные записи (можно всё в один файл, любые мысли вперемешку).
		Когда накопится — запустите любого ИИ-агента с промптом из
		<code class="chip">AI-NOTES-PROMPT.md</code>: он разберёт содержимое, создаст категории
		и файлы в <code class="chip">src/content/</code> и разовьёт базу знаний.
	</p>

	<div class="mt-4 flex flex-wrap items-center gap-3">
		<span class="chip">Файлов в ожидании: <strong>{count}</strong></span>
		<a href="/" class="btn preset-outlined">← К обзору</a>
	</div>

	{#if files.length === 0}
		<section class="card mt-6 p-8 text-center text-surface-600-400">
			Inbox пуст — можно добавлять новые заметки в <code>inbox/</code>.
		</section>
	{/if}

	{#each files as file}
		<details class="card mt-6 overflow-hidden" open={files.length === 1}>
			<summary class="cursor-pointer select-none px-5 py-3 font-heading font-semibold">
				{file.name}
			</summary>
			<pre
				class="max-h-[70vh] overflow-auto border-t border-surface-200-800 p-5 text-sm leading-relaxed"
				style="background: var(--color-surface-100-900); white-space: pre-wrap; word-break: break-word"
			>{file.content}</pre>
		</details>
	{/each}
</div>
