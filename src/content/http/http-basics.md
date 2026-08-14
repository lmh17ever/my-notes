---
title: "Основы HTTP: request/response, методы, статус-коды"
summary: "HTTP как протокол request/response, структура запроса и ответа, методы и их идемпотентность/безопасность/cachability, группы статус-кодов и важные коды."
tags: [http, protocols, methods, status-codes]
status: active
date: 2026-08-14
related: [http-headers, http-study-plan, network-foundations]
featured: false
---

## Модель request/response

HTTP — протокол передачи гипертекста с моделью «запрос–ответ» (клиент/сервер). Протокол **stateless** (без состояния между запросами).

## Структура HTTP-запроса

```http
GET /users HTTP/1.1
Host: example.com
Authorization: Bearer token
```

## Структура HTTP-ответа

```http
HTTP/1.1 200 OK

Content-Type: application/json
```

## Методы

- `GET`, `POST`, `PUT`, `PATCH`, `DELETE` — основные.
- `HEAD`, `OPTIONS` — служебные.

Важно различать три свойства методов:

- **safe** — не меняет состояние сервера (например GET);
- **idempotent** — повторение запроса даёт тот же результат (GET, PUT, DELETE, HEAD);
- **cacheable** — ответ можно кешировать (например GET).

Чем PUT отличается от PATCH: PUT заменяет ресурс целиком, PATCH — частично.

## Статус-коды

Группы:

- **1xx** — информационные;
- **2xx** — успех;
- **3xx** — перенаправления;
- **4xx** — ошибки клиента;
- **5xx** — ошибки сервера.

Важные коды:

- 200 OK;
- 201 Created;
- 204 No Content;
- 301 / 302 — редиректы (перемещён постоянно / временно);
- 304 Not Modified;
- 400 Bad Request;
- 401 Unauthorized;
- 403 Forbidden;
- 404 Not Found;
- 409 Conflict;
- 422 Unprocessable Entity;
- 429 Too Many Requests;
- 500 / 502 / 503 / 504.

## Redirects

Коды редиректа: 301, 302, 303, 307, 308. Заголовок `Location` указывает, куда отправить. Важно понимать, меняется ли HTTP-метод при редиректе (некоторые коды сохраняют метод, некоторые — нет).