import {
  ADMISSIONS_2027,
  ADMISSION_STEPS_2027,
  COSTS_2026 as SHARED_COSTS_2026,
} from '../shared/institutional-data.js';

export const JORNADAS = [
  {
    nivel: 'Jardín y Transición',
    horarios: ['Jornada mañana: 7:20 a. m. – 11:45 a. m.', 'Jornada tarde: 1:20 p. m. – 5:45 p. m.'],
  },
  {
    nivel: 'Primaria',
    horarios: ['Jornada mañana: 6:50 a. m. – 12:15 p. m.', 'Jornada tarde: 12:45 p. m. – 6:10 p. m.'],
  },
  {
    nivel: 'Bachillerato',
    horarios: ['Jornada mañana: 6:20 a. m. – 12:30 p. m.', 'Jornada tarde: 12:45 p. m. – 6:45 p. m.'],
  },
];

export const ENFASIS_BACHILLERATO = [
  'Robótica',
  'Contabilidad y Desarrollo Empresarial',
  'Emprendimiento',
  'Programación',
  'Artes Plásticas',
  'Dibujo Técnico (6.º a 8.º)',
  'Dibujo Arquitectónico (9.º a 11.º)',
];

export const SERVICIOS = [
  { titulo: 'Ayudas audiovisuales', texto: 'Aulas de clase equipadas con televisión, sonido y conexión a Internet.' },
  { titulo: 'Clases de deportes', texto: 'Espacios para práctica deportiva en el Polideportivo 3A-3B de Ciudad Córdoba, mediante convenio institucional.' },
  { titulo: 'Departamento de Psicología', texto: 'Contamos con 2 psicólogas que brindan acompañamiento mediante escuela de padres, convivencias y conferencias.' },
  { titulo: 'Laboratorio de Química y Física', texto: 'Espacio para prácticas y proyectos de Ciencias Naturales.' },
  { titulo: 'Salas audiovisuales', texto: 'Espacios tecnológicos diseñados para enriquecer el aprendizaje mediante recursos audiovisuales, actividades interactivas y laboratorios de inglés.' },
];

export const PASOS_INSCRIPCION = ADMISSION_STEPS_2027;
export const CONDICIONES = ADMISSIONS_2027.conditions;
export const COSTOS_2026 = SHARED_COSTS_2026;
