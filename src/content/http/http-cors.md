---
title: "CORS"
summary: "Что такое origin и same-origin policy, почему браузер блокирует cross-origin запросы, preflight/OPTIONS и заголовки Access-Control-*."
tags: [http, cors, security, frontend, backend]
status: active
date: 2026-08-14
related: [http-security, http-basics, http-headers]
featured: false
---

## Origin и same-origin policy

- **origin** — схема + хост + порт;
- **same-origin policy** — браузер ограничивает чтение cross-origin ответов. JavaScript не может прочитать ответ, если origin не совпадает.

## Почему браузер блокирует

CORS — механизм, который решает, **можно ли JavaScript прочитать cross-origin ответ**. API может работать, но frontend получает CORS error, потому что сервер не разрешил доступ.

## Preflight request

Перед сложным запросом браузер отправляет `OPTIONS` (preflight), спрашивая разрешение.

## Заголовки ответа

- `Access-Control-Allow-Origin` (в т.ч. динамический);
- `Access-Control-Allow-Methods`;
- `Access-Control-Allow-Headers`;
- `Access-Control-Allow-Credentials`;
- `Access-Control-Max-Age`.

## Практика (Django)

- Проверка CORS через `curl`.
- Динамический `Access-Control-Allow-Origin`.
- Обнаружение ошибочной `CORS_ALLOW_ALL_ORIGINS=True`.
- Исправление CORS-конфигурации Django.