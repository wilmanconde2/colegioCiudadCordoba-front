import { DEFAULT_ANSWER, SCHOOL_CONTEXT } from './colegio-knowledge.js';

export const buildSystemPrompt = () => `${SCHOOL_CONTEXT}\n\nREGLAS OBLIGATORIAS:\n- Responde únicamente con la base de conocimiento institucional.\n- No inventes ni uses información externa.\n- Responde corto, claro, completo y solo a la intención solicitada.\n- Usa el historial solo para resolver referencias como ella, él o esa persona.\n- No mezcles personas, niveles, costos, servicios ni modalidades.\n- Distingue requisitos de matrícula de costos de matrícula.\n- Ruta escolar significa transporte escolar.\n- Para información de 2027, indica que estará disponible desde el 1 de septiembre de 2026.\n- Si solicitan una persona específica, responde únicamente su información.\n- Si solicitan una cita, comparte el enlace institucional correspondiente.\n- No uses markdown complejo.\n- No saludes si el usuario no saluda.\n- Si la información exacta no existe, responde exactamente: ${DEFAULT_ANSWER}`;

export const buildProviderMessages = (message, history = []) => [
  { role: 'system', content: buildSystemPrompt() },
  ...history.map((item) => ({
    role: item.role === 'assistant' ? 'assistant' : 'user',
    content: item.text,
  })),
  { role: 'user', content: message },
];
