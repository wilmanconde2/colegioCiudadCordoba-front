import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Admisiones from './Admisiones';
import { loadAdmitidos } from '../utils/loadAdmitidos';

vi.mock('../hooks/useTitulo', () => ({ default: vi.fn() }));
vi.mock('../utils/loadAdmitidos', () => ({ loadAdmitidos: vi.fn() }));

const records = [
  {
    nombreCompleto: 'Ana María Pérez López',
    grado: '6',
    observacion: 'Admitida para el año lectivo.',
  },
  {
    nombreCompleto: 'Ana Sofía Pérez Ruiz',
    grado: '7',
    observacion: '',
  },
];

describe('Admisiones', () => {
  beforeEach(() => loadAdmitidos.mockResolvedValue(records));

  it('no muestra ni carga el listado antes de una consulta válida', async () => {
    const user = userEvent.setup();
    render(<Admisiones />);

    expect(screen.queryByRole('listbox')).toBeNull();
    await user.type(screen.getByRole('combobox', { name: /buscar estudiante/i }), 'an');
    expect(loadAdmitidos).not.toHaveBeenCalled();
    expect(screen.queryByRole('option')).toBeNull();
  });

  it('muestra el estado de carga mientras se obtiene el listado', async () => {
    const user = userEvent.setup();
    let resolveLoad;
    loadAdmitidos.mockReturnValueOnce(new Promise((resolve) => {
      resolveLoad = resolve;
    }));
    render(<Admisiones />);

    await user.type(screen.getByRole('combobox', { name: /buscar estudiante/i }), 'ana');
    expect(screen.getByText(/cargando listado de admitidos/i)).toBeTruthy();

    resolveLoad(records);
    expect(await screen.findAllByRole('option')).toHaveLength(2);
  });

  it('muestra coincidencias múltiples y permite seleccionar con teclado', async () => {
    const user = userEvent.setup();
    render(<Admisiones />);
    const search = screen.getByRole('combobox', { name: /buscar estudiante/i });

    await user.type(search, 'péR   ana');
    expect(await screen.findAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('2 coincidencias encontradas.')).toBeTruthy();

    await user.keyboard('{ArrowDown}{Enter}');
    expect(screen.getByRole('heading', { name: /resultado de la consulta/i })).toBeTruthy();
    expect(screen.getByText('Ana María Pérez López')).toBeTruthy();
    expect(screen.getByText('Admitida para el año lectivo.')).toBeTruthy();
  });

  it('permite limpiar y presenta el fallback para una observación vacía', async () => {
    const user = userEvent.setup();
    render(<Admisiones />);
    const search = screen.getByRole('combobox', { name: /buscar estudiante/i });

    await user.type(search, 'sofia ruiz');
    await user.click(await screen.findByRole('option', { name: /ana sofía pérez ruiz.*grado 7/i }));
    expect(screen.getByText('Sin observación registrada.')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /limpiar búsqueda/i }));
    expect(search.value).toBe('');
    expect(screen.queryByRole('heading', { name: /resultado de la consulta/i })).toBeNull();
  });

  it('informa cuando no hay coincidencias', async () => {
    const user = userEvent.setup();
    render(<Admisiones />);

    await user.type(screen.getByRole('combobox', { name: /buscar estudiante/i }), 'nombre inexistente');

    expect(await screen.findByText(/no se encontraron coincidencias/i)).toBeTruthy();
  });

  it('maneja errores de carga sin exponer detalles técnicos', async () => {
    const user = userEvent.setup();
    loadAdmitidos.mockRejectedValueOnce(new Error('detalle interno'));
    render(<Admisiones />);

    await user.type(screen.getByRole('combobox', { name: /buscar estudiante/i }), 'ana');

    await waitFor(() => {
      expect(screen.getByText(/no fue posible consultar el listado/i)).toBeTruthy();
    });
    expect(screen.queryByText(/detalle interno/i)).toBeNull();
  });
});
