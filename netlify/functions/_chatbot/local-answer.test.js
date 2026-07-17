import test from 'node:test';
import assert from 'node:assert/strict';

import { COORDINATORS, GROUP_DIRECTORS, PSYCHOLOGISTS, TEACHERS } from './colegio-knowledge.js';
import { getLocalAnswer } from './local-answer.js';

test('responde únicamente con la coordinadora de primaria solicitada', () => {
  const answer = getLocalAnswer('Dame información de la coordinadora de primaria');

  assert.match(answer, /Diana Díaz/);
  assert.doesNotMatch(answer, /Alexander Fajardo/);
});

test('responde únicamente con el coordinador de bachillerato solicitado', () => {
  const answer = getLocalAnswer('Dame información del coordinador de bachillerato');

  assert.match(answer, /Alexander Fajardo/);
  assert.doesNotMatch(answer, /Diana Díaz/);
});

test('resuelve individualmente todos los coordinadores registrados', () => {
  for (const coordinator of Object.values(COORDINATORS)) {
    const answer = getLocalAnswer(`¿Cuándo atiende ${coordinator.name}?`);

    assert.match(answer, new RegExp(coordinator.name));
    for (const other of Object.values(COORDINATORS).filter(
      (item) => item.name !== coordinator.name
    )) {
      assert.doesNotMatch(answer, new RegExp(other.name));
    }
  }
});

test('resuelve individualmente todos los docentes registrados por nombre', () => {
  for (const teacher of TEACHERS) {
    const answer = getLocalAnswer(`¿Cuándo atiende ${teacher.name}?`);

    assert.ok(answer.startsWith(teacher.name), `No resolvió correctamente a ${teacher.name}`);
    assert.match(answer, /Horario de atención a padres/);
  }
});

test('resuelve el docente exacto de todos los grupos registrados', () => {
  for (const director of GROUP_DIRECTORS) {
    const answer = getLocalAnswer(`¿Quién es el profe del curso ${director.course}?`);

    assert.match(
      answer,
      new RegExp(director.teacher),
      `No resolvió ${director.course} como ${director.teacher}`
    );
    assert.match(answer, /Horario de atención a padres/);
  }
});

test('diferencia profesor del grupo y profesor de una asignatura', () => {
  const groupTeacher = getLocalAnswer('¿Quién es la profe del curso 3.3?');
  const subjectTeacher = getLocalAnswer('¿Quién es la profe de Inglés del curso 3.3?');

  assert.match(groupTeacher, /Lady Rojas Aranda/);
  assert.doesNotMatch(groupTeacher, /Tulia Muñoz/);
  assert.match(subjectTeacher, /Tulia Muñoz/);
  assert.doesNotMatch(subjectTeacher, /Lady Rojas Aranda/);
});

test('resuelve todas las combinaciones registradas de docente, curso y asignatura', () => {
  for (const teacher of TEACHERS) {
    for (const course of teacher.courses || []) {
      for (const subject of teacher.subjects || []) {
        const answer = getLocalAnswer(
          `¿Quién es el profesor de ${subject} del curso ${course}?`
        );

        assert.match(
          answer,
          new RegExp(teacher.name),
          `No resolvió ${subject} de ${course} como ${teacher.name}`
        );
      }
    }
  }
});

test('pide la modalidad cuando un grupo de bachillerato es ambiguo', () => {
  const answer = getLocalAnswer('¿Quién es el profe de séptimo 1?');

  assert.match(answer, /Comercial e Industrial/);
  assert.doesNotMatch(answer, /Horario de atención a padres/);
});

test('resuelve individualmente todas las profesionales de Psicología', () => {
  for (const psychologist of PSYCHOLOGISTS) {
    const answer = getLocalAnswer(`Dame el horario de ${psychologist.name}`);

    assert.ok(
      answer.startsWith(psychologist.name),
      `No resolvió correctamente a ${psychologist.name}`
    );
    for (const other of PSYCHOLOGISTS.filter((item) => item.name !== psychologist.name)) {
      assert.doesNotMatch(answer, new RegExp(other.name));
    }
  }
});

test('resuelve una cita de seguimiento usando el contexto reciente', () => {
  const history = [
    { role: 'user', text: 'Dame información de la coordinadora de primaria' },
    { role: 'assistant', text: 'Diana Díaz - Coordinación Primaria' },
  ];
  const answer = getLocalAnswer('Necesito agendar cita con ella', history);

  assert.match(answer, /solicitar la cita con Coordinación/i);
  assert.match(answer, /https:\/\/wa\.me\/573104280125/);
});

test('permite agendar por nombre con coordinadores, docentes y Psicología', () => {
  const coordination = getLocalAnswer('Quiero agendar cita con Alexander Fajardo');
  const teacher = getLocalAnswer('Quiero agendar cita con Lady Rojas Aranda');
  const psychology = getLocalAnswer('Quiero agendar cita con Hannyt Kienesberger');

  assert.match(coordination, /cita con Coordinación/);
  assert.match(coordination, /Alexander%20Fajardo/);
  assert.match(teacher, /cita con el docente/);
  assert.match(teacher, /Lady%20Rojas%20Aranda/);
  assert.match(psychology, /cita con Psicología/);
  assert.match(psychology, /Hannyt%20Kienesberger/);
});

test('genera la cita correcta para todas las personas registradas', () => {
  for (const coordinator of Object.values(COORDINATORS)) {
    const answer = getLocalAnswer(`Quiero agendar cita con ${coordinator.name}`);
    assert.match(answer, /cita con Coordinación/);
    assert.ok(answer.includes(encodeURIComponent(coordinator.name)));
  }

  for (const teacher of TEACHERS) {
    const answer = getLocalAnswer(`Quiero agendar cita con ${teacher.name}`);
    assert.match(answer, /cita con el docente/);
    assert.ok(answer.includes(encodeURIComponent(teacher.name)));
  }

  for (const psychologist of PSYCHOLOGISTS) {
    const answer = getLocalAnswer(`Quiero agendar cita con ${psychologist.name}`);
    assert.match(answer, /cita con Psicología/);
    assert.ok(answer.includes(encodeURIComponent(psychologist.name)));
  }
});

test('agenda con el director correcto para todos los grupos registrados', () => {
  for (const director of GROUP_DIRECTORS) {
    const answer = getLocalAnswer(
      `Quiero agendar una cita con el profe del curso ${director.course}`
    );

    assert.match(answer, /cita con el docente/);
    assert.ok(
      answer.includes(encodeURIComponent(director.teacher)),
      `La cita de ${director.course} no se dirigió a ${director.teacher}`
    );
  }
});

test('resuelve citas de seguimiento con cualquier docente nombrado antes', () => {
  const history = [
    { role: 'user', text: '¿Cuándo atiende Lady Rojas Aranda?' },
    { role: 'assistant', text: getLocalAnswer('¿Cuándo atiende Lady Rojas Aranda?') },
  ];
  const answer = getLocalAnswer('Quiero agendar cita con ella', history);

  assert.match(answer, /cita con el docente/);
  assert.match(answer, /Lady%20Rojas%20Aranda/);
});

test('resuelve el seguimiento de cita para todas las personas registradas', () => {
  const cases = [
    ...Object.values(COORDINATORS).map((person) => ({ person, type: /Coordinación/ })),
    ...TEACHERS.map((person) => ({ person, type: /docente/ })),
    ...PSYCHOLOGISTS.map((person) => ({ person, type: /Psicología/ })),
  ];

  for (const { person, type } of cases) {
    const history = [
      { role: 'user', text: `Dame información de ${person.name}` },
      { role: 'assistant', text: `${person.name}\nHorario de atención.` },
    ];
    const answer = getLocalAnswer('¿Cómo saco una cita con esa persona?', history);

    assert.match(answer, type);
    assert.ok(answer.includes(encodeURIComponent(person.name)));
  }
});

test('reconoce distintas formas naturales de solicitar una cita', () => {
  const questions = [
    'Quiero agendar una cita con Coordinación',
    'Necesito solicitar cita con Psicología',
    '¿Cómo programo una cita con la profesora Lady Rojas Aranda?',
    'Deseo reservar una cita con el profe de 3.3',
  ];

  for (const question of questions) {
    assert.match(getLocalAnswer(question), /https:\/\/wa\.me\//);
  }
});

test('informa la fecha de disponibilidad para cupos 2027', () => {
  const answer = getLocalAnswer('¿Hay cupo para el año lectivo 2027 para jardín?');

  assert.match(answer, /1 de septiembre de 2026/);
  assert.doesNotMatch(answer, /\$258\.000/);
});

test('no confunde requisitos de matrícula con costos', () => {
  const answer = getLocalAnswer('¿Cuáles son los requisitos para la matrícula?');

  assert.match(answer, /no tengo confirmada la lista de requisitos/i);
  assert.doesNotMatch(answer, /\$387\.000/);
});

test('interpreta ruta como transporte escolar y no como ubicación', () => {
  const answer = getLocalAnswer('¿El colegio tiene ruta para los niños?');

  assert.match(answer, /ruta o transporte escolar/i);
  assert.doesNotMatch(answer, /Cra\.|ubicado en Cali/i);
});

test('identifica el director exacto de 3.3 y entrega su horario', () => {
  const answer = getLocalAnswer('¿Cómo me comunico con la directora de grupo de 3.3?');

  assert.match(answer, /Lady Rojas Aranda/);
  assert.match(answer, /Horario de atención a padres/);
  assert.match(answer, /Lunes: 8:15 a\.m\. a 9:10 a\.m\./);
  assert.doesNotMatch(answer, /Tulia Muñoz/);
  assert.doesNotMatch(answer, /varios directores/i);
});

test('conserva las respuestas de costos y pensiones existentes', () => {
  assert.match(getLocalAnswer('¿Cuánto cuesta la matrícula?'), /\$387\.000/);
  assert.match(getLocalAnswer('¿Cuánto vale la pensión de sexto?'), /\$263\.000/);
});

test('devuelve null cuando no existe información local relacionada', () => {
  assert.equal(getLocalAnswer('¿Qué menú ofrecen mañana en la cafetería?'), null);
});
