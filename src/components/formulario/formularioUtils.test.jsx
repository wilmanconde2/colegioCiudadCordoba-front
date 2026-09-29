import { describe, expect, it } from 'vitest';
import { filterAlumnos, normalizeText } from './formularioUtils';

const alumnos = Array.from({ length: 12 }, (_, index) => ({
  nombreCompleto: index === 0 ? 'Ana María Pérez' : `Ana Estudiante ${index}`,
}));

describe('formularioUtils', () => {
  it('normaliza espacios, mayúsculas y tildes', () => {
    expect(normalizeText('  ÁNA María  ')).toBe('ana maria');
  });

  it('filtra por nombre normalizado y conserva el límite actual de diez resultados', () => {
    expect(filterAlumnos(alumnos, 'ana')).toHaveLength(10);
    expect(filterAlumnos(alumnos, 'maria')).toEqual([alumnos[0]]);
    expect(filterAlumnos(alumnos, '   ')).toEqual([]);
  });
});
