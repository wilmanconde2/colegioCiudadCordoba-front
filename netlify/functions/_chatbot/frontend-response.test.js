import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// No DOM/component framework is installed. Execute the actual async UI handler
// with Node's existing test runner; React rendering remains a manual QA step.
const source = await readFile(new URL('../../../src/components/Chatbot.jsx', import.meta.url), 'utf8');
const start = source.indexOf('  const askKeyla = async (question) => {');
const end = source.indexOf('  const handleSubmit =', start);
assert.ok(start >= 0 && end > start, 'Locate the production request handler');
const handlerSource = source.slice(start, end);
const neutralMessage = 'Has realizado varias consultas en poco tiempo. Espera un momento antes de volver a intentarlo.';

const runRequest = async (t, response) => {
  let messages = [];
  const logged = [];
  const timers = new Map();
  const fetch = t.mock.fn(async () => response);
  const requestInProgressRef = { current: false };
  const context = {
    fetch, AbortController, MAX_MESSAGE_LENGTH: 500, REQUEST_TIMEOUT_MS: 30_000,
    CHATBOT_API_URL: '/.netlify/functions/chatbot', messages: [],
    requestInProgressRef, requestControllerRef: { current: null },
    getSafeHistory: () => [], createMessageId: () => String(messages.length),
    setMessages: (update) => { messages = update(messages); },
    setInput: () => {}, setIsLoading: () => {},
    console: { error: (...args) => logged.push(args) },
    window: {
      setTimeout: (callback) => { timers.set(1, callback); return 1; },
      clearTimeout: (id) => timers.delete(id),
    },
  };
  await vm.runInNewContext(`${handlerSource}\naskKeyla('Consulta de prueba');`, context);
  assert.equal(fetch.mock.callCount(), 1, 'one request, no automatic retry');
  assert.equal(timers.size, 0, 'timeout cleared, no retry timer scheduled');
  assert.equal(requestInProgressRef.current, false, 'next manual request is enabled');
  return { answer: messages.at(-1).text, logged };
};

for (const [format, body, contentType] of [
  ['JSON', '{"error":"limited"}', 'application/json'],
  ['text', 'Too many requests', 'text/plain'],
  ['HTML', '<html>Too many requests</html>', 'text/html'],
  ['empty', '', 'text/plain'],
]) {
  test(`UI 429 ${format} shows neutral message without reading body or retrying`, async (t) => {
    const response = new Response(body, { status: 429, headers: { 'Content-Type': contentType } });
    const readBody = t.mock.method(response, 'text', async () => { throw new Error('429 body must not be read'); });
    assert.equal((await runRequest(t, response)).answer, neutralMessage);
    assert.equal(readBody.mock.callCount(), 0);
  });
}

for (const retryAfter of ['60', 'Fri, 11 Sep 2026 19:00:00 GMT']) {
  test(`UI obtains Retry-After ${retryAfter} without automatic retry`, async (t) => {
    const response = new Response('', { status: 429, headers: { 'Retry-After': retryAfter } });
    const result = await runRequest(t, response);
    assert.equal(result.answer, neutralMessage);
    assert.equal(result.logged[0][1].retryAfter, retryAfter);
  });
}

for (const [name, status, body, expected] of [
  ['success', 200, '{"answer":" Respuesta válida "}', 'Respuesta válida'],
  ['server fallback', 200, '{"answer":"Fallback del servidor","source":"fallback-test"}', 'Fallback del servidor'],
  ['missing answer', 200, '{}', 'Por ahora no tengo esa información. Puedes comunicarte directamente con el colegio para recibir orientación.'],
  ['other error', 500, '{"error":"error"}', 'En este momento no puedo responder. Intenta nuevamente o comunícate con secretaría.'],
  ['non-JSON error', 500, '<html>Error</html>', 'En este momento no puedo responder. Intenta nuevamente o comunícate con secretaría.'],
  ['quota code', 503, '{"code":"QUOTA_EXCEEDED"}', 'Keyla está atendiendo muchas consultas en este momento. Intenta nuevamente en aproximadamente un minuto.'],
  ['forbidden', 403, '{}', 'El asistente virtual se encuentra temporalmente en mantenimiento. Intenta nuevamente más tarde.'],
]) {
  test(`UI preserves ${name} handling`, async (t) => {
    assert.equal((await runRequest(t, new Response(body, { status }))).answer, expected);
  });
}
