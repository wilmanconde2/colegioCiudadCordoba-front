import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Chatbot from './Chatbot';

const response = ({ status = 200, body = '', headers = new Headers() } = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers,
  text: vi.fn().mockResolvedValue(body),
});

async function openAndSend(question) {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /abrir asistente virtual del colegio/i }));
  const input = screen.getByRole('textbox', { name: /pregunta para el asistente virtual/i });
  await user.type(input, question);
  await user.click(screen.getByRole('button', { name: /enviar pregunta/i }));
  return user;
}

describe('Chatbot', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renderiza y abre el asistente', async () => {
    const user = userEvent.setup();
    render(<Chatbot />);

    await user.click(screen.getByRole('button', { name: /abrir asistente virtual del colegio/i }));

    expect(screen.getByRole('region', { name: /asistente virtual del colegio ciudad córdoba/i })).toBeTruthy();
    expect(screen.getByText(/hola\. soy keyla/i)).toBeTruthy();
  });

  it('envía al endpoint canónico, muestra loading y presenta la respuesta', async () => {
    let resolveFetch;
    fetch.mockReturnValue(new Promise((resolve) => { resolveFetch = resolve; }));
    render(<Chatbot />);

    await openAndSend('¿Cómo pago?');

    expect(screen.getByText('¿Cómo pago?')).toBeTruthy();
    expect(screen.getByText(/consultando información/i)).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe('/.netlify/functions/chatbot');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(fetch.mock.calls[0][1].headers).toEqual({ 'Content-Type': 'application/json' });
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
      message: '¿Cómo pago?',
      history: [
        {
          role: 'assistant',
          text: 'Hola. Soy Keyla, asistente virtual del Colegio Ciudad Córdoba. Puedo ayudarte con costos, matrículas, pensiones, pagos, horarios, cronograma y contacto.',
        },
      ],
    });

    resolveFetch(response({ body: JSON.stringify({ answer: 'Puedes pagar por PSE.' }) }));
    expect(await screen.findByText('Puedes pagar por PSE.')).toBeTruthy();
    await waitFor(() => expect(screen.queryByText(/consultando información/i)).toBeNull());
  });

  it('informa HTTP 429 sin reintentar automáticamente', async () => {
    fetch.mockResolvedValue(response({ status: 429 }));
    render(<Chatbot />);

    await openAndSend('Pregunta limitada');

    expect(await screen.findByText(/varias consultas en poco tiempo/i)).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('informa un error de red sin reintentar automáticamente', async () => {
    fetch.mockRejectedValue(new TypeError('Network error'));
    render(<Chatbot />);

    await openAndSend('Pregunta con error');

    expect(await screen.findByText(/en este momento no puedo responder/i)).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('informa una respuesta inválida sin exponer el contenido ni reintentar', async () => {
    fetch.mockResolvedValue(response({ body: '<html>respuesta inesperada</html>' }));
    render(<Chatbot />);

    await openAndSend('Pregunta con respuesta inválida');

    expect(await screen.findByText(/en este momento no puedo responder/i)).toBeTruthy();
    expect(screen.queryByText(/respuesta inesperada/i)).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('oculta el detalle técnico de un error HTTP genérico', async () => {
    fetch.mockResolvedValue(response({
      status: 500,
      body: JSON.stringify({ error: 'Stack trace privado del proveedor' }),
    }));
    render(<Chatbot />);

    await openAndSend('Pregunta con error HTTP');

    expect(await screen.findByText(/en este momento no puedo responder/i)).toBeTruthy();
    expect(screen.queryByText(/stack trace privado/i)).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('aborta por timeout, muestra un mensaje seguro y limpia el loading', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    fetch.mockImplementation((_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => {
        reject(new DOMException('Detalle técnico del timeout', 'AbortError'));
      });
    }));
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTimeAsync });
    render(<Chatbot />);

    await user.click(screen.getByRole('button', { name: /abrir asistente virtual del colegio/i }));
    await user.type(
      screen.getByRole('textbox', { name: /pregunta para el asistente virtual/i }),
      'Pregunta lenta',
    );
    await user.click(screen.getByRole('button', { name: /enviar pregunta/i }));

    expect(screen.getByText(/consultando información/i)).toBeTruthy();
    await act(() => vi.advanceTimersByTimeAsync(30_000));

    expect(await screen.findByText(/la consulta tardó demasiado tiempo/i)).toBeTruthy();
    expect(screen.queryByText(/detalle técnico/i)).toBeNull();
    expect(screen.queryByText(/consultando información/i)).toBeNull();
    expect(screen.getByRole('textbox', { name: /pregunta para el asistente virtual/i }).disabled).toBe(false);
  });

  it('aborta la solicitud activa al desmontarse', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockImplementation((_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => {
        reject(new DOMException('Solicitud desmontada', 'AbortError'));
      });
    }));
    const { unmount } = render(<Chatbot />);

    await openAndSend('Pregunta pendiente');
    expect(fetch).toHaveBeenCalledTimes(1);

    unmount();
    await act(async () => {});

    expect(abortSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('evita un segundo envío mientras existe una solicitud activa', async () => {
    fetch.mockReturnValue(new Promise(() => {}));
    const user = userEvent.setup();
    render(<Chatbot />);

    await user.click(screen.getByRole('button', { name: /abrir asistente virtual del colegio/i }));
    const input = screen.getByRole('textbox', { name: /pregunta para el asistente virtual/i });
    await user.type(input, 'Consulta única');
    const form = input.closest('form');

    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: /enviar pregunta/i }).disabled).toBe(true);
  });
});
