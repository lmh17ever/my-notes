---
title: "Cookies и сессии"
summary: "Что такое cookie, где она хранится, отправка на сервер, Set-Cookie, session id, серверные сессии, cookie vs session и ограничения HttpOnly/Secure/SameSite/Domain/Path/Max-Age."
tags: [http, cookies, sessions, authentication, security]
status: active
date: 2026-08-14
related: [http-authentication, http-security, http-headers, http-basics]
featured: false
---

## Что такое cookie

Небольшой фрагмент данных, который сервер передаёт браузеру через `Set-Cookie`, а браузер хранит и отправляет на сервер через заголовок `Cookie` в HTTP-запросах.

- где хранится — в браузере;
- отправка — браузер автоматически добавляет `Cookie` в запросы;
- `session id` — типичное содержимое cookie для идентификации сессии.

## Отличие cookie от session

- **cookie** — данные на стороне клиента (браузера);
- **server session** — состояние, хранящееся на сервере, а cookie хранит только `session id`, связывающий клиента с сессией.

## Атрибуты cookie

- `Secure` — отправлять только по HTTPS;
- `HttpOnly` — не отдавать значение JavaScript (недоступна через `document.cookie`, но браузер по-прежнему отправляет её в HTTP-запросах);
- `SameSite` — отправлять ли cookie в cross-site контексте (например `SameSite=Lax`);
- `Domain` / `Path` — в каких пределах отсылать cookie;
- `Max-Age` / `Expires` — срок жизни.

## Как браузер решает, отправлять ли cookie

Учитывая атрибуты (Secure, SameSite, Domain, Path), браузер сам решает, включать ли cookie в запрос. <code>HttpOnly</code> защищает прежде всего от кражи cookie через JavaScript.