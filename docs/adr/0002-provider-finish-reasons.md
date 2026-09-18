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
