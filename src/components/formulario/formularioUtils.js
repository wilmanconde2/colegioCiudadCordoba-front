export const FORM_CONFIG = {
  codigo: {
    legend: 'Solicitud Código Estudiantil',
    label: 'Buscar estudiante:',
    placeholder: 'Ej: Thiago Conde',
    resultTitle: 'Código del Estudiante:',
    copyMessage: 'Código copiado al portapapeles',
    missingMessage: 'No se encontró el código en el JSON para este estudiante.',
  },
  mensualidad: {
    legend: 'Consulta de Mensualidad',
    label: 'Buscar estudiante:',
    placeholder: 'Ej: Thiago Conde',
    resultTitle: 'Código del Estudiante:',
    copyMessage: 'Código copiado al portapapeles',
    missingMessage: 'No se encontró el código en el JSON para este estudiante.',
  },
};

export function normalizeText(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function filterAlumnos(alumnos, query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];
  return alumnos
    .filter((alumno) => normalizeText(alumno.nombreCompleto).includes(normalizedQuery))
    .slice(0, 10);
}
