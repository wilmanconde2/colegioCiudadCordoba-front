import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const rows = [
  {
    nombre1: ' Ana ',
    nombre2: 'María',
    apellido1: 'Pérez',
    apellido2: null,
    grado: '5',
    seccion: 'A',
    jornada: 'Mañana',
    profesor: 'Docente Prueba',
    codigo: 12345,
  },
  { nombre1: '', nombre2: '', apellido1: '', apellido2: '' },
];

const jsonResponse = (data = rows) => ({
  ok: true,
  json: vi.fn().mockResolvedValue(data),
});

async function importLoader() {
  const module = await import('./loadAlumnos');
  return module.loadAlumnos;
}

describe('loadAlumnos', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('VITE_ALUMNOS_JSON_URL', 'https://example.test/alumnos.json');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('deduplica llamadas concurrentes y reutiliza los alumnos transformados', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse());
    vi.stubGlobal('fetch', fetchMock);
    const loadAlumnos = await importLoader();

    const [firstResult, concurrentResult] = await Promise.all([
      loadAlumnos(),
      loadAlumnos(),
    ]);
    const cachedResult = await loadAlumnos();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(concurrentResult).toBe(firstResult);
    expect(cachedResult).toBe(firstResult);
    expect(firstResult).toEqual([
      expect.objectContaining({
        nombreCompleto: 'Ana María Pérez',
        curso: '5 A Mañana',
        cursoKey: '5 A Mañana',
        profesor: 'Docente Prueba',
        codigo: '12345',
        raw: rows[0],
      }),
    ]);
  });

  it('limpia la cache después de un fallo y permite reintentar', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce(jsonResponse());
    vi.stubGlobal('fetch', fetchMock);
    const loadAlumnos = await importLoader();

    await expect(loadAlumnos()).rejects.toThrow('No se pudo cargar el archivo de alumnos.');
    await expect(loadAlumnos()).resolves.toHaveLength(1);

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
