# Provider-neutral chatbot message contract

Status: Accepted for AI-001.

## Context

Adapters consumed different representations of the same request. Gemini ignored
the prepared messages and Claude discarded their system message; both rebuilt
instructions without the retrieved institutional context.

## Decision

`prompt.js` builds instructions and retrieved context exactly once. The final
provider interface is `generate({ messages, timeoutMs }) -> Promise<string>`.
`messages` contains exactly one server-built system message first, followed by
normalized user/assistant history and the current user message once, last.
History, including assistant history from the client, remains untrusted.

`provider-contract.js` validates and separates this structure without retrieval,
prompt construction, network access, or input mutation. It cannot verify origin:
only server code may construct the trusted system message. Identical text in
history and the current question is allowed; adapters must not deduplicate it.

Groq/OpenAI retain the common array. Gemini maps system to `systemInstruction`
and conversation to `contents` (assistant becomes model). Claude maps system to
its top-level `system` field and preserves conversation roles in `messages`.
Adapters never rebuild institutional prompts. Handler validation and history
limits remain unchanged; timeout is optional and retains the 15-second default.

## Consequences

All providers preserve the same context; new adapters must pass the shared
payload contract tests. Provider-specific mapping, credentials, models and
generation parameters remain local. Outputs can differ between models and may
change for Gemini/Claude now that they receive the missing context.
Role separation is not a guarantee against prompt injection. Public responses,
local answers, fallback and truncation behavior are unchanged; F07 is separate.

The request mentions ANTHROPIC_API_KEY, but the repository uses CLAUDE_API_KEY.
The existing variable is preserved, with no environment migration.
