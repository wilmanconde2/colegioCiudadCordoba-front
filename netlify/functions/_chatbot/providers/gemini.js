import { classifyHttpError, ProviderError } from './provider-error.js';
import { splitProviderMessages } from '../provider-contract.js';
import { normalizeProviderResult } from './provider-result.js';

export const createGeminiProvider = () => ({
  name: 'gemini',
  async generate({ messages, timeoutMs = 15000 }) {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    if (!apiKey) throw new ProviderError('gemini', 'not-configured', 'Gemini API key no configurada.');

    const { system, conversation } = splitProviderMessages(messages);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: system }] },
            contents: conversation.map(({ role, content }) => ({
              role: role === 'assistant' ? 'model' : 'user',
              parts: [{ text: content }],
            })),
            generationConfig: { temperature: 0, topP: 0.7, maxOutputTokens: 1200 },
          }),
        }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw classifyHttpError('gemini', response.status, data?.error?.message || `HTTP ${response.status}`);
      }
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      const blockReason = data?.promptFeedback?.blockReason;
      const blocked = typeof blockReason === 'string' && blockReason !== '' && blockReason !== 'BLOCK_REASON_UNSPECIFIED';
      return normalizeProviderResult('gemini', answer,
        blocked ? blockReason : data?.candidates?.[0]?.finishReason, blocked);
    } catch (error) {
      if (error instanceof ProviderError) throw error;
      if (error?.name === 'AbortError') throw new ProviderError('gemini', 'timeout', 'Tiempo agotado.', 504);
      throw new ProviderError('gemini', 'network', error?.message || 'Error de red.', 502);
    } finally {
      clearTimeout(timeout);
    }
  },
});
