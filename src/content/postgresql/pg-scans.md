---
title: "Способы чтения таблиц: Scan в PostgreSQL"
summary: "Seq Scan, Index Scan, Bitmap Index/Heap Scan, Index Only Scan: принцип работы и когда Planner выбирает каждый из них."
tags: [postgresql, scans, seascan, indexscan, bitmap, query-performance]
status: active
date: 2026-08-14
related: [pg-indexes, pg-planner-and-statistics, pg-explain-analyze]
featured: false
---

## Index Scan

Используется, когда строк мало.

```sql
WHERE id = 10
```

План:

```text
Index Scan
Index
 ↓
Heap
 ↓
Row
```

Проблема: много строк → много обращений к Heap.

## Seq Scan

Полное чтение таблицы:

```text
Page 1
Page 2
Page 3
...
```

Может быть быстрее индекса, если:

- нужно много строк;
- таблица маленькая;
- чтение подряд выгоднее.

## Bitmap Scan

Средний вариант между Index Scan и Seq Scan. Используется, когда:

- строк много;
- но не вся таблица.

Процесс:

```text
Index
 ↓
собрать адреса
 ↓
сгруппировать страницы
 ↓
прочитать Heap
```

Bitmap Index Scan находит адреса, а Bitmap Heap Scan затем читает строки из Heap. Когда Planner выбирает Bitmap: много строк, но не вся таблица. Объединение нескольких индексов — `BitmapAnd` / `BitmapOr`.

## Index Only Scan

Если в индексе есть все нужные данные — таблицу можно не читать (идея покрывающего индекса). Требует Visibility Map: если страница помечена «all rows visible», берём данные только из индекса; иначе идём в Heap.