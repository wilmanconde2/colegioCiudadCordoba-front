const freezeItems = (items) => Object.freeze(items.map((item) => Object.freeze(item)));

export const ADMISSIONS_2027 = Object.freeze({
  year: 2027,
  isPublished: true,
  pagePath: '/inscripciones',
  enrollmentFee: '$20.000',
  requirements: Object.freeze([
    'Registro civil legible y en buen estado.',
    'Fotocopia de la tarjeta de identidad a partir de los 7 años, ampliada al 150%.',
    'Constancia de estudio indicando nivel académico y convivencia.',
    'Boletín de calificaciones del período actual.',
    'Paz y salvo del colegio de procedencia a la fecha.',
    'Una fotografía tamaño 3 x 4 reciente.',
    'Certificados de grados anteriores.',
  ]),
  assessment: Object.freeze(['Cita con Psicología.', 'Examen de admisión.']),
  resultInstructions: Object.freeze(['Revisar la lista de admitidos en la página web.']),
  documentClaimInstructions: Object.freeze([
    'Según las fechas asignadas en Admisiones y publicadas en la web.',
  ]),
  conditions: Object.freeze([
    'El colegio se reserva el derecho de admisión.',
    'Los cupos para estudiantes nuevos son asignados inicialmente en la jornada de la tarde.',
    'Si se requiere jornada de la mañana, se debe solicitar por escrito a Coordinación el día de la matrícula oficial del año lectivo 2027.',
    'El cambio depende de disponibilidad.',
    'No se reintegra dinero por ningún concepto.',
  ]),
});

export const ADMISSION_STEPS_2027 = freezeItems([
  { titulo: 'Valor de la inscripción', contenido: Object.freeze([ADMISSIONS_2027.enrollmentFee]) },
  { titulo: 'Entrega de documentos', contenido: ADMISSIONS_2027.requirements },
  { titulo: 'Valoración', contenido: ADMISSIONS_2027.assessment },
  { titulo: 'Resultados', contenido: ADMISSIONS_2027.resultInstructions },
  { titulo: 'Reclamación de documentos', contenido: ADMISSIONS_2027.documentClaimInstructions },
]);

export const ENROLLMENT_2026 = Object.freeze({
  ordinary: '$387.000',
  extraordinary: '$424.340',
});

const tuitionGroup = (discount, normal, late) => Object.freeze({ discount, normal, late });

const PRE_PRIMARY_AND_PRIMARY_TUITION = tuitionGroup('$258.000', '$260.000', '$265.200');
const SIXTH_GRADE_TUITION = tuitionGroup('$263.000', '$265.000', '$270.300');
const SECONDARY_TUITION = tuitionGroup('$283.000', '$285.000', '$290.700');

const fee = (label, values) => Object.freeze({ label, ...values });

export const TUITION_FEES_2026 = Object.freeze({
  jardin: fee('Jardín', PRE_PRIMARY_AND_PRIMARY_TUITION),
  transicion: fee('Transición', PRE_PRIMARY_AND_PRIMARY_TUITION),
  primero: fee('grado 1°', PRE_PRIMARY_AND_PRIMARY_TUITION),
  segundo: fee('grado 2°', PRE_PRIMARY_AND_PRIMARY_TUITION),
  tercero: fee('grado 3°', PRE_PRIMARY_AND_PRIMARY_TUITION),
  cuarto: fee('grado 4°', PRE_PRIMARY_AND_PRIMARY_TUITION),
  quinto: fee('grado 5°', PRE_PRIMARY_AND_PRIMARY_TUITION),
  sexto: fee('grado 6°', SIXTH_GRADE_TUITION),
  septimo: fee('grado 7°', SECONDARY_TUITION),
  octavo: fee('grado 8°', SECONDARY_TUITION),
  noveno: fee('grado 9°', SECONDARY_TUITION),
  decimo: fee('grado 10°', SECONDARY_TUITION),
  once: fee('grado 11°', SECONDARY_TUITION),
});

export const COSTS_2026 = freezeItems([
  {
    nivel: 'Jardín a 5.º',
    matricula: ENROLLMENT_2026.ordinary,
    pension: TUITION_FEES_2026.jardin.normal,
  },
  {
    nivel: '6.º',
    matricula: ENROLLMENT_2026.ordinary,
    pension: TUITION_FEES_2026.sexto.normal,
  },
  {
    nivel: '7.º a 11.º',
    matricula: ENROLLMENT_2026.ordinary,
    pension: TUITION_FEES_2026.septimo.normal,
  },
]);

export const ACADEMIC_CALENDAR_2026 = Object.freeze({
  year: 2026,
  title: 'Cronograma 2026',
  entries: Object.freeze([
    'Planeación: del 21 al 30 de enero.',
    'Inicio de clases: lunes 2 de febrero.',
    'Primer periodo: del 26 de enero al 17 de abril.',
    'Segundo periodo: del 20 de abril al 11 de junio.',
    'Tercer periodo: del 14 de julio al 18 de septiembre.',
    'Cuarto periodo: del 21 de septiembre al 30 de noviembre.',
    'Semana Santa: del 30 de marzo al 3 de abril.',
    'Vacaciones estudiantes: del 19 de junio al 13 de julio.',
    'Semana cultural y deportiva: del 30 de septiembre al 2 de octubre.',
    'Semana de receso institucional: del 5 al 9 de octubre.',
    'Día científico: viernes 25 de septiembre.',
    'Día de la familia: sábado 7 de noviembre.',
    'Expo Cocicor comercial e industrial: jueves 15 de octubre.',
    'Grados grado 11: sábado 13 de diciembre.',
    'Graduación Transición y Quinto: miércoles 2 de diciembre, 4:00 p.m. y 6:00 p.m.',
    'Matrícula privado: 10 de diciembre.',
    'Matrícula privado BTO: 11 de diciembre.',
    'Matrícula cobertura: 9 de diciembre.',
  ]),
});
