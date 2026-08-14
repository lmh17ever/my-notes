---
title: "Микросервис уведомлений на Go для CRM"
summary: "Идея вынести отправку уведомлений, Telegram-шлюз и планировщик просрочки из Django в микросервисы на Go: анализ кода и варианты интеграции."
tags: [idea, go, architecture, microservices, django, redis]
status: draft
date: 2026-08-14
related: [car-crm-stack, go-and-rust-in-company-roles, open-source-devtools-ideas]
featured: false
---

Идея — вынести «эффекты» из монолита Django в отдельные Go-сервисы. Ниже анализ реальной кодовой базы CRM и три варианта.

## Что нашлось в кодовой базе

`NotificationService.create(...)` вызывается синхронно внутри DRF-вьюх (`add_car`, `add_timeline_entry`), из сигналов `activities/signals.py` и фоновой задачи `activities/tasks.py`. Внутри — 4 разных типа работы: запись `Notification` в БД (bulk_create), SSE через `django_eventstream` (`send_event`), Telegram через `send_telegram_message` (синхронный `requests`), Web Push через `pywebpush` (синхронный, по подписке → 404/410 удаляет). То есть один DRF-запрос тянет сетевые вызовы с таймаутами 10–15 сек — классический I/O-bound блокер главного потока.

Telegram-клиент — обёртка над Bot API (`sendMessage`, `setWebhook`) через `requests` синхронно; webhook-эндпоинт `/api/integrations/telegram/webhook/` с логикой привязки аккаунта. Планировщик просрочки — django-q2 (`Q_CLUSTER` + `schedule`) в сигнале `post_save` на `Task` (если `due_at` в будущем → schedule, иначе сразу, анти-спам кулдаун 1 час). Bitrix24 — полный REST-клиент + выгрузка сущностей (Deal/Lead/Contact/Company). Отчётника/экспорта (Excel/PDF/CSV) нет.

## Вариант 1 — «Служба отправки уведомлений» (лучший кандидат)

Вынести Telegram + Web Push (+ опционально SSE) в микросервис на Go. Django пишет `Notification` в свою БД и публикует «событие отправки» в Redis; Go-сервис забирает и рассылает.

Сервису не нужна основная БД — достаточно входных данных: `event`, `payload`, `url`, `recipient` + настройки (VAPID-ключи, Telegram-токен). `PushSubscription` можно хранить в БД сервиса (его «собственные» данные).

Обмен:

- вход (Django → Redis queue `notifications.dispatch`):
```json
{
  "id": "8f2c1a9e-...",
  "event": "task.overdue",
  "payload": {"task_id": 12, "order_id": 7, "text": "Перезвонить клиенту"},
  "url": "https://carcrm.icu/orders/7",
  "recipients": [
    {"user_id": 34, "telegram_id": 512345678, "language": "ru",
     "subscriptions": [{"endpoint": "...", "keys": {"p256dh": "...", "auth": "..."}}]}
  ]
}
```
- выход (сервис → Django, опциональный callback `POST /api/notifications/status`): `{"id":"...", "telegram":"sent", "push":{"sent":2,"failed_invalid":[{"subscription_id":5}]}}` — чтобы Django пометил битые push-подписки.

Польза: DRF-запросы перестают ждать сеть; отправка масштабируется независимо (N воркеров Go на один Redis); goroutine на каждую рассылку, нормальные retry/backoff. Самый заметный выигрыш «безболезненно и сразу».

## Вариант 2 — «Telegram-бот-шлюз» (отдельный ingress)

Выделить всю Telegram-логику: вебхук Telegram (приём `/start <token>`), лёгкий клиент Bot API, локализованные тексты (`integrations/translations.py`), отправку. Django не ходит в Telegram напрямую — вызывает `POST /telegram-msgsvc/send` или кладёт задачу в Redis.

Границы: подтверждение токена привязки — сервис спрашивает Django «это валидный токен?» (`GET /api/integrations/telegram/validate?token=...`), Django отвечает `{valid, user_id, language}`.

Польза: webhook всегда отвечает 200 независимо от Django; Go хорош для бот-логики (concurrency); снижает нагрузку на Django. Делать после Варианта 1 (переиспользует тот же Redis).

## Вариант 3 — «Планировщик дедлайнов / просрочка задач»

Заменить django-q2 scheduling на Go-воркер: Django публикует событие «создана задача с дедлайном», Go хранит таймеры (в памяти / Redis sorted set) и по наступлению `due_at` шлёт команду «отправь уведомление о просрочке» в общую очередь (Вариант 1). Django больше не держит `schedule(...)` в сигнале.

Минимальная связь с БД: нужны только `task_id` и `due_at` (+ `is_done` для отмены). Вход — `events.task` `{op:"create|update|done", task_id, due_at}`; выход — `notifications.dispatch`. Django идемпотентно сверяет `last_overdue_notification_at` (как уже сделано в `tasks.py`), чтобы закрыть race.

Польза: убирает хрупкое «временное» планирование на django-q (schedule часто теряется при рестарте); Go-воркер с `time.AfterFunc`/крон надёжнее.

Всё это — идея, а не готовое решение: требует инженерной проработки в рамках пет-проекта.