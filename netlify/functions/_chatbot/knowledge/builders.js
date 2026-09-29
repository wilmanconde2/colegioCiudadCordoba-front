import {
  ACADEMIC_CALENDAR_2026,
  ADMISSIONS_2027,
  ENROLLMENT_2026,
} from '../../../../src/shared/institutional-data.js';
import { COORDINATORS, PSYCHOLOGISTS } from './people.js';

const formatList = (items) => items.map((item) => `- ${item}`).join('\n');

export const buildEnrollmentKnowledge = () => `Costos de matrícula 2026:
- Matrícula ordinaria: ${ENROLLMENT_2026.ordinary} para todos los niveles.
- Matrícula extraordinaria: ${ENROLLMENT_2026.extraordinary} para todos los niveles.
- La matrícula extraordinaria aplica con recargo del 10% a partir del 13 de diciembre de 2025.
- La estampilla Pro-cultura 1,5% y el carné estudiantil están incluidos en el costo de matrícula.`;

export const buildAdmissionsKnowledge = () => `Inscripciones 2027:
- La información ya está disponible en la sección Inscripciones de la página web (${ADMISSIONS_2027.pagePath}).
- Valor de la inscripción: ${ADMISSIONS_2027.enrollmentFee}.
- Documentos publicados:\n${formatList(ADMISSIONS_2027.requirements)}
- Valoración:\n${formatList(ADMISSIONS_2027.assessment)}
- Resultados: ${ADMISSIONS_2027.resultInstructions[0]}`;

export const buildTuitionKnowledge = (scope, feeData) => `Pensión 2026 para ${scope}:
- Día 1 al 4: ${feeData.discount}.
- Día 5 al 8: ${feeData.normal}.
- Desde el día 9: ${feeData.late}.`;

export const buildCalendarKnowledge = () => `${ACADEMIC_CALENDAR_2026.title}:
${formatList(ACADEMIC_CALENDAR_2026.entries)}`;

export const buildCoordinationKnowledge = () => `Coordinación 2026:
${Object.values(COORDINATORS)
    .map(({ area, name, schedules }) => `${name} - ${area}:\n${formatList(schedules)}`)
    .join('\n\n')}`;

export const buildPsychologyKnowledge = () => `Psicología 2026:
${PSYCHOLOGISTS.map(({ name, schedules }) => `${name}:\n${formatList(schedules)}`).join('\n\n')}
WhatsApp psicología: ${PSYCHOLOGISTS[0].whatsapp}.`;
