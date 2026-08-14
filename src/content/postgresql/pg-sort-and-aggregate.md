---
title: "Сортировка и агрегация в PostgreSQL"
summary: "Sort, Top-N Sort, External Sort, Hash Aggregate и Group Aggregate: как устроены, связь с work_mem и когда сортировка уходит на диск."
tags: [postgresql, sort, aggregate, work_mem, query-performance]
status: active
date: 2026-08-14
related: [pg-configuration, pg-explain-analyze, pg-performance-checklist]
featured: false
---

## Sort

Используется для:

- `ORDER BY`;
- `GROUP BY`;
- `DISTINCT`.

## Top-N Sort

Для `ORDER BY x LIMIT 20` не нужно сортировать всё.

## External Sort

Если не хватает памяти:

```text
work_mem
 ↓
диск
```

## Aggregate

### Hash Aggregate

Создаёт Hash Map:

```text
city → count
```

Быстро. Плохо: много групп → много памяти.

### Group Aggregate

Использует сортировку. Если данные уже отсортированы (например, есть индекс по `(city)`):

```text
Index Scan
 ↓
Group Aggregate
```

может быть быстрее — без отдельной сортировки.

## Выбор между Hash/Group Aggregate

- **Hash Aggregate** — если много строк и мало групп (например, 100 млн пользователей и 100 городов).
- **Group Aggregate** — если данные уже отсортированы.

## Связь с work_mem

Память работы (Sort, Hash, Aggregate):

- данных мало → сортировка в памяти;
- данных много → проверить `work_mem`; если мало — `External Sort` (уход на диск).