import { classifyHttpError, ProviderError } from './provider-error.js';
import { buildSystemPrompt } from '../prompt.js';

export const createClaudeProvider = () => ({
  name: 'claude',
  async generate({ messages, timeoutMs = 15000 }) {
    const apiKey = process.env.CLAUDE_API_KEY;
    const model = process.env.CLAUDE_MODEL || 'claude-haiku-4-5';
    if (!apiKey) throw new ProviderError('claude', 'not-configured', 'Claude API key no configurada.');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const conversation = messages
      .filter((item) => item.role !== 'system')
      .map((item) => ({ role: item.role, content: item.content }));

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          system: buildSystemPrompt(),
          messages: conversation,
          temperature: 0,
          max_tokens: 1200,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw classifyHttpError('claude', response.status, data?.error?.message || `HTTP ${response.status}`);
      }
      const answer = data?.content?.find((item) => item.type === 'text')?.text?.trim();
      if (!answer) throw new ProviderError('claude', 'empty-response', 'Respuesta vacía.', 502);
      return answer;
    } catch (error) {
      if (error instanceof ProviderError) throw error;
      if (error?.name === 'AbortError') throw new ProviderError('claude', 'timeout', 'Tiempo agotado.', 504);
      throw new ProviderError('claude', 'network', error?.message || 'Error de red.', 502);
    } finally {
      clearTimeout(timeout);
    }
  },
});
