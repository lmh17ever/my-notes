---
title: "CPU и Load Average в Linux"
summary: "Load Average, состояния процессов (Running / Uninterruptible sleep), CPU utilization, context switches, vmstat и интерпретация узких мест."
tags: [linux, cpu, load-average, vmstat, diagnostics]
status: active
date: 2026-08-14
related: [linux-memory, linux-disk-and-inodes, linux-process-diagnostics]
featured: false
---

## Load Average (/proc/loadavg)

Выводит 5 значений:

```text
0.15 0.08 0.05 1/345 14205
│    │    │    │     └─ последний созданный PID
│    │    │    └── активные потоки / всего потоков
│    │    └── load average за 15 минут
│    └── load average за 5 минут
└── load average за 1 минуту
```

Load Average — среднее количество процессов в состоянии **Running** (ждут CPU) или **Uninterruptible sleep / D** (стоят в очереди на диск/I/O).

Правило оценки: на 4-ядерном сервере нормальный Load Average — в пределах 4.0; если стабильно выше — система перегружена и процессы стоят в очереди.

## Аналогия

CPU — кассир. Процессы R — покупатели у кассы, процессы D — покупатели, у которых «застряла карта» (ждут диск).

- CPU 100%, Load = 4 (4 ядра): касса работает, очередь нулевая. Причина — чистые вычисления. Сервер загружен эффективно.
- CPU 5%, Load = 50 (4 ядра): кассиры без дела, но очередь — диск завис. Процессы в состоянии D. **Смертельный лаг: приложения падают с таймаутами, хотя CPU свободен.**

## vmstat

```bash
vmstat 1 5
```

Поля: `r` (runnable, очередь на CPU), `b` (blocked в I/O, состояние D), `cs` (context switches), `wa` (iowait).

| Поле | Что означает | Аномалия |
|---|---|---|
| us | код приложений (Python, Go, JS) | высокий = сложная логика |
| sy | код ядра (syscalls) | высокий = много вызовов к ядру/FD |
| wa | ожидание диска/сети | высокий = диск — узкое место |

## Команды

```bash
uptime                 # load average за 1,5,15 минут
top | htop             # состояния, iowait, %CPU
vmstat 1               # мгновенный срез
grep -c "^processor" /proc/cpuinfo   # количество ядер
```

## Вывод

Если CPU почти не используется, а процессы медленные — узкое место, скорее всего, дисковый I/O (state D) или сеть, а не CPU.