# Colegio Ciudad Córdoba — Development Governance

## Purpose and authority

These instructions govern engineering work in this repository. Inspect the current
repository for implementation facts; this document and the README are not proof
that a behavior works. Follow the approved task and preserve the product decisions
below unless the Product Owner explicitly changes them. A roadmap item is not
authorization to implement it.

## Roles

| Role | Owner | Responsibilities |
| --- | --- | --- |
| Product Owner + QA | Will | Define product intent, priorities and acceptance criteria; approve functional decisions and sensitive changes; validate behavior. |
| Software Architect / Tech Lead | ChatGPT | Analyze requirements and affected domains; classify risk; assess architecture; define strategy and plans; decide when an ADR is needed; review technical results and maintain the roadmap. |
| Senior Software Engineer | Codex | Inspect before modifying; execute only the approved plan; keep changes minimal; validate before and after; report deviations and uncertainty without expanding scope. |

## Current architecture and repository map

- Frontend: React, Vite, Sass / Bootstrap, React Router, served through Netlify CDN.
- Serverless: Netlify Functions under `netlify/functions/`.
- AI: provider abstraction for Groq, OpenAI, Gemini and Claude. Shared chatbot
  logic and institutional knowledge live in `netlify/functions/_chatbot/`;
  `chatbot.js` and `chatbot-gemini.js` expose the principal and compatibility endpoints.
- UI: `src/pages/`, `src/components/`, `src/routes/`, `src/hooks/`,
  `src/constants/`, `src/utils/` and `src/styles/`. Public assets: `public/`.
- External services/resources: Cloudinary, Aval PayCenter, Google Drive,
  Google Forms, Google Maps and Google Analytics.
- Student lookup: `src/utils/loadAlumnos.js` loads an external public JSON through
  `VITE_ALUMNOS_JSON_URL`. `Formulario.jsx` performs partial-name lookup for
  Tesorería and displays/copies the code. A second lookup, `BuscadorCursoCard`,
  exists but its mounting in Inicio is commented out.
- Aval PayCenter uses an independent payment link; do not assume a student API
  or payment transaction backend exists here.

Recheck paths, consumers, scripts, runtime and deployment configuration for each
task instead of assuming this snapshot remains current.

## Approved product decisions

1. **Intentional public student data.** The dataset used by the public lookup is
   intentionally public by institutional/product decision. Do not automatically
   classify its public availability as a security vulnerability. Do not introduce
   authentication, private storage, CAPTCHA, tokens, hidden endpoints or access
   restrictions solely to hide it. This does not exempt misuse, injection,
   secrets, infrastructure or other non-public data from security review.
2. **One canonical JSON.** Keep one complete public student JSON. Do not split
   it into code-only and full datasets unless future performance measurements
   justify an approved change. Tesorería uses name/code; the disabled course
   lookup may need grade/teacher. Current size does not justify splitting.
   Do not remove grade/teacher fields merely because Tesorería does not use them.
3. **Disabled features.** Do not reactivate commented or disabled functionality
   without explicit Product Owner approval.
4. **Institutional facts.** Do not change SCHOOL_CONTEXT content, tuition values,
   dates, schedules, requirements, evaluation rules or other institutional facts
   based only on technical inference or a model's answer. Report contradictions;
   changes require Product Owner/institutional validation.
5. **Payments.** Aval PayCenter is independent of student lookup. Do not redesign
   payment flows as part of unrelated work.

These decisions supersede earlier proposals to privatize or split the student
dataset. Do not resume those proposals as approved implementation work.

## Standard development workflow

Requirement → understand intent → inspect implementation → identify affected
domains/files → classify risk → assess architecture impact → design/implementation
plan → approval when required → minimal implementation → local validation → diff
review → commit → push → PR → CI → code review / QA → merge → production smoke
verification when applicable.

Explicitly justify skipped stages. This workflow does not authorize a push:
push only when explicitly requested. Respect task-specific restrictions on
implementation, commits, deployment and external writes.

## Risk classification

| Risk | Examples | Expected work |
| --- | --- | --- |
| LOW | Text, styling, static assets, small isolated UI changes, documentation | Inspect affected area; minimal change; targeted validation; diff review; scoped commit when permitted. |
| MEDIUM | Component behavior, forms, routing, serverless validation, institutional lookup logic, AI adapters, dependency/runtime changes | Plan; inspect domain; positive and negative tests; relevant quality gates; functional verification; diff review; scoped commit when permitted. |
| HIGH | Secrets, introduced authentication/authorization, payment-sensitive behavior, production data writes, destructive operations, infrastructure, deployment configuration that can break production, exposed provider credentials, external deletion, rate limiting affecting availability | Explicit technical review and approved plan; rollback consideration; stronger automated and negative/security validation; production verification when applicable; Product Owner approval before sensitive writes. |

Classify actual impact rather than relying solely on the example category.

## Scope and inspection

Before changing code:

- Inspect Git status and current branch; preserve pre-existing work.
- Read relevant implementation, nearby tests and shared utilities/contracts.
- Identify runtime/configuration dependencies and production impact.
- Determine existing behavior coverage; never infer behavior from names or README alone.

Do not fix unrelated issues opportunistically, refactor adjacent code silently,
upgrade dependencies without explicit scope, or rename/reorganize unrelated modules.
Prefer the smallest approved solution without avoidable technical debt.

If another problem appears, finish or stop the active task safely, report the
finding and its risk, and recommend a separate task. Report contradictory
documentation without changing it unless the task includes that change.

## Validation and quality gates

Testing is risk-based: static validation → unit tests → integration/API tests →
frontend/component tests → E2E → manual QA → production smoke verification.
Use the layers justified by the change; never claim PASS for an unexecuted layer.

Report statuses as **PASS**, **FAIL**, **PARTIAL**, **NOT AVAILABLE** or
**NOT VERIFIED**, with commands/results and limitations.

Current gates, to run where available and relevant:

- `npm run lint`
- `npm test` — currently Node's test runner for `netlify/functions/_chatbot/*.test.js`.
- `npm run build`
- Typecheck: **NOT AVAILABLE** unless subsequently added.

Inspect `package.json` for current commands. Do not invent or silently add tooling
just to create a gate. If dependencies are absent and the task permits environment
writes, prefer `npm ci` for lockfile-reproducible installation.

For documentation-only work, review content and run `git diff --check`; application
tests are unnecessary unless the change affects behavior. Run an existing
documentation-specific validator if one is available.

## Testing rules

- Test behavior, not implementation trivia. Include negative paths for medium/high risk.
- API/serverless: consider malformed JSON, null, arrays, missing/extra fields,
  unsupported methods, invalid content type, timeout, provider failures and other
  external dependency failures.
- AI: cover context propagation, empty/truncated responses, timeout, provider
  errors, fallback behavior and untrusted user input/history.
- Use synthetic student fixtures whenever sufficient; do not copy real records
  into automated tests unnecessarily.
- Ensure new tests are collected by the actual test command; report missing coverage.

## AI and security rules

- Treat user messages and client-supplied history as untrusted.
- Keep system instructions and institutional context logically separated from
  untrusted content. Providers should respect a common conceptual contract.
- Make fallback behavior explicit and testable.
- Never expose provider API keys to the frontend or log provider secrets.
- Never commit API keys, tokens, passwords, provider secrets or private credentials.
  Environment secrets must remain server-side.
- Review request validation, CORS, relevant rate limiting, logs, error disclosure,
  methods, body size, external URLs and deployment/runtime configuration.
- Do not label intentionally public institutional/student data confidential
  without Product Owner confirmation. Public availability does not make all
  related security concerns out of scope.

## Observability

For backend/serverless changes prefer logs identifying the failing component or
provider, normalized error category, latency, request/correlation ID and
deployment/version attribution when available.

Do not log secrets, tokens, provider credentials or full request bodies containing
personal information. Report missing observability separately unless adding it
belongs to the approved task.

## Git and architecture decisions

Before committing, inspect status and diff, verify only intended files changed,
check for generated/secret files, and complete required validation. Keep commits
scoped and descriptive; do not combine unrelated changes. Prefer conventional
prefixes: `docs:`, `fix:`, `feat:`, `refactor:`, `test:`, `chore:`, `ci:`, `security:`.
**Do not push unless explicitly requested.**

Create or recommend an ADR for changes to architecture, major integrations,
data ownership/storage, infrastructure dependencies, material AI provider
contracts, public/private data policy or long-lived technical constraints.
Small implementation details do not require an ADR. Creating an ADR must respect
the task's approved scope.

## Definition of done

- Requirement, acceptance/QA criteria, scope, risk and affected behavior are clear.
- Implementation is minimal and maintainable; relevant tests exist or missing
  coverage is reported.
- Required automated checks pass; negative paths and security implications are
  validated where appropriate. A blocked or unexecuted check is not a pass.
- Diff contains only intended changes; behavior/contract changes have documentation.
- Unverified behavior and validation limitations are explicitly identified.

## Roadmap context — not implementation authorization

AUDIT-001 is complete. Open items requiring separate approved tasks include:

- No application-level chatbot rate limiting; incomplete request body validation.
- Gemini and Claude may discard retrieved institutional context.
- Incomplete provider truncation handling.
- Netlify Node runtime misalignment with dependency requirements.
- CI does not currently enforce lint/tests before deployment.
- Institutional content items requiring Product Owner validation.
- Frontend, UX and accessibility issues.
- Student JSON optimization: deferred, **LOW** priority.

Revalidate findings before acting; never treat this list as permission to fix them.
