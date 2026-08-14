---
title: "Стек пет-проекта car_crm"
summary: "Технологический стек CRM для автодилера: фреймворки, зависимости, инфраструктура, тестирование и замеченные замечания по настройкам."
tags: [pet-project, django, nextjs, docker, stack, crm]
status: active
date: 2026-08-14
related: [go-notification-microservice, http-progress]
featured: false
---

## Архитектура

Монолит с разделением на **фронтенд (Next.js)** и **бэкенд (Django)**, связанные через REST API. Разворачивается в **Docker Compose** (dev/prod). Перед фронтендом и бэкендом — **nginx** как реверс-прокси.

## Backend (Python / Django)

| Компонент | Технология |
|---|---|
| Язык/среда | Python 3.13 (`python:3.13-slim`) |
| Веб-фреймворк | Django 5.2 |
| API | DRF 3.16.1 (+ django-filter, LimitOffsetPagination) |
| Асинхронный сервер | Daphne (ASGI), Uvicorn, Twisted |
| Аутентификация | django-allauth (включая `allauth.headless`) |
| БД | PostgreSQL 16 / локально SQLite (psycopg2-binary) |
| Кэш/очередь/realtime | Redis 7 + django-q2 + django-eventstream (SSE) + channels-redis |
| Хранение файлов | django-storages + boto3 → S3 (Cloud.ru), Pillow |
| Static | Whitenoise |
| Уведомления | pywebpush (Web Push/VAPID), Telegram bot (requests), Bitrix24 |
| CORS/env | django-cors-headers, django-environ, python-dotenv |
| Админка | Django Admin + django-admin-sortable2 |

Приложения backend: `core`, `notifications`, `accounts`, `orders`, `cars`, `activities`, `api`, `integrations` (+ `integrations.bitrix24`).

## Frontend (TypeScript / React)

| Компонент | Технология |
|---|---|
| Фреймворк | Next.js (App Router, `output: standalone`) |
| UI | React 19 |
| Язык | TypeScript |
| UI-кит | Chakra UI (+ Emotion) |
| Стили | Tailwind CSS (+ PostCSS) |
| Формы | React Hook Form + @hookform/resolvers |
| i18n | next-intl |
| Прочее | react-icons, react-image-gallery, react-virtual, next-themes, react-infinite-scroll-component, classnames, transliteration |
| Линтинг | ESLint 9 + eslint-config-next |

Особенности: rewrites на бэкенд для `/api/*`, `/_allauth/*`, `/admin/*`, `/events/*`.

## Инфраструктура / DevOps

- Docker Compose (development, production, production-images);
- nginx:alpine (TLS/SSL через Let's Encrypt, gzip, security headers), домен `carcrm.icu`;
- сервисы: `backend`, `qworker`, `frontend`, `db`, `redis`, `nginx`, `backup`;
- бэкап БД: `prodrigestivill/postgres-backup-local` (ежедневно, ротация дней/недель/месяцев);
- облачное хранилище: S3-совместимое `storage.clo.ru` (Cloud.ru);
- образы: `stayasobak/car_crm_backend` / `stayasobak/car_crm_frontend`.

## Тестирование

- фреймворк Django/DRF (каталог `tests/api/`, есть `test_order_service.py`).

## Замечания (видел в настройках)

1. В `.env` повторяется строка `CSRF_TRUSTED_ORIGINS` (дубликат).
2. В `.env` лежат секреты в открытом виде (S3-ключи, `SECRET_KEY`, пароли, токен Telegram, VAPID-ключи) — стоит проверить, что `.env`/ключи не попадают в репозиторий.
3. В `.env` перечислен ряд хостнеймов в `ALLOWED_HOSTS` (включая `192.168.0.114`, ngrok).