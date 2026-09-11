# SEC-002 — Chatbot abuse protection

## Request contract

POST requires `application/json` (valid parameters accepted). Missing or wrong
Content-Type returns 415. Invalid JSON/schema returns 400. Only `message` and
`history` are accepted at the root; message must be a nonempty trimmed string of
at most 500 UTF-16 code units, matching the existing client limit.

The body limit is 24 KiB (24,576 UTF-8 bytes), checked before JSON parsing.
The client sends up to 500 message + 6 x 500 history code units. Even six-byte
JSON escapes fit with structural overhead. Change `MAX_BODY_BYTES` internally.
History retains existing normalization: non-arrays become empty, invalid entries
are filtered, and the last four user/assistant strings are trimmed/capped at 300.

POST permits absent Origin or an existing allowlisted Origin; other origins,
including literal `null`, return 403. Origin is not authentication. OPTIONS keeps
the existing 200 preflight behavior without body validation or provider calls;
disallowed preflight origins are not reflected in Access-Control-Allow-Origin.
Other methods return 405 with `Allow: POST, OPTIONS`.

## Native Function configuration

Endpoints are **KEPT SEPARATE**:

- `/.netlify/functions/chatbot`
- `/.netlify/functions/chatbot-gemini` (deprecated compatibility endpoint)

Both export a modern Request/Response adapter and a literal `config.rateLimit`:
`windowLimit: 10`, `windowSize: 60`, `aggregateBy: ['ip', 'domain']`.
Update the two small configuration blocks together; tests enforce their policy.
No method filter is configured, preserving application 405/preflight behavior.
The native default action returns 429. Requests reaching the Function, including
local responses, may count. The rules do not guarantee one shared global quota
across endpoints or domains; switching aliases can provide additional allowance.

The existing Lambda-style named handler does not support rateLimit extraction in
the current Netlify bundler. The small transport adapter is therefore necessary;
provider selection, prompts and application response contracts remain unchanged.
Netlify documents multiple custom paths, but custom routing replaces default URLs.
Consolidating these two existing Function URLs was not established as safe without
deploy routing verification. This change retains file-based endpoints, with no
custom paths, redirects, new dependency, or infrastructure.

References checked for this task:

- [Netlify rate limiting](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/)
- [Function configuration and multiple paths](https://docs.netlify.com/build/functions/configuration/)
- [Netlify source configuration parser](https://github.com/netlify/zip-it-and-ship-it/blob/main/src/runtimes/node/in_source_config/index.ts)

## Required deploy verification

Local tests validate the exports, application contract and adapter; Vite build
does not package Functions or prove Netlify accepted a native rule. No deploy is
performed as part of this task.

1. Inspect deploy post-processing logs for successful rule detection/validation
   for **both** Functions, with 10 / 60 / ip+domain. Absence of both success and
   error messages is not success; invalid rules may not fail the deploy.
2. Confirm both exact endpoint URLs return local JSON answers to a valid POST;
   check OPTIONS/CORS and 405/Allow as well, with no SPA HTML or routing failures.
3. From a controlled IP and domain, send a bounded series exceeding ten valid
   requests in 60 seconds, using a local question such as `¿El colegio tiene ruta?`
   to avoid provider costs. Confirm a real 429 for each endpoint separately.
   Enforcement is asynchronous: do not require the eleventh request precisely
   to be rejected. Stop after observing 429; do not run an unbounded load test.
4. Record Retry-After if present, body format, endpoint and timestamps. Confirm
   the UI displays the neutral wait message and makes no automatic retry.
5. After the window has elapsed and traffic has stopped, verify requests recover.
   Alternating endpoints must not be interpreted as proof of one shared counter.

Rollback, if routing/availability fails: revert the rate-limiting commit and
redeploy the previously verified version with Product Owner authorization.
The request validation and UI commits can remain independently.
