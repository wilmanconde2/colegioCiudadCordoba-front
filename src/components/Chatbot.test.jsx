import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
});
