const ADMITIDOS_JSON_URL = '/data/admitidos.json';
const ALLOWED_KEYS = ['nombreCompleto', 'grado', 'observacion'];
let admitidosPromise;

function cleanText(value) {
  if (value === undefined || value === null) return '';
  return String(value).replace(/\s+/g, ' ').trim();
}

function parseAdmitido(row) {
  if (!row || typeof row !== 'object' || Array.isArray(row)) return null;
  if (Object.keys(row).some((key) => !ALLOWED_KEYS.includes(key))) return null;

  const nombreCompleto = cleanText(row.nombreCompleto);
  const grado = cleanText(row.grado);
  const observacion = cleanText(row.observacion);

  if (!nombreCompleto || !grado) return null;

  return { nombreCompleto, grado, observacion };
}

async function readAdmitidos() {
  const response = await fetch(ADMITIDOS_JSON_URL, {
    method: 'GET',
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error('No se pudo cargar el listado de admitidos.');
  }

  const data = await response.json();
  if (!Array.isArray(data) || !data.length) {
    throw new Error('El listado de admitidos no tiene el formato esperado.');
  }

  const admitidos = data.map(parseAdmitido);
  if (admitidos.some((row) => row === null)) {
    throw new Error('El listado de admitidos contiene registros inválidos.');
  }

  return admitidos;
}

export function loadAdmitidos() {
  if (!admitidosPromise) {
    admitidosPromise = readAdmitidos().catch((error) => {
      admitidosPromise = undefined;
      throw error;
    });
  }

  return admitidosPromise;
}
