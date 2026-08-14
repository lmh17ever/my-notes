import adapter from '@sveltejs/adapter-node';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createHighlighter } from 'shiki';

/** @type {import('shiki').Highlighter} */
const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: [
		'javascript',
		'typescript',
		'python',
		'sql',
		'bash',
		'json',
		'yaml',
		'go',
		'rust',
		'css',
		'html',
		'svelte',
		'docker',
		'text',
		'http'
	]
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	smartypants: false,
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = highlighter.codeToHtml(code, { lang, theme: 'github-dark' });
			return `{@html \`${escapeSvelte(html)}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
