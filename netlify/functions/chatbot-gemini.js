// netlify/functions/chatbot-gemini.js

import { DEFAULT_ANSWER, SCHOOL_CONTEXT } from './_chatbot/colegio-knowledge.js';
import { getLocalAnswer } from './_chatbot/local-answer.js';

const ALLOWED_ORIGINS = [
  'http://localhost:8888',
  'http://localhost:5173',
  'https://colegiociudadcordoba.edu.co',
  'https://www.colegiociudadcordoba.edu.co',
];

const getOrigin = (event) =>
  event.headers.origin || event.headers.Origin || '';

const getAllowedOrigin = (event) => {
  const origin = getOrigin(event);

  if (ALLOWED_ORIGINS.includes(origin)) {
    return origin;
  }

  return 'https://www.colegiociudadcordoba.edu.co';
};

const buildHeaders = (event) => ({
  'Access-Control-Allow-Origin': getAllowedOrigin(event),
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
});

const jsonResponse = (statusCode, headers, payload) => ({
  statusCode,
  headers,
  body: JSON.stringify(payload),
});

const buildGeminiPrompt = (message) => `
${SCHOOL_CONTEXT}

PREGUNTA DEL USUARIO:
${message}

INSTRUCCIÓN FINAL:
Responde únicamente usando la base de conocimiento institucional anterior.

Reglas obligatorias:
- No inventes información.
- No uses información externa.
- No cortes respuestas.
- Responde corto, claro y completo.
- Si preguntan por costos, entrega el valor completo según grado y fecha de pago.
- Si preguntan por pensión, incluye los tres rangos: día 1 al 4, día 5 al 8 y desde el día 9.
- Si preguntan por matrícula, incluye ordinaria y extraordinaria.
- Si preguntan por docentes, entrega nombre, curso/asignatura y horario completo.
- Si preguntan por director de grupo, responde con el docente exacto.
- No uses markdown complejo.
- No saludes si el usuario no saluda.

Si no existe la información exacta, responde exactamente:
"${DEFAULT_ANSWER}"
`;

export async function handler(event) {
  const headers = buildHeaders(event);

  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Solo POST
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, headers, {
      error: 'Método no permitido.',
    });
  }

  // Validación de origen
  const origin = getOrigin(event);

  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    console.warn('Origen bloqueado:', origin);

    return jsonResponse(403, headers, {
      error: 'Origen no permitido.',
      origin,
    });
  }

  try {
    let body = {};

    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return jsonResponse(400, headers, {
        error: 'JSON inválido.',
      });
    }

    const message = body.message?.toString().trim();

    if (!message) {
      return jsonResponse(400, headers, {
        error: 'La pregunta es obligatoria.',
      });
    }

    if (message.length > 500) {
      return jsonResponse(400, headers, {
        error: 'La pregunta es demasiado larga.',
      });
    }

    // Respuesta local primero
    const localAnswer = getLocalAnswer(message);

    if (localAnswer) {
      return jsonResponse(200, headers, {
        answer: localAnswer,
        source: 'local',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    if (!apiKey) {
      console.error('GEMINI_API_KEY no configurada.');

      return jsonResponse(200, headers, {
        answer: DEFAULT_ANSWER,
        source: 'fallback-no-api-key',
      });
    }

    let geminiResponse;

    try {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: buildGeminiPrompt(message),
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              topP: 0.7,
              maxOutputTokens: 1600,
            },
          }),
        }
      );
    } catch (error) {
      console.error('Gemini fetch error:', error);

      return jsonResponse(200, headers, {
        answer: DEFAULT_ANSWER,
        source: 'fallback-gemini-network-error',
      });
    }

    const data = await geminiResponse.json().catch(() => ({}));

    if (!geminiResponse.ok) {
      console.error(
        'Gemini API error:',
        JSON.stringify(data, null, 2)
      );

      const apiError = data?.error?.message?.toLowerCase() || '';

      if (
        geminiResponse.status === 429 ||
        apiError.includes('quota') ||
        apiError.includes('rate')
      ) {
        return jsonResponse(200, headers, {
          answer: DEFAULT_ANSWER,
          source: 'fallback-gemini-quota',
        });
      }

      if (
        geminiResponse.status === 503 ||
        apiError.includes('high demand') ||
        apiError.includes('service unavailable')
      ) {
        return jsonResponse(200, headers, {
          answer: DEFAULT_ANSWER,
          source: 'fallback-gemini-unavailable',
        });
      }

      if (apiError.includes('api key')) {
        return jsonResponse(200, headers, {
          answer: DEFAULT_ANSWER,
          source: 'fallback-invalid-api-key',
        });
      }

      return jsonResponse(200, headers, {
        answer: DEFAULT_ANSWER,
        source: 'fallback-gemini-error',
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      DEFAULT_ANSWER;

    return jsonResponse(200, headers, {
      answer,
      source: 'gemini',
    });
  } catch (error) {
    console.error('Function error:', error);

    return jsonResponse(500, headers, {
      error: 'Error interno en la función chatbot-gemini.',
    });
  }
}