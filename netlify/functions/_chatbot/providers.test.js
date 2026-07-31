import test from 'node:test';
import assert from 'node:assert/strict';

import { getProvider, SUPPORTED_PROVIDERS } from './providers/index.js';

test('registra los cuatro proveedores de IA solicitados', () => {
  assert.deepEqual([...SUPPORTED_PROVIDERS].sort(), ['claude', 'gemini', 'groq', 'openai']);
});

test('usa Groq como proveedor predeterminado', () => {
  const previous = process.env.AI_PROVIDER;
  delete process.env.AI_PROVIDER;
  const provider = getProvider();
  assert.equal(provider.name, 'groq');
  if (previous) process.env.AI_PROVIDER = previous;
});

import { classifyHttpError } from './providers/provider-error.js';

test('clasifica 413 de Groq como request-too-large', () => {
  const error = classifyHttpError(
    'groq',
    413,
    'Request too large for model llama-3.1-8b-instant on tokens per minute'
  );

  assert.equal(error.code, 'request-too-large');
  assert.equal(error.status, 413);
});
