---
title: "Прогресс по HTTP"
summary: "Сводка пройденных тем блока HTTP: сеть, HTTP, headers, cookies, CSRF, CORS, кэширование, REST, TLS, HTTP/2-3, практика."
tags: [http, progress, study-plan]
status: active
date: 2026-08-14
related: [http-study-plan, http-basics, http-cors, http-security]
featured: false
---

## 1. Основы сети

IP-адреса, порты, клиент/сервер, DNS, TCP, TCP handshake, надёжная доставка TCP, подтверждения ACK, обнаружение потерь, UDP, отличие UDP от TCP, QUIC поверх UDP, надёжность QUIC, отличие QUIC от TCP, HTTP/2 streams, TCP Head-of-Line Blocking, HTTP keep-alive.

## 2. HTTP

HTTP как протокол request/response, request, response, методы GET/POST/PUT/PATCH/DELETE, ресурсы и URI, идемпотентность, безопасные методы, статус-коды 2xx/3xx/4xx/5xx, `201 Created`, `304 Not Modified`.

## 3. HTTP Headers

request/response headers; Host, Content-Type, Content-Length, Accept, Authorization, User-Agent, Cache-Control, Cookie, Set-Cookie, Origin, Referer, Vary, Allow, Connection, Transfer-Encoding, Content-Encoding, Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options.

## 4. Cookies и сессии

cookie, sessionid, серверная сессия, cookie vs session, cookie-based authentication, HttpOnly, Secure, SameSite, SameSite=Lax.

## 5. CSRF

назначение CSRF-защиты, CSRF token, csrftoken, X-CSRFToken, проверка cookie + header, отличие CSRF от authentication.

## 6. CORS

origin, same-origin, preflight, OPTIONS, Origin, Access-Control-Allow-Origin/Credentials/Headers/Methods/Max-Age, проверка CORS через curl, динамический Allow-Origin, обнаружение CORS_ALLOW_ALL_ORIGINS=True, исправление конфигурации Django.

## 7. Кэширование

зачем cache, browser/proxy/CDN cache, Cache-Control, no-cache, no-store, private, max-age, ETag, If-None-Match, Last-Modified, If-Modified-Since, 304, conditional requests, проверка через curl, CDN cache, Age, cf-cache-status.

## 8. REST API

ресурсная модель, URI ресурсов, GET/POST/PATCH, endpoints, вложенные ресурсы, пагинация, Django REST Framework, ModelViewSet, permissions, session-аутентификация.

## 9. TLS / HTTPS

зачем HTTPS, TLS, сертификаты, CA, публичный/приватный ключ, TLS handshake, HSTS, Strict-Transport-Security, HTTPS не является авторизацией.

## 10. HTTP/2 и HTTP/3

проблемы HTTP/1.1, keep-alive, multiplexing, streams, TCP Head-of-Line Blocking, QUIC, HTTP/3 поверх QUIC/UDP.

## 11. Практика

Firefox DevTools → Network, анализ реальных HTTP-запросов/ответов, `curl.exe -v` в Windows, анализ TLS/DNS/TCP/HTTP через curl, проверка cookies/CSRF/CORS/ETag/Last-Modified/304, проверка API `carcrm.icu`, проверка production-конфигурации Django внутри Docker-контейнера, поиск конфликта `.env`, проверка фактических Django settings.