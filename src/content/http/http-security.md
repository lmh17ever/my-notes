---
title: "HTTP-безопасность: CORS, SameSite, CSRF"
summary: "Разница между CORS, SameSite и CSRF, HttpOnly и Secure как защита cookie, и доверие proxy-заголовку X-Forwarded-Proto в Django."
tags: [http, security, csrf, cors, samesite, django]
status: active
date: 2026-08-14
related: [http-cors, http-cookies-and-sessions, http-authentication, tls-https]
featured: false
---

## Три разных механизма (не путать)

```text
CORS     → можно ли JavaScript прочитать cross-origin ответ
SameSite → отправлять ли cookie в cross-site контексте
CSRF     → как сервер убеждается, что изменяющий запрос
           действительно инициирован самим приложением,
           а не чужим сайтом
```

## HttpOnly

```text
Set-Cookie: session_id=abc123; HttpOnly
```

HttpOnly говорит браузеру: не позволяй JavaScript получить значение cookie через `document.cookie`. Но браузер всё равно автоматически отправляет её в HTTP-запросах. Защищает прежде всего от кражи cookie через JavaScript.

## Secure

```text
Set-Cookie: session_id=abc123; Secure
```

Отправлять cookie только по HTTPS. Важно для session cookie — иначе она может передаваться по незашифрованному HTTP.

## CSRF

- назначение CSRF-защиты;
- CSRF token;
- `csrftoken`;
- `X-CSRFToken`;
- проверка cookie + header;
- отличие CSRF от authentication.

## Доверие к прокси-серверу (Nginx) в Django

Nginx принимает HTTPS из интернета, расшифровывает и пересылает на Django по localhost через HTTP. Django «думает», что запрос небезопасный, и может блокировать сессии. Решение — сказать Django верить заголовку от Nginx:

```python
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
```

Если там `https` — значит, всё в порядке.