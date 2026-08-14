// Клиентский полнотекстовый поиск по базе знаний через MiniSearch.

import MiniSearch from 'minisearch';
import { getAllNotes } from './catalog';
import type { Note, SearchResult } from './types';

const docs = getAllNotes().map((n: Note) => ({
	id: n.slug,
	title: n.title,
	summary: n.summary,
	tags: n.tags.join(' '),
	category: n.category,
	content: n.raw
}));

const miniSearch = new MiniSearch({
	fields: ['title', 'summary', 'tags', 'content'],
	storeFields: ['title', 'summary', 'tags', 'category'],
	searchOptions: {
		boost: { title: 5, tags: 3, summary: 2, category: 1 },
		prefix: true,
		fuzzy: 0.2
	}
});

miniSearch.addAll(docs);

export function searchNotes(query: string, limit = 20): SearchResult[] {
	const trimmed = query.trim();
	if (!trimmed) return [];
	return miniSearch.search(trimmed).slice(0, limit).map((r) => ({
		id: String(r.id),
		score: r.score,
		title: String((r as unknown as { title?: unknown }).title ?? r.id),
		summary: String((r as unknown as { summary?: unknown }).summary ?? ''),
		tags: Array.isArray((r as unknown as { tags?: unknown }).tags)
			? ((r as unknown as { tags: string[] }).tags)
			: String((r as unknown as { tags?: unknown }).tags ?? '')
					.split(' ')
					.filter(Boolean),
		category: String((r as unknown as { category?: unknown }).category ?? '')
	}));
}
