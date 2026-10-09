import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendChatMessage } from './chatbotApi';

const response = ({ status = 200, body = '', headers = new Headers() } = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers,
  text: vi.fn().mockResolvedValue(body),
});

describe('sendChatMessage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    [503, { code: 'QUOTA_EXCEEDED' }, 'QUOTA_EXCEEDED'],
    [401, { error: 'detalle privado' }, 'SERVICE_UNAVAILABLE'],
    [403, { error: 'detalle privado' }, 'SERVICE_UNAVAILABLE'],
    [500, { code: 'INVALID_API_KEY' }, 'SERVICE_UNAVAILABLE'],
    [500, {}, 'CHATBOT_REQUEST_FAILED'],
  ])('normaliza el error HTTP %s como %s', async (status, payload, expectedMessage) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({
      status,
      body: JSON.stringify(payload),
    })));

    await expect(sendChatMessage({ message: 'Hola', history: [] }))
      .rejects.toThrow(expectedMessage);
  });

  it('rechaza un payload no JSON sin exponer su contenido', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({
      body: '<html>detalle técnico privado</html>',
    })));

    await expect(sendChatMessage({ message: 'Hola', history: [] }))
      .rejects.toThrow('INVALID_SERVER_RESPONSE');
  });

  it.each([
    ['sin answer', JSON.stringify({ result: 'inesperado' })],
    ['answer vacía', JSON.stringify({ answer: '   ' })],
  ])('usa una respuesta segura para %s', async (_caseName, body) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({ body })));

    await expect(sendChatMessage({ message: 'Hola', history: [] }))
      .resolves.toMatch(/por ahora no tengo esa información/i);
  });

  it('propaga AbortError para que la UI lo traduzca de forma segura', async () => {
    const abortError = new DOMException('detalle técnico', 'AbortError');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abortError));

    await expect(sendChatMessage({ message: 'Hola', history: [] }))
      .rejects.toMatchObject({ name: 'AbortError' });
  });
});
