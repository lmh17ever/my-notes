---
title: "План изучения Linux"
summary: "19 тем блока Linux для backend-разработчика: файловая система, shell, процессы, systemd, память, CPU, диск, сеть, логи, деплой и граница блока."
tags: [linux, study-plan, backend, roadmap]
status: active
date: 2026-08-14
related: [linux-systemd, linux-process-diagnostics, linux-memory, linux-cpu-and-load, linux-disk-and-inodes]
featured: false
---

Цель блока: уверенно работать с Linux как backend-разработчик, понимать основные механизмы системы и уметь диагностировать типичные проблемы. Не уходить в уровень системного администратора.

## 1. Файловая система

Каталоги: `/`, `/home`, `/etc`, `/var`, `/tmp`, `/usr`, `/bin`, `/proc`, `/sys`. Абсолютные и относительные пути, файлы/директории, inode, permissions. Практика: находить/перемещать/копировать/удалять файлы, искать по содержимому.

## 2. Shell и командная строка

shell/bash, команды, аргументы, stdin/stdout/stderr, exit code, pipes, redirection, `&&`/`||`/`;`. Команды: ls, cd, pwd, cp, mv, rm, mkdir, cat, less, head, tail, grep, find, sort, uniq, wc, cut, xargs.

## 3. Permissions и пользователи

user, group, root, UID/GID, `rwx`, chmod, chown, umask, sudo, `/etc/passwd`, `/etc/group`. Практика: почему процесс не может прочитать файл, почему Docker-контейнер не может записать.

## 4. Процессы

процесс, PID, PPID, процесс и программа, foreground/background, signals, process states, zombie, daemon. Команды: ps, top, htop, kill, pkill, jobs, bg, fg, nohup.

## 5. Signals

SIGTERM, SIGKILL, SIGINT, SIGHUP, SIGSTOP, SIGCONT. Особенно SIGTERM vs SIGKILL и почему backend-приложения должны корректно обрабатывать завершение.

## 6. Systemd и сервисы

service, daemon, systemd, unit, start, stop, restart, enable, logs. Команды: systemctl, journalctl.

## 7. Файловые дескрипторы

fd, stdin=0, stdout=1, stderr=2, открытые файлы, sockets как fd. Почему процесс работает с TCP-соединением через fd.

## 8. `/proc`

Концептуально — интерфейс к информации о ядре и процессах. Практика: `/proc/<pid>/`, `/proc/cpuinfo`, `/proc/meminfo`, `/proc/loadavg` для диагностики.

## 9. Память

RAM, virtual memory/address, physical memory, page, swap, memory mapping, OOM Killer. Не уходить в устройство MMU и page tables.

## 10. CPU и нагрузка

CPU utilization, load average, process states, context switching, user/system CPU time. Команды: top, htop, uptime, vmstat.

## 11. Диск и файловый ввод-вывод

filesystem, block device, disk, mount, cache, read/write, I/O wait. Команды: df, du, lsblk, mount, iostat.

## 12. Сеть в Linux

Сетевой блок изучен концептуально, здесь — Linux-часть: network interface, IP, routing table, ports, sockets, listening process. Команды: ip, ss, ping, traceroute, curl. Практика: какой процесс слушает порт 8000?

## 13. Логи

stdout/stderr, log files, journal, rotation. Команды: journalctl, tail, grep, less. Практика: найти причину падения backend по логам.

## 14. Environment

environment variables, `$PATH`, shell variables, `.profile`, `.bashrc`, `.env`. Почему команда работает в терминале, но не работает внутри systemd/Docker.

## 15. SSH

SSH connection, public/private keys, authentication, `~/.ssh`, `authorized_keys`, permissions. Практика: подключиться, настроить ключ, удалённо выполнить, скопировать файл.

## 16. Cron и фоновые задачи

cron, crontab, scheduled jobs; environment cron отличается от shell environment. Когда cron, а когда systemd timer или application worker.

## 17. Package management (Debian/Ubuntu)

apt, dpkg. Понять package/repository/dependency/installation/update. Не изучать создание пакетов.

## 18. Backend deployment

Объединить всё: Linux server → systemd → Gunicorn/Uvicorn → Django → PostgreSQL. Научиться запускать, управлять, смотреть логи/процесс/порт/CPU/RAM, находить ошибки permissions и проблемы с диском.

## 19. Диагностика

Реальные ситуации («Backend перестал отвечать»): самому определить процесс/CPU/RAM/disk/network/port/permissions/logs/service и найти причину.

## Граница блока

Не углубляться сейчас в: устройство ядра Linux, kernel modules, глубокую работу ФС, внутренности TCP/IP stack, архитектуру CPU, устройство MMU/page tables, драйверы, kernel debugging, сложный system administration.

**Критерий завершения:** уверенно работать с Linux-сервером, запускать и обслуживать backend, смотреть процессы/ресурсы/логи/сеть, находить типичную проблему и понимать происходящее на концептуальном уровне. После этого — переходить дальше.