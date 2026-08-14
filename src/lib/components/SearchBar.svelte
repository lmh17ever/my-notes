<script lang="ts">
	import { goto } from '$app/navigation';

	let query = $state('');
	let active = $state(false);

	function submit() {
		const q = query.trim();
		if (q) goto(`/search?q=${encodeURIComponent(q)}`);
	}
</script>

<div class="relative mx-auto w-full max-w-xl">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-surface-600-400"
	>
		<circle cx="11" cy="11" r="8"></circle>
		<path d="m21 21-4.3-4.3"></path>
	</svg>
	<input
		type="search"
		class="input w-full pl-9"
		placeholder="Поиск по заметкам…"
		bind:value={query}
		oninput={() => (active = true)}
		onkeydown={(e) => e.key === 'Enter' && submit()}
	/>
</div>
