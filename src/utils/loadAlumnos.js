// src/utils/loadAlumnos.js

const ALUMNOS_JSON_URL = import.meta.env.VITE_ALUMNOS_JSON_URL;

function safeGet(row, key) {
    const value = row?.[key];
    return value === undefined || value === null ? '' : String(value).trim();
}

function getCourseString({ grado, seccion, jornada }) {
    return [grado, seccion, jornada]
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}

async function readRowsFromJsonUrl(url) {
    const res = await fetch(url, {
        method: 'GET',
        cache: 'force-cache',
    });

    if (!res.ok) {
        throw new Error('No se pudo cargar el archivo de alumnos.');
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
        throw new Error('El JSON de alumnos no tiene el formato esperado.');
    }

    return data;
}

function parseAlumnoRow(row) {
    const grado = safeGet(row, 'grado');
    const seccion = safeGet(row, 'seccion');
    const jornada = safeGet(row, 'jornada');

    const nombre1 = safeGet(row, 'nombre1');
    const nombre2 = safeGet(row, 'nombre2');
    const apellido1 = safeGet(row, 'apellido1');
    const apellido2 = safeGet(row, 'apellido2');
    const nombreCompletoExcel = safeGet(row, 'nombre completo');

    const profesor = safeGet(row, 'profesor');
    const codigo = safeGet(row, 'codigo');

    const nombreCompleto =
        [nombre1, nombre2, apellido1, apellido2].filter(Boolean).join(' ').trim() ||
        nombreCompletoExcel;

    const curso = getCourseString({ grado, seccion, jornada });

    if (!nombreCompleto) {
        return null;
    }

    return {
        nombreCompleto,
        curso,
        cursoKey: curso,
        profesor,
        codigo,
        raw: row,
    };
}

export async function loadAlumnos() {
    if (!ALUMNOS_JSON_URL) {
        throw new Error('Falta configurar VITE_ALUMNOS_JSON_URL en el archivo .env');
    }

    const rows = await readRowsFromJsonUrl(ALUMNOS_JSON_URL);

    if (!rows.length) {
        throw new Error('El JSON está vacío o no se pudo leer.');
    }

    return rows.map(parseAlumnoRow).filter(Boolean);
}