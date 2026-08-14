---
title: "Systemd и systemctl"
summary: "Управление сервисами через systemctl: статус, запуск/остановка, автозапуск, unit-конфигурация, зависимости, KillMode и пример unit-файла."
tags: [linux, systemd, systemctl, services, backend]
status: active
date: 2026-08-14
related: [linux-process-diagnostics, linux-network, linux-study-plan]
featured: false
---

## Состояние и управление сервисом

- `systemctl status cron` — состояние и основная информация (Active, Main PID, CGroup, ExecStart, последние события);
- `systemctl start/stop/restart cron` — запуск/остановка/перезапуск (при `Access denied` — через `sudo`);
- `sudo kill <PID>` — завершить конкретный процесс;
- `systemctl daemon-reload` — перечитать unit-файлы.

Важно:

```text
daemon-reload ≠ restart
```

`daemon-reload` обновляет знания самого systemd; `restart` перезапускает процесс.

## Свойства unit

```bash
systemctl show cron -p MainPID   # только одно свойство
systemctl show cron -p Restart   # например Restart=on-failure
```

## Конфигурация unit

```bash
systemctl cat cron
```

Показывает содержимое unit-файла и drop-in-конфигураций. Когда: сервис запускается неправильно, нужно узнать команду запуска, `Restart`, зависимости, `EnvironmentFile`.

## Автозапуск

```bash
systemctl is-enabled cron
```

Различать: `start` — запустить сейчас, `enable` — настроить автозапуск. `is-enabled` ничего не запускает — отвечает, настроен ли unit на автозапуск. Симптом «после reboot сервис снова появляется» → проверь `is-enabled`.

## Зависимости

```bash
systemctl list-dependencies cron              # от чего зависит
systemctl list-dependencies --reverse cron    # кто зависит от cron
```

## Директивы unit

- `After=` — порядок загрузки;
- `Wants=` — мягкая зависимость (попробуй, но не обязательная);
- `Requires=` — жёсткая зависимость (если сервис упал — убить и мой).

## KillMode

- `process` → убивает MainPID;
- `control-group` → все процессы unit в cgroup;
- `mixed` → разные сигналы MainPID и остальным;
- `none` → systemd не убивает процессы.

## Пример unit-файла

```text
[Unit]
Description=My App Service
After=network.target postgresql.service

[Service]
User=www-data
WorkingDirectory=/var/www/app
ExecStart=/usr/bin/python3 /var/www/app/main.py
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

## Симптомы

- «После reboot сервис запускается» → is-enabled / reverse dependencies.

## Диагностическая цепочка

```text
systemd → unit → MainPID → process → /proc/<PID>/
```