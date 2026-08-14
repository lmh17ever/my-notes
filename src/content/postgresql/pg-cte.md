---
title: "CTE (WITH) в PostgreSQL"
summary: "Что такое CTE (именованный подзапрос), когда материализация помогает и когда мешает, MATERIALIZED / NOT MATERIALIZED в PostgreSQL 12+."
tags: [postgresql, cte, with, sql, query-performance]
status: active
date: 2026-08-14
related: [pg-planner-and-statistics, pg-explain-analyze]
featured: false
---

## Что такое CTE

```sql
WITH users AS (...)
SELECT ...
```

Это **именованный подзапрос**.

## PostgreSQL 12+

PostgreSQL 12+ может «развернуть» CTE (встроить в запрос), а не обязательно материализовать.

### MATERIALIZED

Принудительно сохранить результат:

```sql
WITH x AS MATERIALIZED (...)
```

Полезно, если CTE используется несколько раз.

### NOT MATERIALIZED

Разрешить объединить запрос:

```sql
WITH x AS NOT MATERIALIZED (...)
```

## Когда материализация помогает, а когда мешает

- **Помогает**, если результат используется несколько раз или должен быть зафиксирован.
- **Мешает**, если CTE тормозит запрос (когда более выгодно развернуть его в основной запрос).