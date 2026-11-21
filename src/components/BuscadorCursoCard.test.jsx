import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import BuscadorCursoCard from './BuscadorCursoCard';
import { loadAlumnos } from '../utils/loadAlumnos';

vi.mock('../utils/loadAlumnos', () => ({ loadAlumnos: vi.fn() }));

it('finds an accented name and opens the selected course resources', async () => {
  loadAlumnos.mockResolvedValue([{ nombreCompleto: 'Álex Prueba', curso: '6-1', cursoKey: '6-1' }]);
  const user = userEvent.setup();
  render(<BuscadorCursoCard />);
  await user.type(screen.getByRole('textbox'), 'alex');
  await user.click(await screen.findByRole('button', { name: /Álex Prueba/ }));
  await user.click(screen.getByRole('button', { name: /información del curso/i }));
  expect(screen.getByRole('dialog', { name: /Álex Prueba/i })).toBeTruthy();
});
