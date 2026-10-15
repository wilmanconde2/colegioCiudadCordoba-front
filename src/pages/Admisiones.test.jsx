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

const overflowRecords = Array.from({ length: 7 }, (_, index) => ({
  nombreCompleto: `Ana Estudiante Sintético ${index + 1}`,
  grado: String(index + 1),
  observacion: 'Observación sintética.',
}));

const CONTACT_NOTE_TEXT =
  'NOTA: Si tienen dudas, por favor contáctense con Secretaría. Pueden llamar a las siguientes líneas: Celular: 3104280125 (no WhatsApp) Fijo: 6023731398 Fijo: 6023450411';

describe('Admisiones', () => {
  beforeEach(() => loadAdmitidos.mockResolvedValue(records));

  it('no muestra ni carga el listado antes de una consulta válida', async () => {
    const user = userEvent.setup();
    render(<Admisiones />);

    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.queryByText('NOTA:')).toBeNull();
    await user.type(screen.getByRole('combobox', { name: /buscar estudiante/i }), 'an');
    expect(loadAdmitidos).not.toHaveBeenCalled();
    expect(screen.queryByRole('option')).toBeNull();
  });

  it('muestra el estado de carga mientras se obtiene el listado', async () => {
    const user = userEvent.setup();
    let resolveLoad;
    loadAdmitidos.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveLoad = resolve;
      }),
    );
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
    const observation = screen.getByText('Admitida para el año lectivo.');
    const contactNote = screen.getByText('NOTA:').closest('.admisionesResult__contactNote');

    expect(observation.closest('dl').nextElementSibling).toBe(contactNote);
    const contactLines = [
      contactNote.querySelector('p').textContent,
      ...Array.from(contactNote.querySelectorAll('li'), (item) => item.textContent),
    ];
    expect(contactLines.join(' ').replace(/\s+/g, ' ').trim()).toBe(CONTACT_NOTE_TEXT);
    expect(contactNote.querySelectorAll('li')).toHaveLength(3);
    expect(contactNote.querySelectorAll('a')).toHaveLength(0);
  });

  it('mantiene visible la opción activa durante la navegación por teclado', async () => {
    const user = userEvent.setup();
    loadAdmitidos.mockResolvedValueOnce(overflowRecords);
    render(<Admisiones />);
    const search = screen.getByRole('combobox', { name: /buscar estudiante/i });

    await user.type(search, 'ana');
    const options = await screen.findAllByRole('option');
    const scrollMocks = options.map((option) => {
      const scrollIntoView = vi.fn();
      Object.defineProperty(option, 'scrollIntoView', {
        configurable: true,
        value: scrollIntoView,
      });
      return scrollIntoView;
    });

    expect(options).toHaveLength(7);
    await user.keyboard('{ArrowDown}'.repeat(7));

    expect(document.activeElement).toBe(search);
    expect(search.getAttribute('aria-expanded')).toBe('true');
    expect(search.getAttribute('aria-activedescendant')).toBe(options[6].id);
    expect(options[6].getAttribute('aria-selected')).toBe('true');
    expect(scrollMocks[6]).toHaveBeenLastCalledWith({
      block: 'nearest',
      inline: 'nearest',
    });

    await user.keyboard('{ArrowUp}');

    expect(document.activeElement).toBe(search);
    expect(search.getAttribute('aria-activedescendant')).toBe(options[5].id);
    expect(options[5].getAttribute('aria-selected')).toBe('true');
    expect(scrollMocks[5]).toHaveBeenLastCalledWith({
      block: 'nearest',
      inline: 'nearest',
    });

    await user.keyboard('{Enter}');

    expect(search.value).toBe(overflowRecords[5].nombreCompleto);
    expect(document.activeElement).toBe(search);
    expect(search.getAttribute('aria-expanded')).toBe('false');
    expect(search.hasAttribute('aria-activedescendant')).toBe(false);
  });

  it('permite limpiar y presenta el fallback para una observación vacía', async () => {
    const user = userEvent.setup();
    render(<Admisiones />);
    const search = screen.getByRole('combobox', { name: /buscar estudiante/i });

    await user.type(search, 'sofia ruiz');
    await user.click(await screen.findByRole('option', { name: /ana sofía pérez ruiz.*grado 7/i }));
    const fallbackObservation = screen.getByText('Sin observación registrada.');
    const contactNote = screen.getByText('NOTA:').closest('.admisionesResult__contactNote');

    expect(fallbackObservation.closest('dl').nextElementSibling).toBe(contactNote);
    const contactLines = [
      contactNote.querySelector('p').textContent,
      ...Array.from(contactNote.querySelectorAll('li'), (item) => item.textContent),
    ];
    expect(contactLines.join(' ').replace(/\s+/g, ' ').trim()).toBe(CONTACT_NOTE_TEXT);
    expect(contactNote.querySelectorAll('li')).toHaveLength(3);
    expect(contactNote.querySelectorAll('a')).toHaveLength(0);

    await user.click(screen.getByRole('button', { name: /limpiar búsqueda/i }));
    expect(search.value).toBe('');
    expect(screen.queryByRole('heading', { name: /resultado de la consulta/i })).toBeNull();
    expect(screen.queryByText('NOTA:')).toBeNull();
  });

  it('informa cuando no hay coincidencias', async () => {
    const user = userEvent.setup();
    render(<Admisiones />);

    await user.type(
      screen.getByRole('combobox', { name: /buscar estudiante/i }),
      'nombre inexistente',
    );

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
