---
title: "PostgreSQL: оставшиеся темы и план занятий"
summary: "Что осталось по PostgreSQL (Bitmap Scan, EXPLAIN ANALYZE, параллельность, сортировки, агрегации, CTE), что пропустить и оценка по занятиям."
tags: [postgresql, study-plan, roadmap]
status: active
date: 2026-08-14
related: [learning-goals-and-priorities, pg-explain-analyze, pg-scans, pg-performance-checklist]
featured: false
---

## Осталось обязательно

### 1. Bitmap Scan ⭐⭐⭐⭐⭐

Bitmap Index Scan, Bitmap Heap Scan, почему это не Index Scan и не Seq Scan, когда Planner выбирает Bitmap, объединение нескольких индексов (`BitmapAnd`, `BitmapOr`). Последняя крупная тема по алгоритмам чтения.

### 2. EXPLAIN ANALYZE (углубление) ⭐⭐⭐⭐⭐

Начато, но не закончено. Осталось: дерево выполнения целиком, чтение больших планов, почему дочерние `cost` складываются, `Planning Time`, `Execution Time`, `Buffers`, `Rows Removed by Filter`, `Rows Removed by Index Recheck`, `Heap Fetches`, `Recheck Cond`, анализ реальных планов.

### 3. Параллельное выполнение ⭐⭐⭐⭐☆

Parallel Seq Scan, Gather, Gather Merge, сколько воркеров запускается, когда Planner решает распараллелить запрос.

### 4. Сортировки ⭐⭐⭐⭐☆

Sort, Top-N Sort, External Sort, Incremental Sort, когда сортировка уходит на диск, связь с `work_mem`. Без внутренних алгоритмов.

### 5. Агрегации ⭐⭐⭐⭐☆

Aggregate, Hash Aggregate, Group Aggregate, DISTINCT, COUNT, GROUP BY.

### 6. CTE и материализация ⭐⭐⭐☆☆

WITH, MATERIALIZED, NOT MATERIALIZED, когда CTE тормозит запрос.

### 7. Тонкая оптимизация ⭐⭐⭐⭐☆

Что реально используют при оптимизации: почему запрос медленный, в каком порядке искать проблему, как не оптимизировать вслепую, какие параметры чаще всего влияют на производительность. Уметь думать как разработчик, а не DBA:

```text
1. Seq Scan?
2. Rows?
3. Buffers?
4. Sort?
5. Join?
6. Index?
```

### 8. Статистика Planner (углубление) ⭐⭐☆☆☆

Если захочешь глубже: `CREATE STATISTICS`, extended statistics, MCV, гистограммы, selectivity. Это скорее уровень DBA.

### 9. Конфигурация ⭐⭐☆☆☆

Не обязательна, но полезно понимать: `shared_buffers`, `work_mem`, `maintenance_work_mem`, `effective_cache_size`, `random_page_cost`, `seq_page_cost`.

## Что уже изучено (~85% важного)

✅ устройство хранения данных; ✅ MVCC; ✅ VACUUM; ✅ индексы; ✅ покрывающие индексы; ✅ Planner; ✅ Seq Scan / Index Scan; ✅ Nested Loop / Hash Join / Merge Join; ✅ основы чтения `EXPLAIN ANALYZE`.

Оставшиеся темы — про то, как **интерпретировать реальные планы и находить узкие места**; именно они превращают теорию в практический навык.

## Пропускаем до лучших времен

Extended Statistics, MCV, гистограммы, `CREATE STATISTICS`, тонкие параметры Planner, внутренности WAL, устройство B-tree по страницам, pageinspect. Детали внутренних структур и тюнинг production — следующий уровень (autovacuum, replication, partitioning, sharding, connection pooling).

## Оценка по времени

- EXPLAIN — 2 занятия;
- Параллельность — 1 занятие;
- Сортировки — 1–2 занятия;
- Агрегации — 1–2 занятия;
- Практическая оптимизация — 2 занятия;
- CTE + конфигурация — 1 занятие.

Итого ~8–10 занятий, после которых PostgreSQL можно считать завершённым на уровне сильного backend-разработчика. Дальше — переход к HTTP, Linux и остальному фундаменту.

## Базовые причины медленных запросов

- **Нет индекса**: `Seq Scan`, 10 млн строк → 100 результатов.
- **Неподходящий индекс**: есть `(user_id)`, но запрос `WHERE user_id = 1 ORDER BY created_at` → появляется `Sort`.
- **Неверная оценка Planner**: `rows=10`, а `actual rows=500000`.
- **Слишком много работы после получения данных**: `Index Scan 10ms` + `Sort 5000ms`.