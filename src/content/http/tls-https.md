---
title: "TLS и HTTPS"
summary: "Зачем HTTPS, что защищает TLS, сертификаты и CA, публичный/приватный ключ, TLS handshake, HSTS и почему HTTPS не равен авторизации."
tags: [http, tls, https, security, certificates]
status: active
date: 2026-08-14
related: [network-foundations, http-security, http-basics]
featured: false
---

Без глубокой криптографии. Понять:

- зачем HTTPS;
- что защищает TLS;
- сертификаты;
- CA (центры сертификации);
- публичный и приватный ключ;
- TLS handshake;
- почему HTTPS не равен «шифрует всё»;
- **HTTPS — это не авторизация** (шифрование канала ≠ проверка прав).

## HSTS

`Strict-Transport-Security` — заголовок, требующий от браузера использовать только HTTPS.