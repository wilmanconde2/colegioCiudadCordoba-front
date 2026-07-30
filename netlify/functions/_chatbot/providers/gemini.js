import { classifyHttpError, ProviderError } from './provider-error.js';
import { buildSystemPrompt } from '../prompt.js';

export const createGeminiProvider = () => ({
  name: 'gemini',
  async generate({ message, history = [], timeoutMs = 15000 }) {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    if (!apiKey) throw new ProviderError('gemini', 'not-configured', 'Gemini API key no configurada.');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const context = history.length
      ? history.map((item) => `${item.role === 'user' ? 'Usuario' : 'Keyla'}: ${item.text}`).join('\n')
      : 'No hay mensajes anteriores.';

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [{ text: `${buildSystemPrompt()}\n\nCONTEXTO RECIENTE:\n${context}\n\nPREGUNTA:\n${message}` }],
            }],
            generationConfig: { temperature: 0, topP: 0.7, maxOutputTokens: 1200 },
          }),
        }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw classifyHttpError('gemini', response.status, data?.error?.message || `HTTP ${response.status}`);
      }
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (!answer) throw new ProviderError('gemini', 'empty-response', 'Respuesta vacía.', 502);
      return answer;
    } catch (error) {
      if (error instanceof ProviderError) throw error;
      if (error?.name === 'AbortError') throw new ProviderError('gemini', 'timeout', 'Tiempo agotado.', 504);
      throw new ProviderError('gemini', 'network', error?.message || 'Error de red.', 502);
    } finally {
      clearTimeout(timeout);
    }
  },
});
