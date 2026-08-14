# База знаний (my-notes)

Локальный сайт-база знаний на **SvelteKit + Svelte 5 (runes) + Vite + MDsveX + Skeleton (Tailwind v4) + MiniSearch**.

## Быстрый старт

```sh
npm install
npm run dev          # dev-сервер (обычно http://localhost:5173)
npm run build        # продакшн-сборка (adapter-node → папка build/)
npm run preview      # предпросмотр продакшн-сборки
npm run check        # svelte-check / типы
```

## Структура

```
src/content/<категория>/<заметка>.md   <- каноническая база (рендерит сайт)
inbox/                                 <- хаос: сюда кидаются новые заметки
src/lib/catalog.ts                     <- чтение content через import.meta.glob
src/lib/search.ts                      <- полнотекстовый поиск (MiniSearch)
src/routes/                            <- страницы сайта
AI-NOTES-PROMPT.md                     <- ⭐ фиксированный промпт для ИИ-агента
CONTENT-GUIDE.md                       <- конвенции базы (frontmatter, категории)
```

## Рабочий процесс

1. **Складывай заметки в `inbox/`** — беспорядочно, любые мысли/вопросы/конспекты
   вперемешку (можно всё в один файл).
2. Запусти **любого ИИ-агента** с промптом из `AI-NOTES-PROMPT.md` и контекстом
   из `CONTENT-GUIDE.md`. Агент прочитает `inbox/`, разобьёт на блоки, сам создаст
   категории и файлы в `src/content/`, уберёт обработанное из `inbox/`.
3. Обнови страницу сайта — новые заметки и категории появятся автоматически.

## Правила заметок (кратко)

- Одна заметка = одна тема.
- Обязательный frontmatter: `title`, `summary`, `tags`, `status`, `date`.
- Имя файла — kebab-case slug.
- См. `CONTENT-GUIDE.md` для полной схемы.

## Страницы

- `/` — дашборд: категории, статистика, последние заметки.
- `/category/<slug>` — все заметки категории.
- `/note/<slug>` — полный рендер заметки (MDsveX + подсветка кода shiki) + связанные.
- `/search` — полнотекстовый поиск (MiniSearch: prefix + fuzzy, буст названий).
- `/inbox` — что сейчас ждёт обработки.
