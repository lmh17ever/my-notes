---
title: "Аутентификация и авторизация в HTTP"
summary: "Различие authentication и authorization, session-аутентификация, token-аутентификация (Bearer), Basic Auth."
tags: [http, authentication, authorization, security]
status: active
date: 2026-08-14
related: [http-cookies-and-sessions, http-security, tls-https]
featured: false
---

## authentication vs authorization

- **authentication** — кто ты (проверка личности);
- **authorization** — что тебе можно делать (права).

Это разные вещи, их принято различать.

## Способы аутентификации

- **Session authentication** — сервер хранит сессию, клиент шлёт `session id` (обычно в cookie).
- **Token authentication** — клиент шлёт токен.

## Bearer token

```http
Authorization: Bearer <token>
```

## Basic Auth

```http
Authorization: Basic base64(login:password)
```

## Практическое понимание

Важно уметь объяснить, как работает авторизация через cookie или token, и почему запрос может вернуть `401` (нет аутентификации) вместо `403` (нет прав на действие).