// Каталог заметок. Строится из папки src/content через import.meta.glob:
// каждый .md компилируется mdsvex в Svelte-компонент (default) + frontmatter (metadata).

import type { Component } from 'svelte';
import type { Note, NoteMeta, NoteStatus, Category, InboxFile } from './types';

interface MdModule {
	default: Component;
	metadata: NoteMeta;
}

// Собранные компоненты + frontmatter.
// Типизируем через Record<string, MdModule> (import.meta.glob с eager).
const contentModules = import.meta.glob('/src/content/**/*.md', {
	eager: true
}) as unknown as Record<string, MdModule>;

// Сырой markdown (для полнотекстового поиска).
const rawModules = import.meta.glob('/src/content/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

// Файлы в inbox/ (сырьё для ИИ-агента).
const inboxModules = import.meta.glob('/inbox/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const CONTENT_PREFIX = '/src/content/';

function slugFromFilename(filename: string): string {
	return filename.replace(/\.md$/i, '');
}

function humanizeCategory(slug: string): string {
	return slug
		.split(/[-_]/)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

function buildNotes(): Note[] {
	const notes: Note[] = [];
	for (const path of Object.keys(contentModules)) {
		const mod = contentModules[path];
		const rest = path.slice(CONTENT_PREFIX.length);
		const parts = rest.split('/');
		const filename = parts[parts.length - 1];
		const category = parts.length > 1 ? parts.slice(0, -1).join('/') : 'general';
		const slug = slugFromFilename(filename);
		const meta = mod.metadata ?? {};

		notes.push({
			slug,
			category,
			path,
			title: (meta.title as string)?.trim() || slugFromFilename(filename).replace(/[-_]/g, ' '),
			summary: (meta.summary as string)?.trim() || '',
			tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
			status: (meta.status as NoteStatus) || 'active',
			date: (meta.date as string) || undefined,
			related: Array.isArray(meta.related) ? meta.related.map(String) : [],
			featured: Boolean(meta.featured),
			component: mod.default,
			raw: rawModules[path] ?? ''
		});
	}

	// Сначала active, потом draft/archived; внутри — по дате (новые сверху), затем по названию.
	notes.sort((a, b) => {
		const rank = (n: Note) => (n.status === 'active' ? 0 : n.status === 'draft' ? 1 : 2);
		if (rank(a) !== rank(b)) return rank(a) - rank(b);
		const da = a.date ? new Date(a.date).getTime() : 0;
		const db = b.date ? new Date(b.date).getTime() : 0;
		if (da !== db) return db - da;
		return a.title.localeCompare(b.title, 'ru');
	});

	return notes;
}

const allNotes = buildNotes();

export function getAllNotes(): Note[] {
	return allNotes;
}

export function getNoteCount(): number {
	return allNotes.length;
}

export function getCategories(): Category[] {
	const map = new Map<string, Note[]>();
	for (const note of allNotes) {
		if (!map.has(note.category)) map.set(note.category, []);
		map.get(note.category)!.push(note);
	}
	return [...map.entries()]
		.map(([slug, notes]) => ({ name: humanizeCategory(slug), slug, notes }))
		.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

export function getCategory(categorySlug: string): Category | undefined {
	return getCategories().find((c) => c.slug === categorySlug);
}

export function getNoteBySlug(slug: string): Note | undefined {
	return allNotes.find((n) => n.slug === slug);
}

/** Связанные заметки: явно указанные в frontmatter + другие заметки той же категории. */
export function getRelated(note: Note, limit = 4): Note[] {
	const seen = new Set<string>([note.slug]);
	const out: Note[] = [];
	for (const rel of note.related) {
		const n = getNoteBySlug(rel);
		if (n && !seen.has(n.slug)) {
			seen.add(n.slug);
			out.push(n);
		}
	}
	for (const n of allNotes) {
		if (seen.size >= limit) break;
		if (n.category === note.category && !seen.has(n.slug)) {
			seen.add(n.slug);
			out.push(n);
		}
	}
	return out.slice(0, limit);
}

export function getFeaturedNotes(limit = 6): Note[] {
	return allNotes.filter((n) => n.featured).slice(0, limit);
}

export function getInbox(): InboxFile[] {
	return Object.entries(inboxModules)
		.map(([path, content]) => ({
			name: path.split('/').pop() ?? path,
			path,
			content
		}))
		.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

export function getInboxCount(): number {
	return Object.keys(inboxModules).length;
}
