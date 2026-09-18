# Normalized provider finish reasons

Status: Accepted for AI-002. Extends ADR 0001's result contract; its input contract
and provider-specific request mapping remain unchanged.

## Decision

Adapters return `{ text, finishReason, rawFinishReason, truncated }`, not strings.
Text extraction/trim is unchanged. Missing or non-string metadata becomes null;
unrecognized metadata normalizes to unknown. Known truncated/blocked results may
contain empty text; empty complete/unknown responses keep the existing error.

| Provider | complete | truncated | blocked |
| --- | --- | --- | --- |
| Groq | stop | length | No documented finish reason |
| OpenAI | stop | length | content_filter; also explicit message.refusal |
| Gemini | STOP | MAX_TOKENS | SAFETY, RECITATION, LANGUAGE, BLOCKLIST, PROHIBITED_CONTENT, SPII, IMAGE_SAFETY, IMAGE_PROHIBITED_CONTENT, IMAGE_RECITATION |
| Claude | end_turn, stop_sequence | max_tokens, model_context_window_exceeded | refusal |

Gemini promptFeedback.blockReason, when present and not unspecified, denotes a
blocked prompt even without candidates; OTHER here means blocked, unlike the
candidate finishReason OTHER. Every remaining finish reason is unknown, including
tool/pause states: this chatbot does not request tools or continuations.

## Sources inspected

- [Groq official response schema](https://github.com/groq/groq-python/blob/main/src/groq/types/chat/chat_completion.py)
- [OpenAI Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create)
- [Gemini FinishReason and PromptFeedback](https://ai.google.dev/api/generate-content)
- [Claude stop reasons](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons)

## Consequences

The public `{ answer, source }` contract stays unchanged. A valid unknown initial
response is retained for compatibility, without treating it as truncation.
Blocked and truncated text must never be delivered as final text. Retry policy
belongs to the common layer, never an adapter. Models, token limits and provider
error classifications remain unchanged. No real provider calls validate this work.

## Single retry policy

`provider-response.js` owns the retry. Only `truncated === true` triggers a second
call, using the same provider object and copies of the original messages. The
second system message appends this fixed server instruction to the original system:

> Responde de forma breve, completa y directa. Prioriza la información esencial y evita explicaciones innecesarias.

The base prompt, context retrieval, history and current question are untouched.
No partial answer is appended or concatenated. The second call receives only the
remaining milliseconds of the existing 15000 ms generation budget, measured with
a monotonic clock. If the budget is exhausted, fallback occurs without another call.
Adapter defaults and the frontend timeout remain unchanged.

A complete retry returns text with the existing provider source. Truncated,
blocked, unknown or failed retries use the existing fallback and source pattern.
Unknown initial text is retained, but after known truncation only explicit complete
metadata is sufficient. No network/429 retry, continuation or failover is added.

One structured log records provider, initial normalized finishReason,
retryAttempted and retryOutcome. It contains no raw metadata, prompts, user text,
history, generated text or credentials. Existing error logging is unchanged.
