import crypto from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ACADEMIC_CALENDAR_2026,
  ADMISSIONS_2027,
  ENROLLMENT_2026,
  TUITION_FEES_2026,
} from '../../../src/shared/institutional-data.js';
import * as knowledge from './colegio-knowledge.js';
import {
  buildAdmissionsKnowledge,
  buildCalendarKnowledge,
  buildCoordinationKnowledge,
  buildEnrollmentKnowledge,
  buildPsychologyKnowledge,
  buildTuitionKnowledge,
} from './knowledge/builders.js';
import { retrieveRelevantContext } from './context-retriever.js';

const hash = (value) =>
  crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('preserva exports, orden y contenido completo del knowledge', () => {
  assert.deepEqual(Object.keys(knowledge).sort(), [
    'ACADEMIC_CALENDAR_2026',
    'ADMISSIONS_2027',
    'APPOINTMENT_LINKS',
    'COORDINATORS',
    'DEFAULT_ANSWER',
    'ENROLLMENT_2026',
    'GENERAL_CONTEXT',
    'GROUP_DIRECTORS',
    'KNOWLEDGE_ENTRIES',
    'PSYCHOLOGISTS',
    'SCHOOL_CONTEXT',
    'TEACHERS',
    'TUITION_FEES_2026',
  ]);
  assert.deepEqual(knowledge.KNOWLEDGE_ENTRIES.map(({ id }) => id), [
    'identidad-colegio',
    'contacto',
    'horario-oficina',
    'mision',
    'vision',
    'jornadas',
    'pagos',
    'matricula-2026',
    'inscripciones-2027',
    'pension-preescolar-primaria',
    'pension-sexto',
    'pension-7-11',
    'cronograma-2026',
    'reuniones-padres-2026',
    'coordinacion',
    'psicologia',
    'servicios-institucionales',
    'deporte-ludica',
    'modalidades',
    'manual-convivencia',
    'evaluacion-promocion',
    'pqrs',
    'perfiles',
    'historia-resumen',
  ]);
  assert.equal(hash(knowledge.KNOWLEDGE_ENTRIES), '80c7b4f1081af5253da64e55c2d37b4fc81d708c14741324a8788e0d918075ab');
  assert.equal(hash(knowledge.TEACHERS), 'b0521b08aaabfdb28da11d156109db7496cfeb894903a365b13e071b6affd287');
  assert.equal(hash(knowledge.GROUP_DIRECTORS), 'c2fbb365bfa65ce64aa103cf49ee442ceeaf02c33317f2013ffe60d6b712d1dc');
  assert.equal(hash(knowledge.SCHOOL_CONTEXT), 'c621ca58c53361b7b7350b716ed996318d3bbceb1b28183c229f41a211989bb8');
});

test('builders puros derivan el contenido desde los datos institucionales compartidos', () => {
  assert.strictEqual(knowledge.ADMISSIONS_2027, ADMISSIONS_2027);
  assert.strictEqual(knowledge.ENROLLMENT_2026, ENROLLMENT_2026);
  assert.strictEqual(knowledge.TUITION_FEES_2026, TUITION_FEES_2026);
  assert.strictEqual(knowledge.ACADEMIC_CALENDAR_2026, ACADEMIC_CALENDAR_2026);

  assert.equal(
    buildAdmissionsKnowledge(),
    knowledge.KNOWLEDGE_ENTRIES.find(({ id }) => id === 'inscripciones-2027').answer,
  );
  assert.equal(
    buildEnrollmentKnowledge(),
    knowledge.KNOWLEDGE_ENTRIES.find(({ id }) => id === 'matricula-2026').answer,
  );
  assert.equal(
    buildTuitionKnowledge('grado 6°', TUITION_FEES_2026.sexto),
    knowledge.KNOWLEDGE_ENTRIES.find(({ id }) => id === 'pension-sexto').answer,
  );
  assert.equal(
    buildCalendarKnowledge(),
    knowledge.KNOWLEDGE_ENTRIES.find(({ id }) => id === 'cronograma-2026').answer,
  );
  assert.equal(
    buildCoordinationKnowledge(),
    knowledge.KNOWLEDGE_ENTRIES.find(({ id }) => id === 'coordinacion').answer,
  );
  assert.equal(
    buildPsychologyKnowledge(),
    knowledge.KNOWLEDGE_ENTRIES.find(({ id }) => id === 'psicologia').answer,
  );
});

test('retrieval conserva entradas críticas y contenido institucional existente', () => {
  const admissions = retrieveRelevantContext('¿Qué documentos necesito para inscripciones 2027?');
  const calendar = retrieveRelevantContext('¿Cuándo son los grados de grado 11?');

  assert.match(admissions, /Inscripciones 2027/);
  assert.match(admissions, /Registro civil legible/);
  assert.match(calendar, /Grados grado 11: sábado 13 de diciembre\./);
});
