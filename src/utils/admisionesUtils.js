export const MIN_ADMISSIONS_QUERY_LENGTH = 3;

export function normalizeAdmissionsText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function filterAdmitidos(admitidos, query) {
  const normalizedQuery = normalizeAdmissionsText(query);
  const queryCharacterCount = normalizedQuery.replace(/\s/g, '').length;
  if (queryCharacterCount < MIN_ADMISSIONS_QUERY_LENGTH) return [];

  const queryTerms = [...new Set(normalizedQuery.split(' '))];

  return admitidos.filter((admitido) => {
    const nameTerms = normalizeAdmissionsText(admitido.nombreCompleto).split(' ');
    return queryTerms.every((queryTerm) =>
      nameTerms.some((nameTerm) => nameTerm.includes(queryTerm)),
    );
  });
}
