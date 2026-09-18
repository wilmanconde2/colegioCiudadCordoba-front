import { ProviderError } from './provider-error.js';

const mappings = {
  groq: { complete: ['stop'], truncated: ['length'], blocked: [] },
  openai: { complete: ['stop'], truncated: ['length'], blocked: ['content_filter'] },
  gemini: {
    complete: ['STOP'], truncated: ['MAX_TOKENS'],
    blocked: ['SAFETY', 'RECITATION', 'LANGUAGE', 'BLOCKLIST', 'PROHIBITED_CONTENT', 'SPII',
      'IMAGE_SAFETY', 'IMAGE_PROHIBITED_CONTENT', 'IMAGE_RECITATION'],
  },
  claude: { complete: ['end_turn', 'stop_sequence'], truncated: ['max_tokens', 'model_context_window_exceeded'], blocked: ['refusal'] },
};

// See docs/adr/0002-provider-finish-reasons.md for sources and unknown policy.
export const normalizeProviderResult = (provider, text, rawReason, blocked = false) => {
  const rawFinishReason = typeof rawReason === 'string' ? rawReason : null;
  const finishReason = blocked ? 'blocked' : Object.entries(mappings[provider])
    .find(([, values]) => values.includes(rawFinishReason))?.[0] || 'unknown';
  // Known truncation/block metadata must survive even when no text was emitted.
  if (!text && !['truncated', 'blocked'].includes(finishReason)) {
    throw new ProviderError(provider, 'empty-response', 'Respuesta vacía.', 502);
  }
  return { text: text || '', finishReason, rawFinishReason, truncated: finishReason === 'truncated' };
};
