---
title: "HTTP/2 и HTTP/3"
summary: "Проблемы HTTP/1.1, keep-alive, multiplexing, streams, Head-of-Line Blocking в TCP, QUIC и HTTP/3 поверх UDP."
tags: [http, http2, http3, quic, performance]
status: active
date: 2026-08-14
related: [network-foundations, http-basics]
featured: false
---

Для понимания современных систем.

## Проблемы HTTP/1.1

- одно соединение на поток;
- keep-alive — переиспользование соединения;
- необходимость в multiplexing.

## HTTP/2

- **multiplexing** — несколько потоков на одном соединении;
- **streams** — параллельные запросы/ответы;
- остаётся **TCP Head-of-Line Blocking** (проблемы транспортного уровня).

## HTTP/3

- **QUIC** поверх **UDP**;
- надёжность QUIC (встроена в протокол);
- отличие QUIC от TCP;
- решает Head-of-Line Blocking на уровне TCP.