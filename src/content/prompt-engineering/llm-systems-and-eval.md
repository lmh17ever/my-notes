---
title: "LLM-системы: tools, RAG, оценка и production"
summary: "Tool calling, RAG, agentic workflows, evaluation, оптимизация промптов, production-вопросы и безопасность LLM-систем для backend."
tags: [prompt-engineering, llm, rag, agents, evaluation, backend]
status: active
date: 2026-08-14
related: [prompt-techniques, llm-fundamentals]
featured: false
---

## Tool Calling

- function/tool schema;
- аргументы;
- выбор инструмента;
- последовательность вызовов;
- ошибки инструментов;
- передача результата инструмента обратно модели.

Это уже переход от «prompt» к построению LLM-систем.

## RAG

- embedding;
- retrieval;
- chunking;
- metadata;
- reranking;
- context assembly;
- prompt для найденного контекста;
- hallucination при отсутствии информации.

Весь pipeline:

```text
документы → chunks → embeddings → retrieval → context → LLM → answer
```

## Agentic workflows

- планирование, tools, циклы, состояние, memory, проверки, остановка, fallback.

Разница между обычным prompt и циклом «LLM → tool → result → LLM → … → answer».

## Evaluation (один из самых важных блоков)

- что значит «хороший prompt»;
- почему субъективной оценки недостаточно;
- test cases, expected output, критерии качества;
- accuracy, consistency;
- regression tests, edge cases.

Главный принцип:

```text
prompt → набор тестов → результаты → метрики → изменение prompt → повторный тест
```

## Prompt optimization

- сокращение инструкций, устранение противоречий, улучшение примеров, сравнение вариантов;
- A/B testing, regression testing.
- Не оптимизировать «на глаз».

## Production LLM

Для backend-разработчика:

- API, token usage, latency;
- retries, rate limits;
- caching, streaming;
- structured output, logging, observability;
- cost, model selection, fallback между моделями.

## Безопасность

- prompt injection;
- indirect prompt injection;
- untrusted input;
- data exfiltration;
- tool abuse;
- privilege separation;
- sandboxing.

Особенно важно для систем с tool calling и RAG.

## Практический проект

Собрать небольшую LLM-систему:

```text
пользователь → backend → LLM → tools/database/RAG → structured output → backend validation → ответ
```

И отдельно сделать evaluation-набор, чтобы измерять качество.

## Граница блока

Не зарываться сейчас в: математику Transformer, обучение собственных LLM, fine-tuning на уровне ML-инженера, RLHF, CUDA, устройство inference engine.

**Итоговый уровень:** понимать, как формулировать задачи для LLM, управлять контекстом и форматом, использовать examples/tools/RAG, проверять качество промптов экспериментами и строить надёжные LLM-фичи в backend. Не «магические промпты», а воспроизводимый процесс.