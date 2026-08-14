---
title: "Индексы в PostgreSQL: B-tree, составные и покрывающие"
summary: "Как устроен индекс как отдельная структура, B-tree, порядок колонок в составных индексах, покрывающие индексы (INCLUDE), когда индекс помогает и мешает."
tags: [postgresql, indexes, btree, sql, query-performance]
status: active
date: 2026-08-14
related: [pg-scans, pg-planner-and-statistics, pg-performance-checklist]
featured: false
---

## Индекс — отдельная структура

Индекс хранит соответствие «значение → адрес строки»:

```text
Index:    value → адрес строки
Пример:   id=100 → page 50, row 3
```

Индекс не хранит всю строку.

## B-tree индекс

Используется чаще всего. Хорош для:

- `=`;
- `<`, `>`;
- `BETWEEN`;
- `ORDER BY`.

Пример:

```sql
CREATE INDEX idx_users_email ON users(email);
```

## Составные индексы

Индекс `(user_id, created_at)` хорошо работает для:

```sql
WHERE user_id = 10
```

и для:

```sql
WHERE user_id = 10
ORDER BY created_at
```

Но плохо для:

```sql
WHERE created_at > '2025-01-01'
```

Главное правило:

> PostgreSQL использует индекс слева направо. `(user_id, created_at)` ≠ `(created_at, user_id)`.

## Когда индекс помогает

Индекс ускоряет:

- `WHERE`;
- `ORDER BY`;
- `JOIN`.

## Что нужно уверенно понимать

- B-tree;
- составные индексы и порядок колонок;
- покрывающие индексы через `INCLUDE`;
- когда индекс помогает и когда мешает (индекс не всегда быстрее Seq Scan).