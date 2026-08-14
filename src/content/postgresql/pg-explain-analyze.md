---
title: "Чтение EXPLAIN ANALYZE в PostgreSQL"
summary: "Как читать план выполнения снизу вверх, показатели actual time, rows, loops, Buffers, и универсальный алгоритм поиска самого дорогого узла."
tags: [postgresql, explain, analyze, query-performance, diagnostics]
status: active
date: 2026-08-14
related: [pg-performance-checklist, pg-planner-and-statistics, pg-scans, pg-joins]
featured: true
---

Главная цель:

> Найти узел, который реально тратит время, понять почему он дорогой и что можно изменить.

## Запуск

```sql
EXPLAIN ANALYZE
SELECT ...;
```

Для более подробной информации:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT ...;
```

## Как читать план

План читается **снизу вверх**. Сначала выполняются дочерние узлы.

```text
Index Scan
 ↓
Sort
 ↓
Limit
```

## Первый шаг — найти самое дорогое место

Смотри `actual time`:

```text
Seq Scan   (actual time=0.100..5000)
Sort       (actual time=5000..6000)
```

Проблема — `Sort`, а не `Seq Scan`.

## actual time

Формат `actual time=A..B`:

- **первое число** — когда появилась первая строка (например, 100 мс до первого результата);
- **второе число** — когда узел полностью закончил работу (например, вся работа через 5000 мс).

## rows

Количество строк, которое оценил Planner. Сравнивать с `actual rows`:

- хорошо: `rows=1000`, `actual rows=900`;
- плохо: `rows=1000`, `actual rows=500000` → причина: плохая статистика, неправильная оценка Planner, плохой план.

## loops

Сколько раз выполнялся узел. Общее время = `actual time × loops`. Например `actual time=0.1..1`, `loops=100000` → ≈100 секунд работы.

## Planning Time vs Execution Time

```text
Planning Time: 5 ms
Execution Time: 5000 ms
```

Проблема — в выполнении, а не в планировании. Если планирование большое (например 1000 мс), значит запрос слишком сложный (много таблиц / вариантов JOIN).

## Buffers

Использовать `EXPLAIN (ANALYZE, BUFFERS)`:

- `shared hit` — страница уже в памяти (хорошо);
- `shared read` — чтение с диска (много = много физического чтения).

## Heap Fetches / Recheck Cond

- `Heap Fetches` — обращения к Heap (связано с Visibility Map / Index Only Scan).
- `Recheck Cond` — в Bitmap Scan: Bitmap нашёл кандидатов, но PostgreSQL проверяет условие ещё раз в Heap. Нормальное поведение.

## Rows Removed by Filter

```text
Rows Removed by Filter: 999900
```

PostgreSQL прочитал много строк, но выбросил почти всё. Частая причина — отсутствует индекс.

## Типичные проблемы

- **Seq Scan вместо Index Scan** → проверить: сколько строк, есть ли индекс, статистику.
- **Sort занимает всё время** → нужен ли индекс под ORDER BY, есть ли LIMIT, размер сортировки.
- **Nested Loop медленный** → проверить loops, индекс внутри, порядок JOIN.
- **Hash Join медленный** → проверить размер Hash, Batches, work_mem.
- **rows сильно отличаются** → `ANALYZE table;`.

## Универсальный алгоритм

```text
1. EXPLAIN ANALYZE + BUFFERS
2. Смотри Execution Time
3. Найди самый дорогой узел
4. Проверь: actual time, rows, loops, buffers
5. Сравни ожидания Planner и реальность
6. Определи тип проблемы: индекс / сортировка / JOIN / память / статистика
7. Только потом меняй запрос или индекс
```

## Самые важные вещи

1. `actual time` показывает реальную стоимость узла.
2. `rows` показывает, насколько Planner угадал.
3. `loops` показывает скрытую стоимость повторений.
4. Самый верхний узел не всегда проблема.
5. Индекс не всегда быстрее Seq Scan.
6. Сначала измерить — потом оптимизировать.