---
title: "REST API"
summary: "Ресурсная модель API, правильные URI, вложенные ресурсы, пагинация, фильтрация, сортировка и версионирование."
tags: [http, rest, api, backend, design]
status: active
date: 2026-08-14
related: [http-basics, http-study-plan]
featured: false
---

## Ресурсная модель

API проектируется через **ресурсы**, а не через действия.

Плохо:

```text
/getUsers
/createUser
```

Лучше:

```text
GET /users
POST /users
```

## URI

- вложенные ресурсы: `GET /users/10/orders`;
- пагинация: `GET /users?page=2&limit=20`;
- фильтрация и сортировка — через query-параметры;
- версионирование: `GET /api/v1/users`.

## Связь с фреймворком (пример Django)

- Django REST Framework;
- `ModelViewSet`;
- permissions;
- session-authentication на API.