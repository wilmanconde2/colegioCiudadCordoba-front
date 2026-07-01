// netlify/functions/_chatbot/local-answer.js

import {
  DEFAULT_ANSWER,
  KNOWLEDGE_ENTRIES,
  TEACHERS,
  GROUP_DIRECTORS,
  TUITION_FEES_2026,
  ENROLLMENT_2026,
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

const compact = (value = '') => normalize(value).replace(/\s+/g, '');

const unique = (items) => [...new Set(items.filter(Boolean))];

const GRADE_ALIASES = {
  jardin: ['jardin', 'prejardin', 'preescolar'],
  transicion: ['transicion', 'transición'],
  primero: ['primero', '1', '01', '1ro', '1°'],
  segundo: ['segundo', '2', '02', '2do', '2°'],
  tercero: ['tercero', '3', '03', '3ro', '3°'],
  cuarto: ['cuarto', '4', '04', '4to', '4°'],
  quinto: ['quinto', '5', '05', '5to', '5°'],
  sexto: ['sexto', '6', '06', '6to', '6°'],
  septimo: ['septimo', 'séptimo', '7', '07', '7mo', '7°'],
  octavo: ['octavo', '8', '08', '8vo', '8°'],
  noveno: ['noveno', '9', '09', '9no', '9°'],
  decimo: ['decimo', 'décimo', '10', '10°'],
  once: ['once', '11', '11°'],
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

const getGradeKeyFromText = (text = '') => {
  const clean = normalize(text);

  for (const [grade, aliases] of Object.entries(GRADE_ALIASES)) {
    if (aliases.some((alias) => new RegExp(`\\b${normalize(alias)}\\b`).test(clean))) {
      return grade;
    }
  }

  return null;
};

const hasAny = (question, words = []) => {
  const clean = normalize(question);
  return words.some((word) => clean.includes(normalize(word)));
};

const teacherToAnswer = (teacher) => {
  const courses = teacher.courses?.length ? `\nCursos: ${teacher.courses.join(', ')}` : '';
  const subjects = teacher.subjects?.length
    ? `\nAsignaturas: ${teacher.subjects.join(', ')}`
    : '';
  const schedules = teacher.schedules?.length
    ? teacher.schedules.map((schedule) => `- ${schedule}`).join('\n')
    : '- Por ahora no tengo horario registrado.';

  return `${teacher.name}${courses}${subjects}\nHorario de atención a padres:\n${schedules}`;
};

const directorToAnswer = (director) =>
  `El director(a) de grupo de ${director.course} es ${director.teacher}.`;

const courseMatchesQuestion = (course, question) => {
  const cleanCourse = normalize(course);
  const cleanQuestion = normalize(question);
  const compactCourse = compact(course);
  const compactQuestion = compact(question);

  const exactNumericCourse = cleanQuestion.match(/\b(\d{1,2})\s*-\s*(\d{1,2})\b/);

  if (exactNumericCourse) {
    const requestedGrade = String(Number(exactNumericCourse[1]));
    const requestedSection = String(Number(exactNumericCourse[2]));

    const courseNumbers = cleanCourse.match(/\d+/g) || [];

    if (courseNumbers.length >= 2) {
      return (
        String(Number(courseNumbers[0])) === requestedGrade &&
        String(Number(courseNumbers[1])) === requestedSection
      );
    }

    const gradeWord = NUMBER_TO_GRADE[Number(requestedGrade)];

    if (!gradeWord) return false;

    return (
      new RegExp(`\\b${gradeWord}\\b`).test(cleanCourse) &&
      new RegExp(`\\b${requestedSection}\\b`).test(cleanCourse)
    );
  }

  if (compactQuestion.includes(compactCourse)) return true;

  const courseParts = cleanCourse.split(' ').filter(Boolean);
  const questionParts = cleanQuestion.split(' ').filter(Boolean);

  const courseNumbers = cleanCourse.match(/\d+/g) || [];
  const questionNumbers = cleanQuestion.match(/\d+/g) || [];

  const hasComInd = ['com', 'ind'].every((tag) => {
    if (!courseParts.includes(tag)) return true;
    return questionParts.includes(tag);
  });

  if (!hasComInd) return false;

  const courseGradeNumber = courseNumbers[0];
  const courseSectionNumber = courseNumbers[1];

  if (courseGradeNumber) {
    const gradeWord = NUMBER_TO_GRADE[Number(courseGradeNumber)];
    const gradeAliases = gradeWord ? GRADE_ALIASES[gradeWord] : [courseGradeNumber];

    const questionHasGrade =
      gradeAliases?.some((alias) => new RegExp(`\\b${normalize(alias)}\\b`).test(cleanQuestion)) ||
      questionNumbers.includes(courseGradeNumber);

    const questionHasSection = courseSectionNumber
      ? questionNumbers.includes(courseSectionNumber)
      : true;

    return questionHasGrade && questionHasSection;
  }

  const courseGradeWord = getGradeKeyFromText(cleanCourse);

  if (courseGradeWord) {
    const gradeAliases = GRADE_ALIASES[courseGradeWord];

    const questionHasGrade = gradeAliases.some((alias) =>
      new RegExp(`\\b${normalize(alias)}\\b`).test(cleanQuestion)
    );

    const courseSection = courseNumbers[1] || cleanCourse.match(/\b[a-z]\b/)?.[0];

    if (courseSection) {
      return questionHasGrade && cleanQuestion.includes(courseSection);
    }

    return questionHasGrade;
  }

  return courseParts.length > 0 && courseParts.every((part) => cleanQuestion.includes(part));
};

const findTeacherByName = (question) => {
  const cleanQuestion = normalize(question);
  const questionTokens = cleanQuestion.split(' ').filter((token) => token.length > 2);

  const scored = TEACHERS.map((teacher) => {
    const nameTokens = normalize(teacher.name)
      .split(' ')
      .filter((token) => token.length > 2);

    const matches = nameTokens.filter((token) => questionTokens.includes(token));

    return {
      teacher,
      score: matches.length,
      exact: compact(question).includes(compact(teacher.name)),
    };
  })
    .filter((item) => item.exact || item.score > 0)
    .sort((a, b) => {
      if (b.exact !== a.exact) return Number(b.exact) - Number(a.exact);
      return b.score - a.score;
    });

  if (!scored.length) return null;

  const bestScore = scored[0].score;
  const bestItems = scored.filter((item) => item.exact || item.score === bestScore);

  if (bestItems.length === 1) return bestItems[0].teacher;

  const strongMatches = bestItems.filter((item) => item.score >= 2 || item.exact);

  if (strongMatches.length === 1) return strongMatches[0].teacher;

  return null;
};

const findTeachersByCourseOrSubject = (question) => {
  const cleanQuestion = normalize(question);

  return TEACHERS.filter((teacher) => {
    const courseMatch = teacher.courses?.some((course) => courseMatchesQuestion(course, question));

    const subjectMatch = teacher.subjects?.some((subject) => {
      const subjectWords = normalize(subject)
        .split(' ')
        .filter((word) => word.length > 3);

      return subjectWords.length && subjectWords.every((word) => cleanQuestion.includes(word));
    });

    return courseMatch || subjectMatch;
  });
};

const findTeacherAnswer = (question) => {
  const teacherByName = findTeacherByName(question);

  if (teacherByName) return teacherToAnswer(teacherByName);

  const matchedTeachers = findTeachersByCourseOrSubject(question);

  if (matchedTeachers.length === 1) return teacherToAnswer(matchedTeachers[0]);

  if (matchedTeachers.length > 1) {
    return `Encontré varios docentes relacionados con tu consulta:\n\n${matchedTeachers
      .map((teacher) => teacherToAnswer(teacher))
      .join('\n\n')}`;
  }

  return null;
};

const findDirectorAnswer = (question) => {
  const matched = GROUP_DIRECTORS.filter((director) =>
    courseMatchesQuestion(director.course, question)
  );

  if (matched.length === 1) return directorToAnswer(matched[0]);

  if (matched.length > 1) {
    return `Encontré varios directores de grupo relacionados:\n${matched
      .map((item) => `- ${item.course}: ${item.teacher}`)
      .join('\n')}`;
  }

  return null;
};

const findTuitionAnswer = (question) => {
  const cleanQuestion = normalize(question);

  const wantsTuition = hasAny(cleanQuestion, [
    'pension',
    'pensión',
    'mensualidad',
    'mensual',
    'cuota',
    'valor pension',
    'cuanto vale la pension',
    'cuanto cuesta la pension',
  ]);

  if (!wantsTuition) return null;

  const grade = getGradeKeyFromText(cleanQuestion);

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

const findEnrollmentAnswer = (question) => {
  const cleanQuestion = normalize(question);

  const wantsEnrollment = hasAny(cleanQuestion, [
    'matricula',
    'matrícula',
    'matriculas',
    'matrículas',
    'inscripcion',
    'inscripción',
  ]);

  if (!wantsEnrollment) return null;

  return `Costos de matrícula 2026:
- Matrícula ordinaria: ${ENROLLMENT_2026.ordinary}.
- Matrícula extraordinaria: ${ENROLLMENT_2026.extraordinary}.
- La matrícula extraordinaria aplica con recargo del 10% a partir del 13 de diciembre de 2025.
- La estampilla Pro-cultura 1,5% y el carné estudiantil están incluidos en el costo de matrícula.`;
};

const findKnowledgeAnswer = (question) => {
  const cleanQuestion = normalize(question);

  const scored = KNOWLEDGE_ENTRIES.map((entry) => {
    const score = entry.keywords.reduce((total, keyword) => {
      const normalizedKeyword = normalize(keyword);

      if (!normalizedKeyword) return total;

      if (cleanQuestion.includes(normalizedKeyword)) {
        return total + normalizedKeyword.length + 10;
      }

      const keywordWords = normalizedKeyword.split(' ').filter((word) => word.length > 3);
      const partialScore = keywordWords.filter((word) => cleanQuestion.includes(word)).length;

      return total + partialScore;
    }, 0);

    return { entry, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return null;

  return scored[0].entry.answer;
};

const isGreetingOnly = (question) => {
  const clean = normalize(question);
  return ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches'].includes(clean);
};

export const getLocalAnswer = (question = '') => {
  const cleanQuestion = normalize(question);

  if (!cleanQuestion) return null;

  if (isGreetingOnly(cleanQuestion)) {
    return 'Hola. Soy Keyla, la asistente virtual del Colegio Ciudad Córdoba. Puedo ayudarte con costos, matrículas, pensiones, horarios, docentes, cronograma, pagos y contacto institucional.';
  }

  const teacherIntent = hasAny(cleanQuestion, [
    'profesor',
    'profesora',
    'docente',
    'maestro',
    'maestra',
    'director',
    'directora',
    'titular',
    'grupo',
    'curso',
    'salon',
    'salón',
    'atiende',
    'atencion',
    'atención',
    'horario',
    'asignatura',
    'materia',
  ]);

  const directorIntent = hasAny(cleanQuestion, [
    'director de grupo',
    'directora de grupo',
    'titular',
    'director',
    'directora',
  ]);

  if (directorIntent) {
    const directorAnswer = findDirectorAnswer(question);
    if (directorAnswer) return directorAnswer;
  }

  if (teacherIntent) {
    const teacherAnswer = findTeacherAnswer(question);
    if (teacherAnswer) return teacherAnswer;
  }

  const enrollmentAnswer = findEnrollmentAnswer(question);
  if (enrollmentAnswer) return enrollmentAnswer;

  const tuitionAnswer = findTuitionAnswer(question);
  if (tuitionAnswer) return tuitionAnswer;

  const knowledgeAnswer = findKnowledgeAnswer(question);
  if (knowledgeAnswer) return knowledgeAnswer;

  const teacherAnswer = findTeacherAnswer(question);
  if (teacherAnswer) return teacherAnswer;

  const directorAnswer = findDirectorAnswer(question);
  if (directorAnswer) return directorAnswer;

  return null;
};

export { DEFAULT_ANSWER };