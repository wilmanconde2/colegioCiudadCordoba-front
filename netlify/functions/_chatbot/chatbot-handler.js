import { DEFAULT_ANSWER } from './colegio-knowledge.js';
import { getLocalAnswer } from './local-answer.js';
import { buildProviderMessages } from './prompt.js';
import { getProvider } from './providers/index.js';

// The client sends 500 message + 6 x 500 history UTF-16 code units.
// 24 KiB covers even JSON-escaped content (6 bytes/unit) plus structure.
export const MAX_BODY_BYTES = 24 * 1024;
const JSON_CONTENT_TYPE = /^application\/json(?:\s*;\s*[!#$%&'*+.^_`|~\w-]+=(?:[!#$%&'*+.^_`|~\w-]+|"[\t\x20-\x21\x23-\x5b\x5d-\x7e]*"))*\s*$/i;
const getHeader = (event, name) => Object.entries(event.headers || {})
  .find(([key]) => key.toLowerCase() === name)?.[1];

const ALLOWED_ORIGINS = [
  'http://localhost:8888',
  'http://localhost:5173',
  'https://colegioccc.netlify.app',
  'https://colegiociudadcordoba.edu.co',
  'https://www.colegiociudadcordoba.edu.co',
];

const getOrigin = (event) => getHeader(event, 'origin') || '';
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

export const createChatbotHandler = (resolveProvider = getProvider) => async (event) => {
  const headers = buildHeaders(event);
  if (!['POST', 'OPTIONS'].includes(event.httpMethod)) {
    return jsonResponse(405, { ...headers, Allow: 'POST, OPTIONS' }, { error: 'Método no permitido.' });
  }
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const origin = getOrigin(event);
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return jsonResponse(403, headers, { error: 'Origen no permitido.' });
  }

  if (!JSON_CONTENT_TYPE.test(getHeader(event, 'content-type') || '')) {
    return jsonResponse(415, headers, { error: 'Se requiere application/json.' });
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64')
    : Buffer.from(event.body || '', 'utf8');
  if (rawBody.length > MAX_BODY_BYTES) {
    return jsonResponse(413, headers, { error: 'El cuerpo de la solicitud es demasiado grande.' });
  }
  let body;
  try {
    body = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return jsonResponse(400, headers, { error: 'JSON inválido.' });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)
    || Object.keys(body).some((key) => !['message', 'history'].includes(key))) {
    return jsonResponse(400, headers, { error: 'Estructura de solicitud inválida.' });
  }
  if (typeof body.message !== 'string') {
    return jsonResponse(400, headers, { error: 'La pregunta debe ser texto.' });
  }
  const message = body.message.trim();
  if (!message) return jsonResponse(400, headers, { error: 'La pregunta es obligatoria.' });
  if (message.length > 500) return jsonResponse(400, headers, { error: 'La pregunta es demasiado larga.' });
  const history = getSafeHistory(body.history);

  const localAnswer = getLocalAnswer(message, history);
  if (localAnswer) return jsonResponse(200, headers, { answer: localAnswer, source: 'local' });

  let provider;
  try {
    provider = resolveProvider();
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
};

export const chatbotHandler = createChatbotHandler();
