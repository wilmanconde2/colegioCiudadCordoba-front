import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ACADEMIC_CALENDAR_2026,
  ADMISSIONS_2027,
  ADMISSION_STEPS_2027,
  COSTS_2026 as SHARED_COSTS_2026,
  ENROLLMENT_2026,
  TUITION_FEES_2026,
} from '../../../src/shared/institutional-data.js';
import {
  CONDICIONES,
  COSTOS_2026,
  PASOS_INSCRIPCION,
} from '../../../src/constants/inscripciones.js';
import {
  ACADEMIC_CALENDAR_2026 as KNOWLEDGE_CALENDAR,
  ADMISSIONS_2027 as KNOWLEDGE_ADMISSIONS,
  ENROLLMENT_2026 as KNOWLEDGE_ENROLLMENT,
  KNOWLEDGE_ENTRIES,
  TUITION_FEES_2026 as KNOWLEDGE_TUITION,
} from './colegio-knowledge.js';
import { buildSystemPrompt } from './prompt.js';

test('frontend y chatbot comparten los mismos datos institucionales', () => {
  assert.strictEqual(PASOS_INSCRIPCION, ADMISSION_STEPS_2027);
  assert.strictEqual(CONDICIONES, ADMISSIONS_2027.conditions);
  assert.strictEqual(COSTOS_2026, SHARED_COSTS_2026);
  assert.strictEqual(KNOWLEDGE_ADMISSIONS, ADMISSIONS_2027);
  assert.strictEqual(KNOWLEDGE_ENROLLMENT, ENROLLMENT_2026);
  assert.strictEqual(KNOWLEDGE_TUITION, TUITION_FEES_2026);
  assert.strictEqual(KNOWLEDGE_CALENDAR, ACADEMIC_CALENDAR_2026);
});

test('el contexto de admisiones deriva el estado y requisitos publicados', () => {
  const entry = KNOWLEDGE_ENTRIES.find(({ id }) => id === 'inscripciones-2027');

  assert.match(entry.answer, /ya está disponible/i);
  assert.match(entry.answer, new RegExp(ADMISSIONS_2027.pagePath));
  assert.match(entry.answer, /Registro civil legible/i);
  assert.doesNotMatch(entry.answer, /estará disponible/i);
});

test('el prompt conserva reglas de comportamiento sin fechas de admisiones', () => {
  const prompt = buildSystemPrompt('Contexto de prueba');

  assert.doesNotMatch(prompt, /1 de septiembre de 2026/i);
  assert.doesNotMatch(prompt, /estará disponible/i);
});

test('la centralización preserva tarifas, pensiones y cronograma existentes', () => {
  assert.equal(ENROLLMENT_2026.ordinary, '$387.000');
  assert.equal(ENROLLMENT_2026.extraordinary, '$424.340');
  assert.equal(TUITION_FEES_2026.sexto.discount, '$263.000');
  assert.equal(TUITION_FEES_2026.septimo.normal, '$285.000');
  assert.equal(SHARED_COSTS_2026[0].pension, '$260.000');
  assert.ok(ACADEMIC_CALENDAR_2026.entries.includes('Grados grado 11: sábado 13 de diciembre.'));
});
