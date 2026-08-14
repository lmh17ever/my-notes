---
title: "Память и OOM Killer в Linux"
summary: "MemFree vs MemAvailable, дисковый кэш ядра, swap, /proc/meminfo, как работает OOM Killer и его oom_score."
tags: [linux, memory, oom, swap, diagnostics]
status: active
date: 2026-08-14
related: [linux-cpu-and-load, linux-process-diagnostics, linux-study-plan]
featured: false
---

## MemFree vs MemAvailable (важный нюанс)

- **MemFree** — «абсолютно чистая», нетронутая память, которая напрямую не используется;
- **MemAvailable** — MemFree + память из кэшей ядра, которую ядро может мгновенно забрать и отдать приложению.

Почему MemFree почти всегда равен нулю:

> Linux работает по принципу «Свободная память — это бесполезная память». Если RAM не занята приложениями, ядро забирает её под дисковый кэш (Buffers/Cached).

Из-за этого **паниковать из-за маленького MemFree не надо**. Всегда смотрим на `MemAvailable`. Если `MemAvailable` стремится к нулю — сервер близок к ошибке **Out Of Memory (OOM)**.

## /proc/meminfo

Ключевые метрики:

- MemTotal — вся доступная память;
- MemFree — абсолютно свободная;
- MemAvailable — доступно для запуска новых программ (главный показатель);
- Buffers / Cached — кэши дискового I/O;
- SwapTotal / SwapFree — подкачка на диск.

```bash
grep "MemAvailable" /proc/meminfo
free -h
```

## OOM Killer

Если RAM закончилась, Swap забит (или отключен), а процессы продолжают просить память — активируется OOM Killer:

- оценивает процессы и считает балл «прожорливости» `oom_score`;
- выбирает процесс с наивысшим баллом (часто БД или backend-сервисы Java/Python/Node.js);
- принудительно завершает его `SIGKILL (9)`, чтобы спасти ядро.

В логах dmesg/journalctl:

```text
Out of memory: Kill process 14205 (python3) score 850 or sacrifice child
```

## Как OOM Killer выбирает жертву

`oom_score` (0..1000):

- процент используемой RAM — чем больше, тем выше score;
- время работы — ядро не трогает долго работающие процессы (init, systemd);
- `oom_score_adj` — разработчик может вручную сказать «не трогай» или «бей первым».