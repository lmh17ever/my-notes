---
title: "Алгоритмы JOIN в PostgreSQL"
summary: "Nested Loop, Hash Join и Merge Join: принцип работы, требования и когда Planner выбирает каждый алгоритм."
tags: [postgresql, joins, nestedloop, hashjoin, mergejoin, query-performance]
status: active
date: 2026-08-14
related: [pg-planner-and-statistics, pg-performance-checklist, pg-explain-analyze]
featured: false
---

## Nested Loop

- Принцип: для каждой строки внешней таблицы ищем совпадения во внутренней.
- Эффективен при **малом** количестве строк во внешней таблице и наличии **индекса** во внутренней.

Пример:

```text
10 users
 ↓
Index Scan orders
```

Плохой случай:

```text
10 млн users
 ↓
Index Scan orders
```

## Hash Join

- Принцип: строится **хеш-таблица по меньшей таблице**, затем один проход по второй.
- Выгоднее Nested Loop, когда нужно сопоставить две большие таблицы без индекса.

## Merge Join

- Принцип: работает на двух **отсортированных** потоках записей, алгоритм с двумя указателями.
- Требует сортировки обеих сторон (или уже отсортированные данные).
- Хорош для больших отсортированных наборов.

## Краткая таблица выбора

| Условие | Выбор |
|---|---|
| мало строк + JOIN | Nested Loop |
| большие таблицы + JOIN | Hash Join |
| уже отсортированные данные | Merge Join |