// netlify/functions/_chatbot/colegio-knowledge.js

import {
  ACADEMIC_CALENDAR_2026,
  ADMISSIONS_2027,
  ENROLLMENT_2026,
  TUITION_FEES_2026,
} from '../../../src/shared/institutional-data.js';
import { KNOWLEDGE_ENTRIES } from './knowledge/knowledge-entries.js';
import {
  COORDINATORS,
  GROUP_DIRECTORS,
  PSYCHOLOGISTS,
  TEACHERS,
} from './knowledge/people.js';

export {
  ACADEMIC_CALENDAR_2026,
  ADMISSIONS_2027,
  ENROLLMENT_2026,
  TUITION_FEES_2026,
  KNOWLEDGE_ENTRIES,
  COORDINATORS,
  GROUP_DIRECTORS,
  PSYCHOLOGISTS,
  TEACHERS,
};

export const DEFAULT_ANSWER =
  'Por ahora no tengo información confirmada sobre esa consulta. Para verificarla, comunícate con el colegio al WhatsApp 3104280125.';

export const APPOINTMENT_LINKS = {
  coordination:
    'https://wa.me/573104280125?text=Hola%2C%20deseo%20agendar%20una%20cita%20con%20coordinaci%C3%B3n.',
  teachers:
    'https://wa.me/573104280125?text=Hola%2C%20deseo%20agendar%20una%20cita%20con%20un%20profesor%20o%20profesora.',
  psychology:
    'https://wa.me/573175016066?text=Hola%2C%20deseo%20agendar%20una%20cita%20con%20psicolog%C3%ADa.',
};

export const GENERAL_CONTEXT = [
  'Eres Keyla, la asistente virtual del Colegio Ciudad Córdoba de Cali.',
  'Tu función es responder preguntas institucionales sobre costos, matrículas, pensiones, pagos, horarios, cronograma, contacto, servicios, docentes y atención a padres de familia.',
  'Keyla es el nombre de la asistente, no del usuario. Nunca llames al usuario Keyla.',
  'Responde únicamente con información institucional incluida en la base de conocimiento.',
  'No inventes datos. Responde corto, claro y amable.',
  'Si no tienes la información exacta, indica claramente que no está confirmada y remite al WhatsApp institucional 3104280125.',
  'Responde solo lo que preguntaron. No agregues información de otra persona, nivel, costo o servicio.',
  'Distingue requisitos de matrícula de costos de matrícula: no son lo mismo.',
  'En este contexto, ruta escolar significa transporte escolar; no significa dirección ni ubicación.',
  'Si solicitan una persona específica, responde únicamente su información.',
  'Profe del curso se refiere al director de grupo; profe de una asignatura se refiere al docente de esa materia.',
  'Las citas se solicitan por WhatsApp para Coordinación, Profesores o Psicología.',
].join('\n');

const teacherContext = TEACHERS.map((teacher) => {
  const courses = teacher.courses.length ? `Cursos: ${teacher.courses.join(', ')}.` : '';
  const subjects = teacher.subjects.length ? `Asignaturas: ${teacher.subjects.join(', ')}.` : '';
  return `${teacher.name}. ${courses} ${subjects} Horario de atención: ${teacher.schedules.join('; ')}.`;
}).join('\n');

const groupDirectorContext = GROUP_DIRECTORS.map(
  (item) => `${item.course}: director(a) de grupo ${item.teacher}.`
).join('\n');

export const SCHOOL_CONTEXT = `${GENERAL_CONTEXT}

BASE DE CONOCIMIENTO DEL SITIO WEB:
${KNOWLEDGE_ENTRIES.map((entry) => `${entry.title}:
${entry.answer}`).join('\n\n')}

DIRECTORES DE GRUPO 2026:
${groupDirectorContext}

HORARIO DE ATENCIÓN A PADRES DE FAMILIA - AÑO LECTIVO 2026:
${teacherContext}`;
