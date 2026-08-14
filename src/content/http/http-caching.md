---
title: "Кэширование HTTP"
summary: "Зачем нужен HTTP cache, где может быть кеш (браузер/proxy/CDN/backend), Cache-Control, ETag, условные запросы и 304."
tags: [http, caching, cache-control, etag, performance]
status: active
date: 2026-08-14
related: [http-headers, http-basics, http-study-plan]
featured: false
---

## Зачем нужен cache

Ускорение повторных запросов и снижение нагрузки. Кеш может быть на нескольких уровнях:

```text
браузер → proxy → CDN → backend
```

## Cache-Control

Директивы:

- `max-age`;
- `no-cache`;
- `no-store`;
- `private`;
- `public`.

## Условные запросы

- `ETag` (валидатор версии ресурса) + `If-None-Match`;
- `Last-Modified` + `If-Modified-Since`;
- ответ `304 Not Modified` — браузер/кеш может переиспользовать закешированную копию (сервер вернул 304 вместо тела).

## Практика

- `Age` заголовок, `cf-cache-status: HIT` (CDN кеш);
- проверка ETag / Last-Modified / 304 через `curl`.