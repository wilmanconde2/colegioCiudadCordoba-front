import test from 'node:test';
import assert from 'node:assert/strict';
import { buildRetryMessages, generateChatbotAnswer, RETRY_INSTRUCTION } from './provider-response.js';

const fixture = () => Object.freeze([
  { role: 'system', content: 'SYSTEM_MARKER\nCONTEXT_MARKER' },
  { role: 'assistant', content: 'UNTRUSTED_HISTORY' },
  { role: 'user', content: 'CURRENT_MESSAGE_MARKER' },
].map(Object.freeze));
const result = (finishReason, text = 'answer') => ({ text, finishReason, rawFinishReason: null, truncated: finishReason === 'truncated' });

test('retry composition copies frozen input and changes only the trusted channel', () => {
  const messages = fixture();
  const before = structuredClone(messages);
  const retry = buildRetryMessages(messages);
  assert.deepEqual(retry, [{ role: 'system', content: `${messages[0].content}\n\n${RETRY_INSTRUCTION}` }, ...messages.slice(1)]);
  retry[1].content = 'mutated copy';
  assert.deepEqual(messages, before);
  assert.doesNotMatch(retry[0].content, /UNTRUSTED_HISTORY|CURRENT_MESSAGE_MARKER/);
});

test('retry receives only remaining generation budget and keeps the original input', async t => {
  t.mock.method(console, 'info', () => {});
  t.mock.method(console, 'warn', () => {});
  let now = 100;
  t.mock.method(performance, 'now', () => now);
  const messages = fixture();
  let calls = 0;
  const generate = t.mock.fn(async () => {
    now = 4100;
    calls += 1;
    return calls === 1 ? result('truncated', '') : result('complete');
  });
  assert.equal(await generateChatbotAnswer({ name: 'test', generate }, messages), 'answer');
  assert.equal(generate.mock.callCount(), 2);
  assert.equal(generate.mock.calls[1].arguments[0].timeoutMs, 11000);
  assert.deepEqual(messages, fixture());
});

test('exhausted generation budget falls back without issuing a second call', async t => {
  t.mock.method(console, 'info', () => {});
  t.mock.method(console, 'warn', () => {});
  let now = 0;
  t.mock.method(performance, 'now', () => now);
  const generate = t.mock.fn(async () => { now = 15000; return result('truncated'); });
  await assert.rejects(generateChatbotAnswer({ name: 'test', generate }, fixture()), { code: 'timeout' });
  assert.equal(generate.mock.callCount(), 1);
});

test('retry timeout rejects within the original budget without a third call', async t => {
  t.mock.method(console, 'info', () => {});
  t.mock.method(console, 'warn', () => {});
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let calls = 0;
  const generate = t.mock.fn(async ({ timeoutMs }) => {
    calls += 1;
    if (calls === 1) return result('truncated');
    return new Promise((_, reject) => setTimeout(() => reject(Object.assign(new Error('timeout'), { code: 'timeout' })), timeoutMs));
  });
  const pending = assert.rejects(generateChatbotAnswer({ name: 'test', generate }, fixture()), { code: 'timeout' });
  await Promise.resolve();
  t.mock.timers.tick(15000);
  await pending;
  assert.equal(generate.mock.callCount(), 2);
});
