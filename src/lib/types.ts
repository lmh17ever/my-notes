// Типы базы знаний.

import type { Component } from 'svelte';

export type NoteStatus = 'active' | 'draft' | 'archived';

/** Frontmatter-схема заметки (должна соблюдаться ИИ-агентом — см. CONTENT-GUIDE.md). */
export interface NoteMeta {
	title?: string;
	summary?: string;
	tags?: string[];
	status?: NoteStatus;
	date?: string;
	related?: string[];
	featured?: boolean;
	[key: string]: unknown;
}

/** Готовая заметка после обработки каталогом. */
export interface Note {
	/** Уникальный идентификатор = имя файла без `.md`. */
	slug: string;
	/** Категория = имя папки. */
	category: string;
	/** Глоб-ключ (путь к md-модулю). */
	path: string;
	title: string;
	summary: string;
	tags: string[];
	status: NoteStatus;
	date?: string;
	related: string[];
	featured: boolean;
	/** Собранный mdsvex Svelte-компонент заметки. */
	component: Component;
	/** Сырой markdown (для полнотекстового поиска). */
	raw: string;
}

export interface Category {
	name: string;
	slug: string;
	notes: Note[];
}

/** Результат поиска MiniSearch. */
export interface SearchResult {
	id: string;
	score: number;
	title: string;
	summary: string;
	tags: string[];
	category: string;
}

/** Сырой файл из inbox/. */
export interface InboxFile {
	name: string;
	path: string;
	content: string;
}
