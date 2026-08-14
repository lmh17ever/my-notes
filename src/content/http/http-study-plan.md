---
title: "План изучения HTTP"
summary: "Цель и структура блока HTTP: основы сети, HTTP, headers, cookies, CORS, кэширование, REST, TLS, HTTP/2-3, практика и контрольные вопросы."
tags: [http, study-plan, backend, roadmap]
status: active
date: 2026-08-14
related: [http-basics, http-caching, rest-api, http-cors, tls-https]
featured: false
---

Цель блока: понять, как backend-сервис общается с клиентом, что происходит между браузером/клиентом и сервером, и как правильно проектировать API.

## Темы блока

1. **Основы сети** ⭐⭐⭐⭐⭐ — IP, порты, клиент/сервер, DNS, TCP, UDP.
2. **HTTP основы** ⭐⭐⭐⭐⭐ — request/response, структура запроса/ответа, методы, идемпотентность, статус-коды.
3. **Headers** ⭐⭐⭐⭐☆ — общие, request/response, важные заголовки.
4. **Cookies и сессии** ⭐⭐⭐⭐☆ — cookie, session id, серверные сессии, HttpOnly/Secure/SameSite.
5. **CORS** ⭐⭐⭐⭐☆ — origin, same-origin, preflight, OPTIONS, Access-Control-*.
6. **Кэширование HTTP** ⭐⭐⭐⭐⭐ — cache, Cache-Control, ETag, If-None-Match, Last-Modified, 304.
7. **REST API** ⭐⭐⭐⭐⭐ — ресурсная модель, URI, вложенные ресурсы, пагинация, версионирование.
8. **TLS и HTTPS** ⭐⭐⭐⭐☆ — сертификаты, CA, ключи, TLS handshake.
9. **HTTP/2 и HTTP/3** ⭐⭐☆☆☆ — multiplexing, streams, QUIC.
10. **Практика** ⭐⭐⭐⭐⭐ — DevTools, curl, чтение headers/cookies, простой API, проверка CORS и кеша.

## После блока должен уметь ответить

- Что происходит после ввода URL в браузере?
- Как запрос попадает в Django/FastAPI?
- Почему возникает CORS?
- Как работает авторизация через cookie или token?
- Почему ответ может прийти с 304?
- Чем PUT отличается от PATCH?
- Почему REST API проектируют через ресурсы?
- Что именно защищает HTTPS?

По объёму блок HTTP заметно меньше PostgreSQL.