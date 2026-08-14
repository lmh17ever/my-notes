---
title: "Конфигурация PostgreSQL для разработчика"
summary: "Смысл настроек work_mem, shared_buffers, effective_cache_size, random_page_cost, seq_page_cost — на уровне backend-разработчика, без тюнинга сервера."
tags: [postgresql, configuration, work_mem, shared_buffers, performance]
status: active
date: 2026-08-14
related: [pg-sort-and-aggregate, pg-performance-checklist]
featured: false
---

Достаточно понимать смысл ключевых настроек, не занимаясь настройкой сервера.

## work_mem

Память на операцию: `Sort`, `Hash`, `Aggregate`.

- мало → сортировка/хеш уходит на диск;
- много → быстрее, но опасно при большом количестве соединений.

## shared_buffers

Кеш PostgreSQL.

## effective_cache_size

Не выделяет память. Подсказывает Planner:

> «Считай, что столько памяти доступно для кеширования».

## random_page_cost

Цена случайного чтения:

- HDD → random дорого;
- SSD → random дешевле.

## seq_page_cost

Цена последовательного чтения страницы (входит в базовые параметры Planner).

## ВАЖНО

Не нужно уметь подбирать идеальные значения — достаточно понимать смысл каждой настройки и как они влияют на решения Planner.