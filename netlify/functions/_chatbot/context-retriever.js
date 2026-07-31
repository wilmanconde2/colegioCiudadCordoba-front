import {
  COORDINATORS,
  GROUP_DIRECTORS,
  KNOWLEDGE_ENTRIES,
  PSYCHOLOGISTS,
  TEACHERS,
} from './colegio-knowledge.js';

const DEFAULT_MAX_CONTEXT_CHARS = 6500;
const DEFAULT_MAX_ENTRIES = 3;

const normalize = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value = '') =>
  normalize(value)
    .split(' ')
    .filter((token) => token.length > 2);

const unique = (items) => [...new Set(items.filter(Boolean))];

const getSearchText = (message, history = []) => {
  const recentHistory = Array.isArray(history)
    ? history
        .slice(-4)
        .map((item) => item?.text || '')
        .filter(Boolean)
        .join(' ')
    : '';

  return `${message || ''} ${recentHistory}`.trim();
};

const phraseScore = (haystack, phrase, weight = 1) => {
  const cleanPhrase = normalize(phrase);
  if (!cleanPhrase) return 0;
  const cleanHaystack = ` ${normalize(haystack)} `;
  if (cleanHaystack.includes(` ${cleanPhrase} `)) return cleanPhrase.length * weight;

  const phraseTokens = tokenize(cleanPhrase);
  if (!phraseTokens.length) return 0;
  const haystackTokens = new Set(tokenize(cleanHaystack));
  const matched = phraseTokens.filter((token) => haystackTokens.has(token)).length;
  return matched === phraseTokens.length ? matched * 4 * weight : 0;
};

const SEMANTIC_INTENTS = [
  {
    id: 'value-proposition',
    patterns: [
      /\bpor que\b.*\b(colegio|institucion)\b/,
      /\b(considerar|elegir|escoger|recomendar)\b.*\b(colegio|institucion)\b/,
      /\b(fortalezas?|ventajas?|beneficios?|diferenciales?)\b/,
      /\b(formacion|propuesta)\b.*\b(integral|academica|educativa)\b/,
      /\bpadre\b.*\b(matricular|colegio|hijo)\b/,
      /\bfamilia\b.*\b(matricular|colegio|hijo)\b/,
    ],
    preferredEntryIds: ['servicios-institucionales', 'mision', 'modalidades', 'vision'],
    expansionTerms: [
      'servicios del colegio',
      'propuesta educativa',
      'formacion integral',
      'modalidades',
      'sena',
      'robotica',
      'tecnologia',
      'valores',
      'deporte',
      'cultura',
    ],
  },
  {
    id: 'academic-strengths',
    patterns: [
      /\bfortalezas?\b.*\b(academicas?|formativas?|educativas?)\b/,
      /\b(compara|comparar)\b.*\b(academica|formativa|modalidad|formacion)\b/,
    ],
    preferredEntryIds: ['servicios-institucionales', 'modalidades', 'mision', 'vision'],
    expansionTerms: ['formacion academica', 'media tecnica', 'sena', 'robotica', 'tecnologia', 'valores'],
  },
];

const detectSemanticIntents = (searchText) => {
  const cleanSearch = normalize(searchText);
  return SEMANTIC_INTENTS.filter((intent) =>
    intent.patterns.some((pattern) => pattern.test(cleanSearch))
  );
};

const expandSearchText = (searchText, intents) => {
  const expansionTerms = unique(intents.flatMap((intent) => intent.expansionTerms || []));
  return expansionTerms.length ? `${searchText} ${expansionTerms.join(' ')}` : searchText;
};

const getIntentBoost = (entry, intents) => {
  let boost = 0;
  for (const intent of intents) {
    const index = (intent.preferredEntryIds || []).indexOf(entry.id);
    if (index >= 0) boost += Math.max(140, 260 - index * 35);
  }
  return boost;
};

const scoreKnowledgeEntry = (entry, searchText, intents = []) => {
  const titleScore = phraseScore(searchText, entry.title, 3);
  const keywordScore = entry.keywords.reduce(
    (total, keyword) => total + phraseScore(searchText, keyword, 4),
    0
  );

  const searchTokens = new Set(tokenize(searchText));
  const answerTokens = unique(tokenize(`${entry.title} ${entry.answer}`));
  const overlapCount = answerTokens.reduce(
    (total, token) => total + (searchTokens.has(token) ? 1 : 0),
    0
  );
  const overlapScore = overlapCount >= 2 ? overlapCount : 0;

  return titleScore + keywordScore + overlapScore + getIntentBoost(entry, intents);
};

const personMatches = (person, searchText) => {
  const personName = normalize(person.name);
  const cleanSearch = normalize(searchText);
  if (personName && cleanSearch.includes(personName)) return true;

  const nameTokens = tokenize(person.name);
  const searchTokens = new Set(tokenize(searchText));
  return nameTokens.length > 0 && nameTokens.every((token) => searchTokens.has(token));
};

const teacherScore = (teacher, searchText) => {
  let score = personMatches(teacher, searchText) ? 1000 : 0;
  for (const course of teacher.courses || []) score += phraseScore(searchText, course, 6);
  for (const subject of teacher.subjects || []) score += phraseScore(searchText, subject, 6);
  return score;
};

const formatTeacher = (teacher) => {
  const lines = [`Docente: ${teacher.name}.`];
  if (teacher.courses?.length) lines.push(`Cursos: ${teacher.courses.join(', ')}.`);
  if (teacher.subjects?.length) lines.push(`Asignaturas: ${teacher.subjects.join(', ')}.`);
  if (teacher.schedules?.length) lines.push(`Horario de atención: ${teacher.schedules.join('; ')}.`);
  return lines.join(' ');
};

const formatCoordinator = (coordinator) =>
  `Coordinación: ${coordinator.name} - ${coordinator.area}. Horario: ${coordinator.schedules.join('; ')}.`;

const formatPsychologist = (psychologist) =>
  `Psicología: ${psychologist.name}. Horario: ${psychologist.schedules.join('; ')}. WhatsApp: ${psychologist.whatsapp}.`;

const getEntitySnippets = (searchText) => {
  const snippets = [];

  for (const coordinator of Object.values(COORDINATORS)) {
    const areaMatch = phraseScore(searchText, coordinator.area, 5) > 0;
    if (personMatches(coordinator, searchText) || areaMatch) snippets.push(formatCoordinator(coordinator));
  }

  for (const psychologist of PSYCHOLOGISTS) {
    const psychologyIntent = /\bpsicolog(?:ia|a|o)\b/i.test(normalize(searchText));
    if (personMatches(psychologist, searchText) || psychologyIntent) {
      snippets.push(formatPsychologist(psychologist));
    }
  }

  const teacherMatches = TEACHERS.map((teacher) => ({ teacher, score: teacherScore(teacher, searchText) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  for (const { teacher } of teacherMatches) snippets.push(formatTeacher(teacher));

  const directorMatches = GROUP_DIRECTORS.filter((director) => {
    const courseScore = phraseScore(searchText, director.course, 6);
    const teacher = TEACHERS.find(
      (item) => normalize(item.name) === normalize(director.teacher)
    );
    return courseScore > 0 || (teacher && personMatches(teacher, searchText));
  }).slice(0, 3);

  for (const director of directorMatches) {
    snippets.push(`Director(a) de grupo: ${director.course} - ${director.teacher}.`);
  }

  return unique(snippets);
};

const fitWithinLimit = (sections, maxChars) => {
  const selected = [];
  let used = 0;

  for (const section of sections) {
    const clean = section.trim();
    if (!clean) continue;
    const additional = clean.length + (selected.length ? 2 : 0);
    if (used + additional > maxChars) continue;
    selected.push(clean);
    used += additional;
  }

  return selected.join('\n\n');
};

export const retrieveRelevantContext = (
  message,
  history = [],
  { maxChars = DEFAULT_MAX_CONTEXT_CHARS, maxEntries = DEFAULT_MAX_ENTRIES } = {}
) => {
  const baseSearchText = getSearchText(message, history);
  const intents = detectSemanticIntents(baseSearchText);
  const searchText = expandSearchText(baseSearchText, intents);

  const entries = KNOWLEDGE_ENTRIES.map((entry) => ({
    entry,
    score: scoreKnowledgeEntry(entry, searchText, intents),
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxEntries)
    .map(({ entry }) => `${entry.title}:\n${entry.answer}`);

  const entitySnippets = getEntitySnippets(baseSearchText);
  const sections = [...entries, ...entitySnippets];

  return fitWithinLimit(sections, maxChars);
};

export const CONTEXT_LIMITS = {
  maxChars: DEFAULT_MAX_CONTEXT_CHARS,
  maxEntries: DEFAULT_MAX_ENTRIES,
};
