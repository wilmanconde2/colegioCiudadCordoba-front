import test from 'node:test';
import assert from 'node:assert/strict';
import { sendChatMessage } from '../../../src/components/chatbot/chatbotApi.js';
import { getChatbotErrorMessage } from '../../../src/components/chatbot/chatbotUtils.js';

const neutralMessage = 'Has realizado varias consultas en poco tiempo. Espera un momento antes de volver a intentarlo.';

const runRequest = async (t, response) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => response);

  try {
    const answer = await sendChatMessage({
      message: 'Consulta de prueba',
      history: [],
      signal: new AbortController().signal,
    });
    assert.equal(fetchMock.mock.callCount(), 1, 'one request, no automatic retry');
    return { answer, error: null };
  } catch (error) {
    assert.equal(fetchMock.mock.callCount(), 1, 'one request, no automatic retry');
    return { answer: getChatbotErrorMessage(error), error };
  }
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
    assert.equal(result.error.retryAfter, retryAfter);
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
