import test from 'node:test';
import assert from 'node:assert/strict';

import { CONTEXT_LIMITS, retrieveRelevantContext } from './context-retriever.js';
import { SCHOOL_CONTEXT } from './colegio-knowledge.js';
import { buildProviderMessages } from './prompt.js';

const getSystemMessage = (message, history = []) =>
  buildProviderMessages(message, history).find((item) => item.role === 'system')?.content || '';

test('recupera solo el contexto relevante de matrícula', () => {
  const context = retrieveRelevantContext('¿Cuánto cuesta la matrícula?');

  assert.match(context, /Matrícula 2026/i);
  assert.match(context, /\$387\.000/);
  assert.doesNotMatch(context, /HORARIO DE ATENCIÓN A PADRES/i);
});

test('recupera contexto relevante de una persona sin cargar todos los docentes', () => {
  const context = retrieveRelevantContext('¿Cuándo atiende Lady Rojas Aranda?');

  assert.match(context, /Lady Rojas Aranda/);
  assert.doesNotMatch(context, /Roosevel Lopez/);
  assert.doesNotMatch(context, /Gustavo García/);
});

test('respeta el límite máximo de caracteres del contexto recuperado', () => {
  const context = retrieveRelevantContext(
    'Necesito información sobre matrícula, pensión, pagos, horarios, docentes y cronograma',
    [],
    { maxChars: 1800, maxEntries: 8 }
  );

  assert.ok(context.length <= 1800);
});

test('el prompt no vuelve a incluir SCHOOL_CONTEXT completo', () => {
  const system = getSystemMessage('¿Qué menú ofrecen mañana en la cafetería?');

  assert.ok(system.length < SCHOOL_CONTEXT.length / 2);
  assert.doesNotMatch(system, /DIRECTORES DE GRUPO 2026:/);
  assert.match(system, /No se encontró información institucional relevante/);
});

test('el prompt se mantiene ampliamente por debajo del límite gratuito de Groq', () => {
  const history = [
    { role: 'user', text: 'Necesito información general del colegio y sus servicios.' },
    { role: 'assistant', text: 'Claro, dime qué aspecto necesitas.' },
    { role: 'user', text: 'También sobre docentes y horarios.' },
    { role: 'assistant', text: '¿Qué docente o grado necesitas?' },
  ];
  const messages = buildProviderMessages(
    'Explícame costos, pagos, cronograma, docentes y modalidades del colegio',
    history
  );
  const serialized = JSON.stringify(messages);

  assert.ok(serialized.length < 12000, `Prompt demasiado grande: ${serialized.length} caracteres`);
  assert.equal(CONTEXT_LIMITS.maxChars, 6500);
});


test('prioriza propuesta de valor para preguntas persuasivas sin quedarse en identidad y lema', () => {
  const context = retrieveRelevantContext(
    'Redacta una respuesta breve para un padre que pregunta por qué debería considerar este colegio para su hijo.'
  );

  assert.match(context, /Servicios y propuesta institucional/i);
  assert.match(context, /formación académica, deportiva, cultural, artística y en valores/i);
  assert.match(context, /Modalidades Comercial e Industrial|Misión/i);
  assert.doesNotMatch(context, /^Información general del colegio:/i);
});

test('recupera fortalezas académicas y formativas con contexto diverso', () => {
  const context = retrieveRelevantContext(
    'Compara brevemente las principales fortalezas académicas y formativas del colegio.'
  );

  assert.match(context, /Servicios y propuesta institucional/i);
  assert.match(context, /Modalidades Comercial e Industrial/i);
  assert.match(context, /SENA|robótica|tecnología/i);
});

test('el prompt de propuesta de valor instruye síntesis factual y mantiene tamaño seguro', () => {
  const system = getSystemMessage(
    'Redacta una respuesta breve para un padre que pregunta por qué debería considerar este colegio para su hijo.'
  );

  assert.match(system, /integra de 2 a 4 hechos institucionales relevantes/i);
  assert.match(system, /No des opiniones ni promesas/i);
  assert.ok(system.length < 10000, `Prompt demasiado grande: ${system.length} caracteres`);
});
