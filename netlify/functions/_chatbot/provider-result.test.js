import test from 'node:test';
import assert from 'node:assert/strict';
import { getProvider } from './providers/index.js';

const messages = [{ role: 'system', content: 'SYSTEM CONTEXT' }, { role: 'user', content: 'QUESTION' }];
const cases = {
  groq: { complete: ['stop'], truncated: ['length'], blocked: [], unknown: ['content_filter', 'tool_calls', 'function_call'] },
  openai: { complete: ['stop'], truncated: ['length'], blocked: ['content_filter'], unknown: ['tool_calls', 'function_call'] },
  gemini: { complete: ['STOP'], truncated: ['MAX_TOKENS'],
    blocked: ['SAFETY', 'RECITATION', 'LANGUAGE', 'BLOCKLIST', 'PROHIBITED_CONTENT', 'SPII', 'IMAGE_SAFETY', 'IMAGE_PROHIBITED_CONTENT', 'IMAGE_RECITATION'],
    unknown: ['OTHER', 'FINISH_REASON_UNSPECIFIED', 'MALFORMED_FUNCTION_CALL', 'UNEXPECTED_TOOL_CALL'] },
  claude: { complete: ['end_turn', 'stop_sequence'], truncated: ['max_tokens', 'model_context_window_exceeded'], blocked: ['refusal'], unknown: ['tool_use', 'pause_turn'] },
};
const response = (name, reason, text) => name === 'gemini'
  ? { candidates: [{ finishReason: reason, content: { parts: [{ text }] } }] }
  : name === 'claude' ? { stop_reason: reason, content: [{ type: 'text', text }] }
    : { choices: [{ finish_reason: reason, message: { content: text } }] };
const setup = (t, name, data) => {
  const key = `${name.toUpperCase()}_API_KEY`;
  const previous = process.env[key];
  process.env[key] = 'synthetic-key';
  t.after(() => {
    if (previous === undefined) delete process.env[key];
    else process.env[key] = previous;
  });
  const fetch = t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => data }));
  return { provider: getProvider(name), fetch };
};
for (const [name, categories] of Object.entries(cases)) {
  for (const [category, reasons] of Object.entries({ ...categories, unknown: [...categories.unknown, 'FUTURE_REASON', null, undefined, 123] })) {
    for (const reason of reasons) {
      test(`${name}: ${String(reason)} normalizes to ${category}`, async t => {
        const { provider, fetch } = setup(t, name, response(name, reason, '  Text intact.\nSecond line.  '));
        assert.deepEqual(await provider.generate({ messages }), {
          text: 'Text intact.\nSecond line.', finishReason: category,
          rawFinishReason: typeof reason === 'string' ? reason : null, truncated: category === 'truncated',
        });
        assert.equal(fetch.mock.callCount(), 1);
      });
    }
  }
  for (const category of ['truncated', 'blocked']) {
    for (const reason of categories[category]) {
      test(`${name}: empty ${reason} retains ${category} metadata`, async t => {
        const { provider } = setup(t, name, response(name, reason, undefined));
        const result = await provider.generate({ messages });
        assert.equal(result.text, '');
        assert.equal(result.finishReason, category);
      });
    }
  }
}
for (const reason of ['SAFETY', 'OTHER', 'BLOCKLIST', 'PROHIBITED_CONTENT', 'IMAGE_SAFETY']) {
  test(`Gemini: promptFeedback ${reason} is blocked without candidates`, async t => {
    const { provider } = setup(t, 'gemini', { promptFeedback: { blockReason: reason } });
    assert.deepEqual(await provider.generate({ messages }), { text: '', finishReason: 'blocked', rawFinishReason: reason, truncated: false });
  });
}
test('OpenAI: explicit refusal overrides normal stop and needs no content', async t => {
  const { provider } = setup(t, 'openai', { choices: [{ finish_reason: 'stop', message: { refusal: 'Refused', content: null } }] });
  assert.deepEqual(await provider.generate({ messages }), { text: '', finishReason: 'blocked', rawFinishReason: 'stop', truncated: false });
});
