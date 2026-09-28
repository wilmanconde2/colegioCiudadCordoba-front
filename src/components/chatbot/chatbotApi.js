export const CHATBOT_API_URL = '/.netlify/functions/chatbot';

const DEFAULT_ANSWER =
  'Por ahora no tengo esa información. Puedes comunicarte directamente con el colegio para recibir orientación.';

export async function sendChatMessage({ message, history, signal }) {
  const response = await fetch(CHATBOT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
    signal,
  });

  // Native 429 responses may be text, HTML or empty; inspect status first.
  if (response.status === 429) {
    const rateLimitError = new Error('RATE_LIMITED');
    rateLimitError.retryAfter = response.headers.get('Retry-After');
    throw rateLimitError;
  }

  const rawResponse = await response.text();
  let data = {};

  if (rawResponse) {
    try {
      data = JSON.parse(rawResponse);
    } catch {
      throw new Error('INVALID_SERVER_RESPONSE');
    }
  }

  if (!response.ok) {
    if (data?.code === 'QUOTA_EXCEEDED') throw new Error('QUOTA_EXCEEDED');

    if (
      response.status === 401 ||
      response.status === 403 ||
      data?.code === 'INVALID_API_KEY'
    ) {
      throw new Error('SERVICE_UNAVAILABLE');
    }

    throw new Error(data?.error || 'CHATBOT_REQUEST_FAILED');
  }

  return typeof data?.answer === 'string' && data.answer.trim()
    ? data.answer.trim()
    : DEFAULT_ANSWER;
}
