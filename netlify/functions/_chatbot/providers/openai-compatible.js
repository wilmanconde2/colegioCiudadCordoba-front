import { classifyHttpError, ProviderError } from './provider-error.js';

export const createOpenAICompatibleProvider = ({
  name,
  endpoint,
  apiKey,
  model,
  extraHeaders = {},
}) => ({
  name,
  async generate({ messages, timeoutMs = 15000 }) {
    if (!apiKey) {
      throw new ProviderError(name, 'not-configured', `${name} API key no configurada.`, 500);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          ...extraHeaders,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0,
          max_tokens: 1200,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = data?.error?.message || data?.message || `HTTP ${response.status}`;
        throw classifyHttpError(name, response.status, message);
      }

      const answer = data?.choices?.[0]?.message?.content?.trim();
      if (!answer) throw new ProviderError(name, 'empty-response', 'Respuesta vacía.', 502);

      return answer;
    } catch (error) {
      if (error instanceof ProviderError) throw error;
      if (error?.name === 'AbortError') {
        throw new ProviderError(name, 'timeout', 'Tiempo de espera agotado.', 504);
      }
      throw new ProviderError(name, 'network', error?.message || 'Error de red.', 502);
    } finally {
      clearTimeout(timeout);
    }
  },
});
