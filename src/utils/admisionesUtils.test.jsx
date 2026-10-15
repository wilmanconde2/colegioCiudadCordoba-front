import { describe, expect, it } from 'vitest';
import {
  filterAdmitidos,
  MIN_ADMISSIONS_QUERY_LENGTH,
  normalizeAdmissionsText,
} from './admisionesUtils';

const admitidos = [
  { nombreCompleto: 'Ana María Pérez López' },
  { nombreCompleto: 'Carlos Andrés Gómez Ruiz' },
];

describe('admisionesUtils', () => {
  it('normaliza mayúsculas, tildes y espacios repetidos', () => {
    expect(normalizeAdmissionsText('  ÁNA   MARÍA  ')).toBe('ana maria');
  });

  it('exige tres caracteres normalizados antes de mostrar resultados', () => {
    expect(MIN_ADMISSIONS_QUERY_LENGTH).toBe(3);
    expect(filterAdmitidos(admitidos, 'an')).toEqual([]);
    expect(filterAdmitidos(admitidos, 'a b')).toEqual([]);
    expect(filterAdmitidos(admitidos, '   ')).toEqual([]);
  });

  it('encuentra coincidencias parciales en cualquier orden', () => {
    expect(filterAdmitidos(admitidos, 'péR   ana')).toEqual([admitidos[0]]);
    expect(filterAdmitidos(admitidos, 'ruiz car')).toEqual([admitidos[1]]);
  });

  it('requiere que todos los términos coincidan con el nombre', () => {
    expect(filterAdmitidos(admitidos, 'ana gomez')).toEqual([]);
  });
});
