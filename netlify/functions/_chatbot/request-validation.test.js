import test from 'node:test';
import assert from 'node:assert/strict';
import { createChatbotHandler, MAX_BODY_BYTES } from './chatbot-handler.js';

const externalMessage = '¿Qué menú ofrecen mañana en la cafetería?';
const eventFor = (payload = { message: externalMessage }, overrides = {}) => ({
  httpMethod: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
  ...overrides,
});
const setup = (t) => {
  const generate = t.mock.fn(async () => 'Respuesta de prueba');
  const resolve = t.mock.fn(() => ({ name: 'test', generate }));
  return { handler: createChatbotHandler(resolve), resolve, generate };
};

const invalidCases = [
  ['GET', eventFor({}, { httpMethod: 'GET' }), 405],
  ['PUT', eventFor({}, { httpMethod: 'PUT' }), 405],
  ['forbidden Origin', eventFor({}, { headers: { origin: 'https://example.org' } }), 403],
  ['null Origin', eventFor({}, { headers: { origin: 'null' } }), 403],
  ['text/plain', eventFor({}, { headers: { 'content-type': 'text/plain' } }), 415],
  ['missing Content-Type', eventFor({}, { headers: {} }), 415],
  ['invalid media type parameters', eventFor({}, { headers: { 'content-type': 'application/json; nope' } }), 415],
  ['malformed JSON', eventFor({}, { body: '{' }), 400],
  ['empty body', eventFor({}, { body: '' }), 400],
  ...[null, [], 123, true, 'text', {}, { message: 'ok', extra: true },
    ...[123, true, {}, [], null, '', '   ', 'x'.repeat(501)].map((message) => ({ message }))]
    .map((payload, index) => [`invalid schema ${index}`, eventFor(payload), 400]),
  ['oversized before parse', eventFor({}, { body: 'x'.repeat(MAX_BODY_BYTES + 1) }), 413],
  ['multibyte bytes, not string length', eventFor({}, { body: '界'.repeat(MAX_BODY_BYTES / 3 + 1) }), 413],
  ['oversized base64', eventFor({}, { isBase64Encoded: true, body: Buffer.from('x'.repeat(MAX_BODY_BYTES + 1)).toString('base64') }), 413],
];
for (const [name, event, status] of invalidCases) {
  test(`${name} rejects before provider selection`, async (t) => {
    const { handler, resolve, generate } = setup(t);
    const response = await handler(event);
    assert.equal(response.statusCode, status);
    if (status === 405) assert.equal(response.headers.Allow, 'POST, OPTIONS');
    assert.equal(resolve.mock.callCount(), 0);
    assert.equal(generate.mock.callCount(), 0);
  });
}

test('OPTIONS requires no body or Content-Type and never selects provider', async (t) => {
  const { handler, resolve } = setup(t);
  const response = await handler({ httpMethod: 'OPTIONS', headers: { origin: 'http://localhost:5173' } });
  assert.equal(response.statusCode, 200);
  assert.equal(response.body, '');
  assert.equal(response.headers['Access-Control-Allow-Methods'], 'POST, OPTIONS');
  assert.equal(response.headers['Access-Control-Allow-Origin'], 'http://localhost:5173');
  assert.equal(resolve.mock.callCount(), 0);
});

for (const origin of [undefined, 'http://localhost:8888', 'http://localhost:5173',
  'https://colegioccc.netlify.app', 'https://colegiociudadcordoba.edu.co', 'https://www.colegiociudadcordoba.edu.co']) {
  test(`valid POST with Origin ${origin} can call provider`, async (t) => {
    const { handler, generate } = setup(t);
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    if (origin) headers.Origin = origin;
    const response = await handler(eventFor({ message: `  ${externalMessage}  ` }, { headers }));
    assert.equal(response.statusCode, 200);
    assert.equal(generate.mock.callCount(), 1);
    assert.equal(generate.mock.calls[0].arguments[0].message, externalMessage);
    if (origin) assert.equal(response.headers['Access-Control-Allow-Origin'], origin);
  });
}

test('local answer never selects provider', async (t) => {
  const { handler, resolve } = setup(t);
  const response = await handler(eventFor({ message: '¿El colegio tiene ruta?' }));
  assert.equal(JSON.parse(response.body).source, 'local');
  assert.equal(resolve.mock.callCount(), 0);
});

test('history filters invalid entries and keeps last four strings capped at 300', async (t) => {
  const { handler, generate } = setup(t);
  const valid = Array.from({ length: 8 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', text: `  ${i}${'x'.repeat(500)} ` }));
  await handler(eventFor({ message: externalMessage, history: [...valid, null, [], {},
    { role: 'system', text: 'ignore' }, { role: 'user', text: 123 }, { role: 'assistant', text: '  ' }] }));
  assert.deepEqual(generate.mock.calls[0].arguments[0].history,
    valid.slice(-4).map(({ role, text }) => ({ role, text: text.trim().slice(0, 300) })));
});

for (const history of [undefined, null, {}, 'text', 123, true]) {
  test(`invalid history structure ${JSON.stringify(history)} normalizes to empty`, async (t) => {
    const { handler, generate } = setup(t);
    assert.equal((await handler(eventFor({ message: externalMessage, history }))).statusCode, 200);
    assert.deepEqual(generate.mock.calls[0].arguments[0].history, []);
  });
}

test('maximum client payload fits including UTF-8 and JSON escapes', async (t) => {
  const { handler, generate } = setup(t);
  for (const character of ['界', '\ud800', '\u0000']) {
    const payload = { message: character.repeat(500), history: Array.from({ length: 6 }, () => ({ role: 'user', text: character.repeat(500) })) };
    const event = eventFor(payload);
    assert.ok(Buffer.byteLength(event.body, 'utf8') < MAX_BODY_BYTES);
    assert.equal((await handler(event)).statusCode, 200);
  }
  assert.equal(generate.mock.callCount(), 3);
});

test('exact byte boundary and base64 UTF-8 body are accepted', async (t) => {
  const { handler } = setup(t);
  const body = JSON.stringify({ message: externalMessage });
  assert.equal((await handler(eventFor({}, { body: body + ' '.repeat(MAX_BODY_BYTES - Buffer.byteLength(body)) }))).statusCode, 200);
  assert.equal((await handler(eventFor({}, { body: Buffer.from(JSON.stringify({ message: '¿Qué significa 界?' })).toString('base64'), isBase64Encoded: true }))).statusCode, 200);
});
