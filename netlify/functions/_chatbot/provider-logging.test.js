import test from 'node:test';
import assert from 'node:assert/strict';
import { createChatbotHandler } from './chatbot-handler.js';
import { DEFAULT_ANSWER } from './colegio-knowledge.js';
import { getRequestId, toSafeProviderLog } from './provider-logging.js';
import { ProviderError } from './providers/provider-error.js';

const markers = [
  'SECRET_API_KEY_MARKER', 'USER_MESSAGE_MARKER', 'SYSTEM_PROMPT_MARKER',
  'PROVIDER_RAW_BODY_MARKER',
];
const rawExternalMessage = markers.join(' ');
const requestId = 'netlify-request-123';
const event = () => ({
  httpMethod: 'POST',
  headers: { 'content-type': 'application/json' },
  requestId,
  body: JSON.stringify({
    message: `¿Qué menú ofrecen? ${markers[1]}`,
    history: [{ role: 'assistant', text: `${markers[2]} ${markers[0]}` }],
  }),
});
const complete = text => ({ text, finishReason: 'complete', rawFinishReason: 'stop', truncated: false });
const truncated = () => ({ text: markers[3], finishReason: 'truncated', rawFinishReason: 'length', truncated: true });
const captureLogs = t => ({
  error: t.mock.method(console, 'error', () => {}),
  warn: t.mock.method(console, 'warn', () => {}),
  info: t.mock.method(console, 'info', () => {}),
});
const serializedLogs = logs => JSON.stringify(Object.values(logs)
  .flatMap(mock => mock.mock.calls.map(call => call.arguments)));
const assertNoMarkers = value => {
  for (const marker of markers) assert.doesNotMatch(value, new RegExp(marker));
};

for (const [label, error, category, status] of [
  ['auth', new ProviderError('groq', 'auth', rawExternalMessage, 401), 'auth', 401],
  ['quota', new ProviderError('groq', 'quota', rawExternalMessage, 429), 'quota', 429],
  ['timeout', new ProviderError('groq', 'timeout', rawExternalMessage, 504), 'timeout', 504],
  ['network', new ProviderError('groq', 'network', rawExternalMessage, 502), 'network', 502],
  ['malformed response', new ProviderError('groq', 'empty-response', rawExternalMessage, 502), 'empty-response', 502],
]) {
  test(`${label} uses the safe structured provider error schema`, async t => {
    const logs = captureLogs(t);
    const generate = t.mock.fn(async () => { throw error; });
    const response = await createChatbotHandler(() => ({ name: 'groq', generate }))(event());
    assert.deepEqual(JSON.parse(response.body), {
      answer: DEFAULT_ANSWER, source: `fallback-groq-${category}`,
    });
    assert.equal(logs.error.mock.callCount(), 1);
    const log = logs.error.mock.calls[0].arguments[0];
    assert.equal(log.event, 'chatbot_provider_error');
    assert.equal(log.requestId, requestId);
    assert.equal(log.provider, 'groq');
    assert.equal(log.category, category);
    assert.equal(log.status, status);
    assert.equal(log.stage, 'initial');
    assert.equal(log.retryAttempt, 0);
    assert.ok(Number.isInteger(log.durationMs) && log.durationMs >= 0);
    assertNoMarkers(serializedLogs(logs));
  });
}

test('retry failure is sanitized and reports retry stage', async t => {
  const logs = captureLogs(t);
  let calls = 0;
  const generate = t.mock.fn(async () => {
    calls += 1;
    if (calls === 1) return truncated();
    throw new ProviderError('groq', 'network', rawExternalMessage, 502);
  });
  const response = await createChatbotHandler(() => ({ name: 'groq', generate }))(event());
  assert.equal(JSON.parse(response.body).source, 'fallback-groq-network');
  assert.equal(generate.mock.callCount(), 2);
  assert.equal(logs.error.mock.callCount(), 1);
  assert.deepEqual(logs.error.mock.calls[0].arguments[0], {
    event: 'chatbot_provider_retry_failed', requestId, provider: 'groq', category: 'network',
    stage: 'retry', retryAttempt: 1,
    durationMs: logs.error.mock.calls[0].arguments[0].durationMs, status: 502,
  });
  assert.equal(logs.warn.mock.calls[0].arguments[0].event, 'chatbot_provider_truncated');
  assert.equal(logs.info.mock.calls[0].arguments[0].event, 'chatbot_provider_retry');
  assertNoMarkers(serializedLogs(logs));
});

test('persistent truncation is sanitized and never exposes partial text', async t => {
  const logs = captureLogs(t);
  const generate = t.mock.fn(async () => truncated());
  const response = await createChatbotHandler(() => ({ name: 'groq', generate }))(event());
  assert.equal(JSON.parse(response.body).source, 'fallback-groq-truncated');
  assert.equal(generate.mock.callCount(), 2);
  const log = logs.error.mock.calls[0].arguments[0];
  assert.equal(log.event, 'chatbot_provider_retry_failed');
  assert.equal(log.category, 'truncated');
  assert.equal(log.stage, 'retry');
  assert.equal(log.retryAttempt, 1);
  assertNoMarkers(serializedLogs(logs));
  assertNoMarkers(response.body);
});

test('unexpected errors expose only a controlled error type', async t => {
  const logs = captureLogs(t);
  const unexpected = new Error(rawExternalMessage);
  unexpected.name = markers[3];
  const generate = t.mock.fn(async () => { throw unexpected; });
  const response = await createChatbotHandler(() => ({ name: 'groq', generate }))(event());
  assert.equal(JSON.parse(response.body).source, 'fallback-groq-error');
  const log = logs.error.mock.calls[0].arguments[0];
  assert.equal(log.category, 'unexpected');
  assert.equal(log.errorType, 'Error');
  assert.equal(log.status, undefined);
  assertNoMarkers(serializedLogs(logs));
});

test('request IDs accept Netlify-safe values and replace missing or unsafe input', () => {
  assert.equal(getRequestId(requestId), requestId);
  for (const candidate of [undefined, '', `unsafe ${markers[0]}`, 'x'.repeat(129)]) {
    assert.match(getRequestId(candidate), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  }
});

test('safe formatter ignores external message, provider, code, status and event values', () => {
  const hostile = Object.assign(new Error(rawExternalMessage), {
    name: rawExternalMessage, provider: rawExternalMessage, code: rawExternalMessage,
    status: 999, stack: rawExternalMessage,
  });
  const log = toSafeProviderLog(hostile, {
    event: rawExternalMessage, requestId, provider: rawExternalMessage,
    category: rawExternalMessage, stage: rawExternalMessage, retryAttempt: 99, durationMs: -1,
  });
  assert.deepEqual(log, {
    event: 'chatbot_provider_error', requestId, provider: 'unknown', category: 'unexpected',
    stage: 'initial', retryAttempt: 0, durationMs: 0, errorType: 'Error',
  });
  assertNoMarkers(JSON.stringify(log));
});

test('successful responses keep the public contract and emit no error log', async t => {
  const logs = captureLogs(t);
  const response = await createChatbotHandler(() => ({ name: 'groq', generate: async () => complete('answer') }))(event());
  assert.deepEqual(JSON.parse(response.body), { answer: 'answer', source: 'groq' });
  assert.equal(logs.error.mock.callCount(), 0);
  assert.equal(logs.warn.mock.callCount(), 0);
  assert.equal(logs.info.mock.callCount(), 0);
});
