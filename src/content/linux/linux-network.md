---
title: "Сеть и логи в Linux"
summary: "Linux-часть сетевой диагностики (ip, ss, какой процесс слушает порт) и работа с логами (journalctl, tail, grep)."
tags: [linux, network, logs, journalctl, diagnostics]
status: active
date: 2026-08-14
related: [linux-process-diagnostics, linux-systemd, linux-study-plan, network-foundations]
featured: false
---

## Сеть в Linux

Сетевой блок изучен концептуально на уровне HTTP/основ сети; здесь — Linux-часть:

- network interface;
- IP;
- routing table;
- ports;
- sockets;
- listening process.

Команды: `ip`, `ss`, `ping`, `traceroute`, `curl`.

Практика: **как определить, какой процесс слушает порт 8000?** — использовать `ss`/`lsof -i -p <PID>` и связать socket с процессом через `fd`/`lsof`.

## Логи

Первое, куда смотрит инженер при аварии — логи:

```bash
journalctl -u my_service          # по unit
journalctl -u my_app --since "2026-08-12 10:00:00"
journalctl -u my_app -p err       # только ошибки (Priority Error)
journalctl -b                     # с момента последней загрузки ОС
```

Команды работы с логами: `journalctl`, `tail`, `grep`, `less`.

Источники: stdout/stderr процесса, log files, journal, rotation.

Практика блока: **найти причину падения backend-сервиса по логам**.