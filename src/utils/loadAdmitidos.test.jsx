import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const validRows = [
  {
    nombreCompleto: 'Estudiante Sintético Prueba',
    grado: '6',
    observacion: 'Admitido para el año lectivo.',
  },
];

const response = (data = validRows, ok = true) => ({
  ok,
  json: vi.fn().mockResolvedValue(data),
});

async function importLoader() {
  return (await import('./loadAdmitidos')).loadAdmitidos;
}

describe('loadAdmitidos', () => {
  beforeEach(() => vi.resetModules());
  afterEach(() => vi.unstubAllGlobals());

  it('deduplica cargas concurrentes y conserva solo el contrato público', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response());
    vi.stubGlobal('fetch', fetchMock);
    const loadAdmitidos = await importLoader();

    const [first, concurrent] = await Promise.all([loadAdmitidos(), loadAdmitidos()]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/data/admitidos.json', {
      method: 'GET',
      cache: 'force-cache',
    });
    expect(concurrent).toBe(first);
    expect(first).toEqual(validRows);
  });

  it('limpia la caché después de un error HTTP y permite reintentar', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(response([], false))
      .mockResolvedValueOnce(response());
    vi.stubGlobal('fetch', fetchMock);
    const loadAdmitidos = await importLoader();

    await expect(loadAdmitidos()).rejects.toThrow('No se pudo cargar');
    await expect(loadAdmitidos()).resolves.toEqual(validRows);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('rechaza estructuras y campos no autorizados', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response([
      { ...validRows[0], documento: 'no permitido' },
    ])));
    const loadAdmitidos = await importLoader();

    await expect(loadAdmitidos()).rejects.toThrow('registros inválidos');
  });
});
