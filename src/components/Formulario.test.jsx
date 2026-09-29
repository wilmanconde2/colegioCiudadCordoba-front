import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Formulario from './Formulario';
import { loadAlumnos } from '../utils/loadAlumnos';

vi.mock('../utils/loadAlumnos', () => ({
  loadAlumnos: vi.fn(),
}));

const alumnos = [
  { nombreCompleto: 'Ana María Pérez', curso: '5 A Mañana', codigo: '12345' },
  { nombreCompleto: 'Carlos Ruiz', curso: '', codigo: '' },
];

describe('Formulario', () => {
  beforeEach(() => {
    loadAlumnos.mockResolvedValue(alumnos);
  });

  it('muestra la búsqueda y la acción para limpiar inicialmente', () => {
    render(<Formulario />);

    expect(screen.getByRole('combobox', { name: /buscar estudiante/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeTruthy();
  });

  it('carga al enfocar, muestra progreso y filtra alumnos por nombre', async () => {
    let resolveLoad;
    loadAlumnos.mockReturnValue(new Promise((resolve) => { resolveLoad = resolve; }));
    const user = userEvent.setup();
    render(<Formulario />);

    const input = screen.getByRole('combobox', { name: /buscar estudiante/i });
    fireEvent.focus(input);

    expect(loadAlumnos).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/cargando alumnos/i)).toBeTruthy();

    resolveLoad(alumnos);
    await user.type(input, 'ana maria');

    const listbox = await screen.findByRole('listbox');
    expect(within(listbox).getByRole('option', { name: /ana maría pérez.*5 a mañana/i })).toBeTruthy();
    expect(within(listbox).queryByText('Carlos Ruiz')).toBeNull();
  });

  it('muestra el error de carga y permite reintentar al enfocar de nuevo', async () => {
    loadAlumnos
      .mockRejectedValueOnce(new Error('No se pudo cargar el archivo de alumnos.'))
      .mockResolvedValueOnce(alumnos);
    render(<Formulario />);

    const input = screen.getByRole('combobox', { name: /buscar estudiante/i });
    fireEvent.focus(input);
    expect(await screen.findByText(/no se pudo cargar el archivo de alumnos/i)).toBeTruthy();

    fireEvent.blur(input);
    fireEvent.focus(input);
    await waitFor(() => expect(loadAlumnos).toHaveBeenCalledTimes(2));
  });

  it('selecciona un estudiante, muestra sus datos y permite limpiar', async () => {
    const user = userEvent.setup();
    render(<Formulario />);

    const input = screen.getByRole('combobox', { name: /buscar estudiante/i });
    await user.click(input);
    await user.type(input, 'Pérez');
    await user.click(await screen.findByRole('option', { name: /ana maría pérez.*5 a mañana/i }));

    const result = screen.getByRole('heading', { name: /resultado/i }).parentElement;
    expect(within(result).getByText(/ana maría pérez/i)).toBeTruthy();
    expect(within(result).getByText(/5 a mañana/i)).toBeTruthy();
    expect(within(result).getByText('12345')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /limpiar/i }));
    expect(input.value).toBe('');
    expect(screen.queryByRole('heading', { name: /resultado/i })).toBeNull();
  });

  it('acepta mensualidad sin mostrar el mensaje temporal de morosidad', () => {
    render(<Formulario typeSearch='mensualidad' />);

    expect(screen.getByText(/consulta de mensualidad/i)).toBeTruthy();
    expect(screen.queryByText(/información pendiente por configurar/i)).toBeNull();
    expect(screen.queryByText(/meses pendientes de pago/i)).toBeNull();
  });

  it('copia el código seleccionado mediante el portapapeles', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    render(<Formulario />);

    const input = screen.getByRole('combobox', { name: /buscar estudiante/i });
    await user.click(input);
    await user.type(input, 'Ana');
    await user.click(await screen.findByRole('option', { name: /ana maría pérez.*5 a mañana/i }));
    await user.click(screen.getByRole('button', { name: /copiar código/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('12345'));
  });

  it('expone el combobox y navega el listbox con teclado', async () => {
    const user = userEvent.setup();
    render(<Formulario />);

    const input = screen.getByRole('combobox', { name: /buscar estudiante/i });
    expect(input.getAttribute('aria-expanded')).toBe('false');

    await user.click(input);
    await user.type(input, 'a');

    const listbox = await screen.findByRole('listbox', { name: /estudiantes encontrados/i });
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(input.getAttribute('aria-controls')).toBe(listbox.id);

    await user.keyboard('{ArrowDown}');
    const activeOption = within(listbox).getByRole('option', { selected: true });
    expect(input.getAttribute('aria-activedescendant')).toBe(activeOption.id);

    await user.keyboard('{ArrowDown}{ArrowUp}{Enter}');
    expect(input.value).toBe('Ana María Pérez');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('cierra el listbox con Escape sin borrar la búsqueda', async () => {
    const user = userEvent.setup();
    render(<Formulario />);

    const input = screen.getByRole('combobox', { name: /buscar estudiante/i });
    await user.click(input);
    await user.type(input, 'Ana');
    await screen.findByRole('listbox');

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).toBeNull();
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(input.value).toBe('Ana');
  });
});
