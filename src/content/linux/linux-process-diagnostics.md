---
title: "Диагностика процессов: ps, /proc, fd, lsof"
summary: "Как получить информацию о процессе: ps, /proc/<PID> (status, environ, cwd, fd), lsof, файловые дескрипторы и сигналы kill/pkill/killall."
tags: [linux, processes, proc, lsof, diagnostics]
status: active
date: 2026-08-14
related: [linux-systemd, linux-memory, linux-study-plan]
featured: false
---

## ps

```bash
ps -p <PID> -o pid,ppid,comm      # конкретный процесс
ps -p <PID> -o pid,comm,state    # состояние (например S = sleeping)
ps -ef --forest                  # дерево процессов
```

## `/proc/<PID>/`

`/proc` — специальная файловая система с информацией о процессах.

- `status` → `cat /proc/<PID>/status` (Pid, PPid, State, Uid, Gid, Threads);
- `cmdline` → точная команда запуска;
- `environ` → переменные окружения (разделены NUL, читать через `tr '\0' '\n' < /proc/<PID>/environ`);
- `cwd` → `readlink /proc/<PID>/cwd` (текущая рабочая директория);
- `exe` → ссылка на бинарник;
- `fd/` → открытые дескрипторы.

## fd — открытые ресурсы

```bash
sudo ls -l /proc/<PID>/fd/
```

```text
0 → /dev/null
1 → socket:[...]
2 → socket:[...]
3 → /run/crond.pid
```

Стандартные: 0=stdin, 1=stdout, 2=stderr, остальные — файлы/sockets/pipes.

## /dev/null

Устройство, «в которое можно выбрасывать» вывод: `echo hello > /dev/null`. Если `stdout → /dev/null`, вывод процесса никуда не попадает.

## lsof

```bash
sudo lsof -p <PID>             # все открытые файлы процесса
lsof -i -p <PID>               # сетевые сокеты и порты процесса
```

Показывает, что процесс реально держит открытым (cwd, sockets, файлы).

## Файловые дескрипторы (шпаргалка)

| FD | Название | Завязан на |
|---|---|---|
| 0 | stdin | консоль |
| 1 | stdout | экран |
| 2 | stderr | экран |
| 3+ | файлы/сокеты | диск/сеть/память |

```bash
ulimit -n        # лимит открытых файлов на процесс
ulimit -n 65535  # временно поднять
```

## Сигналы

```bash
kill 14205            # SIGTERM (15)
kill -9 14205         # SIGKILL (9)
kill -HUP 14205       # SIGHUP (1)
pkill nginx           # по подстроке имени
pkill -x nginx        # строгое совпадение
pkill -9 -u www-data  # все процессы пользователя
killall python3       # по точному имени
```

SIGTERM — «вежливое» завершение, SIGKILL — принудительное.