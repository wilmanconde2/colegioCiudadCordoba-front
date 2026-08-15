// netlify/functions/_chatbot/local-answer.js

import {
  ADMISSIONS_2027,
  COORDINATORS,
  DEFAULT_ANSWER,
  ENROLLMENT_2026,
  GROUP_DIRECTORS,
  KNOWLEDGE_ENTRIES,
  PSYCHOLOGISTS,
  TEACHERS,
  TUITION_FEES_2026,
} from './colegio-knowledge.js';

const normalize = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const compact = (value = '') => normalize(value).replace(/[\s-]+/g, '');

const containsPhrase = (text, phrase) => {
  const cleanText = ` ${normalize(text).replace(/-/g, ' ')} `;
  const cleanPhrase = normalize(phrase).replace(/-/g, ' ');
  return cleanPhrase ? cleanText.includes(` ${cleanPhrase} `) : false;
};

const hasAny = (text, phrases = []) => phrases.some((phrase) => containsPhrase(text, phrase));

const GRADE_ALIASES = {
  jardin: ['jardin', 'prejardin', 'preescolar'],
  transicion: ['transicion'],
  primero: ['primero', '1ro'],
  segundo: ['segundo', '2do'],
  tercero: ['tercero', '3ro'],
  cuarto: ['cuarto', '4to'],
  quinto: ['quinto', '5to'],
  sexto: ['sexto', '6to'],
  septimo: ['septimo', '7mo'],
  octavo: ['octavo', '8vo'],
  noveno: ['noveno', '9no'],
  decimo: ['decimo'],
  once: ['once'],
};

const NUMBER_TO_GRADE = {
  1: 'primero',
  2: 'segundo',
  3: 'tercero',
  4: 'cuarto',
  5: 'quinto',
  6: 'sexto',
  7: 'septimo',
  8: 'octavo',
  9: 'noveno',
  10: 'decimo',
  11: 'once',
};

const GRADE_TO_NUMBER = Object.fromEntries(
  Object.entries(NUMBER_TO_GRADE).map(([number, grade]) => [grade, Number(number)])
);

const getGradeKeyFromText = (text = '') => {
  for (const [grade, aliases] of Object.entries(GRADE_ALIASES)) {
    if (aliases.some((alias) => containsPhrase(text, alias))) return grade;
  }

  return null;
};

const getModality = (text = '') => {
  if (hasAny(text, ['com', 'comercial'])) return 'com';
  if (hasAny(text, ['ind', 'industrial'])) return 'ind';
  return null;
};

const extractRequestedCourse = (text = '') => {
  const raw = text.toString().toLowerCase();
  const clean = normalize(text).replace(/-/g, ' ');
  const labeledNumbers = clean.match(/\b(?:grado|curso|grupo|salon)\s+(1[01]|[1-9])\s+([1-5])\b/);

  if (labeledNumbers) {
    const gradeNumber = Number(labeledNumbers[1]);
    return {
      grade: NUMBER_TO_GRADE[gradeNumber],
      gradeNumber,
      section: String(Number(labeledNumbers[2])),
      modality: getModality(text),
    };
  }

  const separatedNumbers = raw.match(/\b(1[01]|[1-9])\s*(?:[.-]|[°º]\s*)\s*([1-5])\b/);

  if (separatedNumbers) {
    const gradeNumber = Number(separatedNumbers[1]);
    return {
      grade: NUMBER_TO_GRADE[gradeNumber],
      gradeNumber,
      section: String(Number(separatedNumbers[2])),
      modality: getModality(text),
    };
  }

  const grade = getGradeKeyFromText(text);

  if (!grade) return null;

  const aliases = GRADE_ALIASES[grade].map(normalize).join('|');
  const sectionMatch = clean.match(new RegExp(`\\b(?:${aliases})\\s+([1-5a-c])\\b`));

  return {
    grade,
    gradeNumber: GRADE_TO_NUMBER[grade] || null,
    section: sectionMatch ? sectionMatch[1] : null,
    modality: getModality(text),
  };
};

const parseStoredCourse = (course = '') => {
  const clean = normalize(course).replace(/-/g, ' ');
  const grade = getGradeKeyFromText(course);
  const numbers = clean.match(/\d+/g)?.map(Number) || [];

  if (grade) {
    const aliases = GRADE_ALIASES[grade].map(normalize).join('|');
    const sectionMatch = clean.match(new RegExp(`\\b(?:${aliases})\\s+([1-5a-c])\\b`));

    return {
      grade,
      gradeNumber: GRADE_TO_NUMBER[grade] || null,
      section: sectionMatch?.[1] || (numbers[0] ? String(numbers[0]) : null),
      modality: getModality(course),
    };
  }

  return {
    grade: NUMBER_TO_GRADE[numbers[0]] || null,
    gradeNumber: numbers[0] || null,
    section: numbers[1] ? String(numbers[1]) : null,
    modality: getModality(course),
  };
};

const courseMatchesQuestion = (course, question) => {
  const requested = extractRequestedCourse(question);

  if (!requested) return compact(question).includes(compact(course));

  const stored = parseStoredCourse(course);

  if (!stored.grade || stored.grade !== requested.grade) return false;
  if (requested.section && stored.section !== requested.section) return false;
  if (requested.modality && stored.modality !== requested.modality) return false;

  return true;
};

const teacherToAnswer = (teacher) => {
  const courses = teacher.courses?.length ? `\nCursos: ${teacher.courses.join(', ')}` : '';
  const subjects = teacher.subjects?.length
    ? `\nAsignaturas: ${teacher.subjects.join(', ')}`
    : '';
  const schedules = teacher.schedules?.length
    ? teacher.schedules.map((schedule) => `- ${schedule}`).join('\n')
    : '- Por ahora no tengo un horario confirmado.';

  return `${teacher.name}${courses}${subjects}\nHorario de atención a padres:\n${schedules}`;
};

const coordinatorToAnswer = (coordinator) =>
  `${coordinator.name} - ${coordinator.area}:\n${coordinator.schedules
    .map((schedule) => `- ${schedule}`)
    .join('\n')}`;

const psychologistToAnswer = (psychologist) =>
  `${psychologist.name} - Psicología:\n${psychologist.schedules
    .map((schedule) => `- ${schedule}`)
    .join('\n')}\nWhatsApp Psicología: ${psychologist.whatsapp}.`;

const findPersonByName = (question, people) => {
  const cleanQuestion = normalize(question);
  const questionTokens = cleanQuestion.split(' ').filter((token) => token.length > 2);
  const scored = people
    .map((person) => {
      const nameTokens = normalize(person.name)
        .split(' ')
        .filter((token) => token.length > 2);
      const score = nameTokens.filter((token) => questionTokens.includes(token)).length;

      return {
        person,
        score,
        exact: compact(question).includes(compact(person.name)),
      };
    })
    .filter((item) => item.exact || item.score > 0)
    .sort((a, b) => Number(b.exact) - Number(a.exact) || b.score - a.score);

  if (!scored.length) return null;
  if (scored[0].exact) return scored[0].person;

  const best = scored.filter((item) => item.score === scored[0].score);
  return best.length === 1 ? best[0].person : null;
};

const findExactPersonByName = (question, people) =>
  people.find((person) => compact(question).includes(compact(person.name))) || null;

const findTeacherByName = (question) => findPersonByName(question, TEACHERS);

const findCoordinatorByName = (question) =>
  findPersonByName(question, Object.values(COORDINATORS));

const findPsychologistByName = (question) => findPersonByName(question, PSYCHOLOGISTS);

const subjectMatchesQuestion = (subject, question) => {
  const words = normalize(subject)
    .replace(/-/g, ' ')
    .split(' ')
    .filter((word) => word.length > 3);

  return words.length > 0 && words.every((word) => containsPhrase(question, word));
};

const questionHasKnownSubject = (question) =>
  TEACHERS.some((teacher) =>
    teacher.subjects?.some((subject) => subjectMatchesQuestion(subject, question))
  );

const findTeachersByCourseOrSubject = (question) => {
  const hasRequestedCourse = Boolean(extractRequestedCourse(question));
  const hasRequestedSubject = questionHasKnownSubject(question);

  return TEACHERS.filter((teacher) => {
    const courseMatch = teacher.courses?.some((course) => courseMatchesQuestion(course, question));
    const subjectMatch = teacher.subjects?.some((subject) =>
      subjectMatchesQuestion(subject, question)
    );

    if (hasRequestedCourse && hasRequestedSubject) return courseMatch && subjectMatch;
    if (hasRequestedCourse) return courseMatch;
    if (hasRequestedSubject) return subjectMatch;

    return false;
  });
};

const findTeacherAnswer = (question) => {
  const teacherByName = findTeacherByName(question);
  if (teacherByName) return teacherToAnswer(teacherByName);

  const matchedTeachers = findTeachersByCourseOrSubject(question);
  if (matchedTeachers.length === 1) return teacherToAnswer(matchedTeachers[0]);

  if (matchedTeachers.length > 1) {
    return `Encontré varios docentes relacionados. Indica el nombre del docente o si buscas al director de grupo:\n- ${matchedTeachers
      .map((teacher) => teacher.name)
      .join('\n- ')}`;
  }

  return null;
};

const findDirectorAnswer = (question) => {
  const matched = GROUP_DIRECTORS.filter((director) =>
    courseMatchesQuestion(director.course, question)
  );

  if (matched.length > 1) {
    const requested = extractRequestedCourse(question);
    const modalities = new Set(matched.map((item) => parseStoredCourse(item.course).modality));

    if (requested?.section && modalities.has('com') && modalities.has('ind')) {
      return `Encontré el mismo grupo en las modalidades Comercial e Industrial. Indica la modalidad para darte únicamente el docente y horario correctos.`;
    }

    return `Necesito el grupo completo para identificar al docente exacto. Indica grado y número, por ejemplo: Tercero 3.`;
  }

  if (!matched.length) return null;

  const director = matched[0];
  const teacher = TEACHERS.find(
    (item) => normalize(item.name) === normalize(director.teacher)
  );

  if (!teacher) {
    return `El director o directora de grupo de ${director.course} es ${director.teacher}.`;
  }

  return `Director(a) de grupo de ${director.course}:\n${teacherToAnswer(teacher)}`;
};

const findCoordinatorAnswer = (question) => {
  const namedCoordinator = findCoordinatorByName(question);

  if (namedCoordinator) return coordinatorToAnswer(namedCoordinator);

  if (hasAny(question, ['primaria'])) {
    return coordinatorToAnswer(COORDINATORS.primary);
  }

  if (hasAny(question, ['secundaria', 'bachillerato', 'bto'])) {
    return coordinatorToAnswer(COORDINATORS.secondary);
  }

  return `${coordinatorToAnswer(COORDINATORS.primary)}\n\n${coordinatorToAnswer(
    COORDINATORS.secondary
  )}`;
};

const findPsychologistAnswer = (question) => {
  const namedPsychologist = findPsychologistByName(question);

  if (namedPsychologist) return psychologistToAnswer(namedPsychologist);

  return PSYCHOLOGISTS.map(psychologistToAnswer).join('\n\n');
};

const findTuitionAnswer = (question) => {
  if (
    !hasAny(question, [
      'pension',
      'mensualidad',
      'cuota mensual',
      'valor de la pension',
      'cuanto vale la pension',
      'cuanto cuesta la pension',
    ])
  ) {
    return null;
  }

  const grade = getGradeKeyFromText(question);

  if (!grade) {
    return `Pensiones 2026:
- Jardín, Transición y 1° a 5°: día 1 al 4 $258.000; día 5 al 8 $260.000; desde el día 9 $265.200.
- 6°: día 1 al 4 $263.000; día 5 al 8 $265.000; desde el día 9 $270.300.
- 7° a 11°: día 1 al 4 $283.000; día 5 al 8 $285.000; desde el día 9 $290.700.`;
  }

  const fee = TUITION_FEES_2026[grade];
  if (!fee) return null;

  return `Pensión 2026 para ${fee.label}:
- Día 1 al 4: ${fee.discount}.
- Día 5 al 8: ${fee.normal}.
- Desde el día 9: ${fee.late}.`;
};

const findEnrollmentCostAnswer = (question) => {
  const enrollmentIntent = hasAny(question, [
    'matricula',
    'matriculas',
    'inscripcion',
    'inscripciones',
  ]);
  const costIntent = hasAny(question, [
    'cuanto',
    'costo',
    'costos',
    'precio',
    'valor',
    'vale',
    'cuesta',
    'ordinaria',
    'extraordinaria',
  ]);

  if (!enrollmentIntent || !costIntent) return null;

  return `Costos de matrícula 2026:
- Matrícula ordinaria: ${ENROLLMENT_2026.ordinary}.
- Matrícula extraordinaria: ${ENROLLMENT_2026.extraordinary}.
- La matrícula extraordinaria aplica con recargo del 10% a partir del 13 de diciembre de 2025.
- La estampilla Pro-cultura 1,5% y el carné estudiantil están incluidos en el costo de matrícula.`;
};

const isSynthesisOrRelationshipIntent = (question = '') => {
  const clean = normalize(question);

  // Las consultas directas sobre "qué servicios ofrece" tienen una respuesta local
  // completa y estable; conservarlas localmente evita gastar una llamada al proveedor.
  const directServicesIntent =
    hasAny(clean, ['servicios ofrece', 'servicios del colegio', 'que ofrece el colegio']) &&
    !hasAny(clean, [
      'ventajas',
      'fortalezas',
      'por que',
      'como se relacionan',
      'como se integra',
      'como se integran',
    ]);

  if (directServicesIntent) return false;

  const synthesisIntent =
    hasAny(clean, [
      'resume',
      'resumen',
      'resumir',
      'brevemente',
      'en pocas lineas',
      'principales fortalezas',
      'principales ventajas',
      'ventajas educativas',
      'por que deberia',
      'por que considerar',
      'por que elegir',
    ]);

  const relationshipIntent =
    hasAny(clean, [
      'como se relacionan',
      'como se relaciona',
      'como integra',
      'como integran',
      'como se integra',
      'como se integran',
    ]) &&
    hasAny(clean, [
      'modalidad',
      'modalidades',
      'comercial',
      'industrial',
      'futuro laboral',
      'formacion tecnica',
      'tecnologia',
      'robotica',
    ]);

  return synthesisIntent || relationshipIntent;
};

const findKnowledgeAnswer = (question) => {
  const ignoredSingleKeywords = new Set([
    'colegio',
    'nombre',
    'padres',
    'docente',
    'primaria',
    'jardin',
    'transicion',
    'primero',
    'segundo',
    'tercero',
    'cuarto',
    'quinto',
    'sexto',
    'septimo',
    'octavo',
    'noveno',
    'decimo',
    'once',
  ]);

  const scored = KNOWLEDGE_ENTRIES.map((entry) => {
    const matches = entry.keywords
      .map(normalize)
      .filter(Boolean)
      .filter((keyword) => {
        const words = keyword.split(' ');
        if (words.length === 1 && ignoredSingleKeywords.has(keyword)) return false;
        return containsPhrase(question, keyword);
      });

    return {
      entry,
      score: matches.reduce((total, keyword) => total + keyword.length, 0),
    };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return null;
  if (scored[1] && scored[1].score === scored[0].score) return null;
  return scored[0].entry.answer;
};

const isGreetingOnly = (question) =>
  ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches'].includes(
    normalize(question)
  );

const isReferentialFollowUp = (question) =>
  hasAny(question, [
    'ella',
    'esa persona',
    'ese coordinador',
    'esa coordinadora',
    'con ella',
    'con el',
  ]);

const historyToText = (history = []) =>
  history
    .slice(-6)
    .map((message) => message?.text || '')
    .filter(Boolean)
    .join(' ');

const createWhatsAppLink = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

const buildAppointmentAnswer = (type, personName = '') => {
  if (type === 'coordination') {
    const message = `Hola, deseo agendar una cita con coordinación${
      personName ? ` (${personName})` : ''
    }.

Nombre completo acudiente:
Nombre del estudiante:
Grado:
Motivo de la cita:
Día y hora, de acuerdo con el horario de atención:
Teléfono de contacto:`;

    return `Puedes solicitar la cita con Coordinación por WhatsApp aquí:\n${createWhatsAppLink(
      '573104280125',
      message
    )}`;
  }

  if (type === 'psychology') {
    const message = `Hola, deseo agendar una cita con Psicología${
      personName ? ` (${personName})` : ''
    }.

Nombre del acudiente:
Nombre del estudiante:
Grado:
Motivo de la consulta:
Día y hora, de acuerdo con el horario de atención:
Teléfono de contacto:`;

    return `Puedes solicitar la cita con Psicología por WhatsApp aquí:\n${createWhatsAppLink(
      '573175016066',
      message
    )}`;
  }

  const message = `Hola, deseo agendar una cita con un profesor o profesora.

Nombre del profesor: ${personName}
Nombre completo acudiente:
Nombre del estudiante:
Grado:
Motivo de la cita:
Día y hora, de acuerdo con el horario de atención:
Teléfono de contacto:`;

  return `Puedes solicitar la cita con el docente por WhatsApp aquí:\n${createWhatsAppLink(
    '573104280125',
    message
  )}`;
};

const findSingleDirectorTeacher = (question) => {
  const matchedDirector = GROUP_DIRECTORS.filter((director) =>
    courseMatchesQuestion(director.course, question)
  );

  if (matchedDirector.length !== 1) return null;

  return TEACHERS.find(
    (teacher) => normalize(teacher.name) === normalize(matchedDirector[0].teacher)
  );
};

export const getLocalAnswer = (question = '', history = []) => {
  if (!normalize(question)) return null;

  if (isGreetingOnly(question)) {
    return 'Hola. Soy Keyla, la asistente virtual del Colegio Ciudad Córdoba. Puedo ayudarte con costos, matrículas, pensiones, horarios, docentes, cronograma, pagos y contacto institucional.';
  }

  const conversationContext = historyToText(history);
  const resolvedQuestion = isReferentialFollowUp(question)
    ? `${question} ${conversationContext}`
    : question;

  const admissions2027Intent =
    containsPhrase(question, '2027') &&
    hasAny(question, [
      'inscripcion',
      'inscripciones',
      'matricula',
      'matriculas',
      'cupo',
      'cupos',
      'ano lectivo',
    ]);

  if (admissions2027Intent) {
    return `La información de Inscripciones 2027 estará disponible a partir del ${ADMISSIONS_2027.availableFrom}.`;
  }

  const appointmentIntent =
    containsPhrase(question, 'cita') &&
    hasAny(question, [
      'agendar',
      'agendo',
      'sacar',
      'saco',
      'pedir',
      'solicitar',
      'programar',
      'programo',
      'separar',
      'reservar',
      'necesito',
      'quiero',
    ]);

  if (appointmentIntent) {
    const exactCoordinator = findExactPersonByName(
      resolvedQuestion,
      Object.values(COORDINATORS)
    );
    const exactPsychologist = findExactPersonByName(resolvedQuestion, PSYCHOLOGISTS);
    const exactTeacher = findExactPersonByName(resolvedQuestion, TEACHERS);

    if (exactCoordinator) return buildAppointmentAnswer('coordination', exactCoordinator.name);
    if (exactPsychologist) return buildAppointmentAnswer('psychology', exactPsychologist.name);
    if (exactTeacher) return buildAppointmentAnswer('teachers', exactTeacher.name);

    const namedCoordinator = findCoordinatorByName(resolvedQuestion);

    if (hasAny(resolvedQuestion, ['coordinacion', 'coordinador', 'coordinadora'])) {
      return buildAppointmentAnswer('coordination', namedCoordinator?.name);
    }

    const namedPsychologist = findPsychologistByName(resolvedQuestion);

    if (hasAny(resolvedQuestion, ['psicologia', 'psicologa', 'psicologo'])) {
      return buildAppointmentAnswer('psychology', namedPsychologist?.name);
    }

    const namedTeacher = findTeacherByName(resolvedQuestion);
    const directorTeacher = questionHasKnownSubject(resolvedQuestion)
      ? null
      : findSingleDirectorTeacher(resolvedQuestion);
    const matchedTeachers = findTeachersByCourseOrSubject(resolvedQuestion);
    const resolvedTeacher =
      namedTeacher || directorTeacher || (matchedTeachers.length === 1 ? matchedTeachers[0] : null);
    const explicitTeacherType = hasAny(resolvedQuestion, [
      'profesor',
      'profesora',
      'profe',
      'docente',
      'director de grupo',
      'directora de grupo',
    ]);

    if (
      explicitTeacherType ||
      (resolvedTeacher && !namedCoordinator && !namedPsychologist)
    ) {
      return buildAppointmentAnswer('teachers', resolvedTeacher?.name);
    }

    const partialPeople = [namedCoordinator, namedPsychologist, namedTeacher].filter(Boolean);

    if (partialPeople.length === 1 && namedCoordinator) {
      return buildAppointmentAnswer('coordination', namedCoordinator.name);
    }

    if (partialPeople.length === 1 && namedPsychologist) {
      return buildAppointmentAnswer('psychology', namedPsychologist.name);
    }

    if (partialPeople.length > 1) {
      return 'Encontré más de una persona con ese nombre. Indica el nombre completo o si pertenece a Coordinación, Profesores o Psicología.';
    }

    return `Para agendar la cita necesito saber si es con Coordinación, un docente o Psicología.`;
  }

  const enrollmentRequirementsIntent =
    hasAny(question, ['requisito', 'requisitos', 'documento', 'documentos', 'papeles', 'que necesito']) &&
    hasAny(question, ['matricula', 'matriculas', 'inscripcion', 'inscripciones']);

  if (enrollmentRequirementsIntent) {
    return 'Por ahora no tengo confirmada la lista de requisitos o documentos para la matrícula. Para solicitar la información correcta, comunícate con Secretaría al WhatsApp 3104280125.';
  }

  const schoolTransportIntent =
    hasAny(question, ['ruta escolar', 'transporte escolar', 'bus escolar', 'buseta escolar']) ||
    (containsPhrase(question, 'ruta') &&
      hasAny(question, ['tiene', 'ofrece', 'servicio', 'ninos', 'estudiantes', 'colegio']));

  if (schoolTransportIntent) {
    return 'Por ahora no tengo información confirmada sobre el servicio de ruta o transporte escolar. Para verificar su disponibilidad, comunícate con el colegio al WhatsApp 3104280125.';
  }

  const teacherRoleIntent = hasAny(question, [
    'profesor',
    'profesora',
    'profe',
    'docente',
    'maestro',
    'maestra',
  ]);
  const directorIntent =
    hasAny(question, [
      'director de grupo',
      'directora de grupo',
      'director del grupo',
      'directora del grupo',
      'titular del grupo',
    ]) ||
    (teacherRoleIntent && Boolean(extractRequestedCourse(question)) && !questionHasKnownSubject(question));

  if (directorIntent) {
    const directorAnswer = findDirectorAnswer(question);
    if (directorAnswer) return directorAnswer;
  }

  const coordinatorIntent = hasAny(question, [
    'coordinacion',
    'coordinador',
    'coordinadora',
    'diana diaz',
    'alexander fajardo',
  ]);

  if (coordinatorIntent) return findCoordinatorAnswer(question);

  const psychologyIntent = hasAny(question, [
    'psicologia',
    'psicologa',
    'psicologo',
    'hannyt',
    'kienesberger',
    'angela ceballos',
  ]);

  if (psychologyIntent) return findPsychologistAnswer(question);

  const namedTeacher = findTeacherByName(question);
  if (namedTeacher) return teacherToAnswer(namedTeacher);

  const enrollmentAnswer = findEnrollmentCostAnswer(question);
  if (enrollmentAnswer) return enrollmentAnswer;

  const tuitionAnswer = findTuitionAnswer(question);
  if (tuitionAnswer) return tuitionAnswer;

  const teacherIntent = teacherRoleIntent || hasAny(question, [
    'quien atiende',
    'cuando atiende',
    'horario del profesor',
    'horario de la profesora',
    'asignatura',
    'materia',
  ]);

  if (teacherIntent) {
    const teacherAnswer = findTeacherAnswer(question);
    if (teacherAnswer) return teacherAnswer;
  }

  if (!isSynthesisOrRelationshipIntent(question)) {
    const knowledgeAnswer = findKnowledgeAnswer(question);
    if (knowledgeAnswer) return knowledgeAnswer;
  }

  return null;
};

export { DEFAULT_ANSWER };
