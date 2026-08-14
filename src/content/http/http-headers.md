---
title: "HTTP Headers"
summary: "Как сервер и клиент передают метаданные: общие, request и response заголовки, важные заголовки и их назначение."
tags: [http, headers, protocols]
status: active
date: 2026-08-14
related: [http-basics, http-cookies-and-sessions, http-caching, http-cors]
featured: false
---

Заголовки — как сервер и клиент передают метаданные.

## Важные заголовки

- `Host` — хост/домен запроса;
- `Content-Type` — тип тела (например `application/json`);
- `Content-Length` — длина тела;
- `Accept` — какие типы ответа принимает клиент;
- `Authorization` — авторизация (например `Bearer token`, Basic);
- `User-Agent` — клиент/браузер;
- `Cache-Control` — управление кешированием;
- `Cookie` / `Set-Cookie` — куки;
- `Referer` — источник перехода;
- `Origin` — источник (scheme + host + port).

## Дополнительные (из практики)

- `Vary` — по каким заголовкам варьируется ответ (влияет на кеш);
- `Allow` — разрешённые методы;
- `Connection` / `Transfer-Encoding` — транспортные детали;
- `Content-Encoding` — сжатие тела (gzip/br);
- `Strict-Transport-Security` (HSTS) — требовать HTTPS;
- `X-Content-Type-Options` — защита от MIME-sniffing;
- `X-Frame-Options` — защита от clickjacking.