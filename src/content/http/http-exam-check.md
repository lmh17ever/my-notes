---
title: "Проверка знаний HTTP (чек-лист интервьюера)"
summary: "Промпт-чеклист для проверки реальных знаний HTTP как backend-разработчика: темы, важные коды, правила проверки по пониманию механизма."
tags: [http, interview, exam, study-plan]
status: active
date: 2026-08-14
related: [http-basics, http-study-plan, http-security]
featured: false
---

Чек-лист тем для проверки реальных знаний HTTP (не определений наизусть). Проверка понимания на практике, в типичных backend-сценариях.

## Темы

1. **Основы HTTP** — request/response, клиент/сервер, HTTP message, HTTP/1.1 vs HTTP/2 vs HTTP/3 концептуально, statelessness.
2. **HTTP request** — method, URL, path, query parameters, headers, body.
3. **HTTP response** — status code, headers, body.
4. **HTTP methods** — GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS; различие safe / idempotent / cacheable.
5. **Status codes** — группы 1xx–5xx; особенно 200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 409, 422, 429, 500, 502, 503, 504.
6. **Headers** — Content-Type, Accept, Authorization, User-Agent, Host, Content-Length, Cache-Control, ETag, If-None-Match, Location, Cookie, Set-Cookie, Origin, Referer.
7. **Cookies и sessions** — зачем cookies, связь Cookie/Set-Cookie, где хранится, как браузер решает отправлять ли, session-based auth, Secure/HttpOnly/SameSite/Domain/Path/Max-Age/Expires.
8. **Authentication и authorization** — различие; session auth; token auth; Bearer; Basic Auth.
9. **CORS** — зачем, same-origin policy, Origin, preflight, OPTIONS, Access-Control-*.
10. **Redirects** — 301/302/303/307/308, Location, изменение/сохранение метода при redirect.
11. **Caching** — Cache-Control, ETag, If-None-Match, 304, browser cache, conditional requests.
12. **Connection** — TCP connection, keep-alive, HTTP поверх соединения, почему один TCP используется для нескольких запросов.
13. **Практический backend** — ситуации вроде: «Почему сервер вернул 401, а не 403?», «Почему браузер отправляет OPTIONS перед POST?», «Почему вернулся 304 вместо тела?», «Что произойдёт с cookie после Set-Cookie?», «Почему frontend получает CORS error, хотя API работает?», «Как клиент поймёт, куда отправить redirect?».

## Правила проверки

- один вопрос/одна небольшая задача за раз;
- сначала ждать ответ, не показывать правильный заранее;
- не превращать проверку в тест с вариантами;
- просить объяснять своими словами;
- на правильный ответ — коротко подтвердить и усложнить;
- на частичный — указать правильную часть, затем наводящий вопрос;
- на неправильный — подвести вопросами, не выдавать сразу ответ;
- при непонимании принципа — объяснить через простую аналогию, затем снова проверить;
- возвращаться к темам, где были ошибки;
- периодически давать смешанные задачи.

Главный критерий — может ли ученик сам **вывести ответ из понимания механизма**, а не вспомнить определение. Не требовать деталей уровня сетевого инженера, не зарываться в редкие механизмы.