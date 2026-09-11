import test from 'node:test';
import assert from 'node:assert/strict';
import * as main from '../chatbot.js';
import * as legacy from '../chatbot-gemini.js';
import { MAX_BODY_BYTES } from './chatbot-handler.js';

for (const [name, endpoint] of [['chatbot', main], ['chatbot-gemini', legacy]]) {
  test(`${name} exposes modern Function and native policy without changing its default URL`, () => {
    assert.equal(typeof endpoint.default, 'function');
    assert.equal(endpoint.handler, undefined);
    assert.deepEqual(endpoint.config, {
      rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] },
    });
  });

  test(`${name} adapter preserves validation statuses and CORS`, async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', () => { throw new Error('No real provider allowed'); });
    for (const [method, headers, body, status] of [
      ['OPTIONS', { origin: 'http://localhost:5173' }, undefined, 200],
      ['GET', {}, undefined, 405],
      ['POST', { origin: 'null' }, '{}', 403],
      ['POST', { 'content-type': 'text/plain' }, '{}', 415],
      ['POST', { 'content-type': 'application/json' }, '{', 400],
      ['POST', { 'content-type': 'application/json' }, '界'.repeat(MAX_BODY_BYTES), 413],
      ['POST', { 'content-type': 'application/json', origin: 'http://localhost:5173' }, JSON.stringify({ message: '¿El colegio tiene ruta?' }), 200],
    ]) {
      const response = await endpoint.default(new Request(`https://example.test/.netlify/functions/${name}`, { method, headers, body }));
      assert.equal(response.status, status);
      if (status === 405) assert.equal(response.headers.get('allow'), 'POST, OPTIONS');
      if (headers.origin === 'http://localhost:5173') assert.equal(response.headers.get('access-control-allow-origin'), headers.origin);
      if (method === 'POST' && status === 200) assert.equal((await response.json()).source, 'local');
    }
    assert.equal(fetch.mock.callCount(), 0);
  });
}
