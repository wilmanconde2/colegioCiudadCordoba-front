import { DEFAULT_ANSWER } from './colegio-knowledge.js';
import { getLocalAnswer } from './local-answer.js';
import { buildProviderMessages } from './prompt.js';
import { getProvider } from './providers/index.js';

const ALLOWED_ORIGINS = [
  'http://localhost:8888',
  'http://localhost:5173',
  'https://colegioccc.netlify.app',
  'https://colegiociudadcordoba.edu.co',
  'https://www.colegiociudadcordoba.edu.co',
];

const getOrigin = (event) => event.headers?.origin || event.headers?.Origin || '';
const getAllowedOrigin = (event) => {
  const origin = getOrigin(event);
  return ALLOWED_ORIGINS.includes(origin)
    ? origin
    : 'https://www.colegiociudadcordoba.edu.co';
};
const buildHeaders = (event) => ({
  'Access-Control-Allow-Origin': getAllowedOrigin(event),
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  Vary: 'Origin',
});
const jsonResponse = (statusCode, headers, payload) => ({
  statusCode,
  headers,
  body: JSON.stringify(payload),
});

export const getSafeHistory = (history) => {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.text === 'string' && item.text.trim())
    .slice(-4)
    .map((item) => ({ role: item.role, text: item.text.trim().slice(0, 300) }));
};

export async function chatbotHandler(event) {
  const headers = buildHeaders(event);
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return jsonResponse(405, headers, { error: 'Método no permitido.' });

  const origin = getOrigin(event);
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return jsonResponse(403, headers, { error: 'Origen no permitido.' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, headers, { error: 'JSON inválido.' });
  }

  const message = body.message?.toString().trim();
  const history = getSafeHistory(body.history);
  if (!message) return jsonResponse(400, headers, { error: 'La pregunta es obligatoria.' });
  if (message.length > 500) return jsonResponse(400, headers, { error: 'La pregunta es demasiado larga.' });

  const localAnswer = getLocalAnswer(message, history);
  if (localAnswer) return jsonResponse(200, headers, { answer: localAnswer, source: 'local' });

  let provider;
  try {
    provider = getProvider();
    const answer = await provider.generate({
      message,
      history,
      messages: buildProviderMessages(message, history),
    });
    return jsonResponse(200, headers, { answer, source: provider.name });
  } catch (error) {
    const providerName = provider?.name || process.env.AI_PROVIDER || 'unknown';
    const code = error?.code || 'error';
    console.error(`${providerName} provider error:`, {
      code,
      status: error?.status,
      message: error?.message,
    });
    return jsonResponse(200, headers, {
      answer: DEFAULT_ANSWER,
      source: `fallback-${providerName}-${code}`,
    });
  }
}
