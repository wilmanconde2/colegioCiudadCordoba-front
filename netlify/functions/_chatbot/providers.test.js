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
