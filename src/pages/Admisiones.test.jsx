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

const CONTACT_NOTE_TEXT =
  'NOTA: Si tienes dudas, contáctanos al 3104280125 o escríbenos por WhatsApp.';

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
    const observation = screen.getByText('Admitida para el año lectivo.');
    const phoneLink = screen.getByRole('link', { name: '3104280125' });
    const whatsappLink = screen.getByRole('link', { name: 'WhatsApp' });
    const contactNote = phoneLink.closest('p');

    expect(observation.closest('dl').nextElementSibling).toBe(contactNote);
    expect(contactNote.textContent).toBe(CONTACT_NOTE_TEXT);
    expect(phoneLink.getAttribute('href')).toBe('tel:+573104280125');
    expect(whatsappLink.getAttribute('href')).toBe('https://wa.me/573104280125');
    expect(whatsappLink.getAttribute('target')).toBe('_blank');
    expect(whatsappLink.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('permite limpiar y presenta el fallback para una observación vacía', async () => {
    const user = userEvent.setup();
    render(<Admisiones />);
    const search = screen.getByRole('combobox', { name: /buscar estudiante/i });

    await user.type(search, 'sofia ruiz');
    await user.click(await screen.findByRole('option', { name: /ana sofía pérez ruiz.*grado 7/i }));
    const fallbackObservation = screen.getByText('Sin observación registrada.');
    const contactNote = screen.getByRole('link', { name: '3104280125' }).closest('p');

    expect(fallbackObservation.closest('dl').nextElementSibling).toBe(contactNote);
    expect(contactNote.textContent).toBe(CONTACT_NOTE_TEXT);

    await user.click(screen.getByRole('button', { name: /limpiar búsqueda/i }));
    expect(search.value).toBe('');
    expect(screen.queryByRole('heading', { name: /resultado de la consulta/i })).toBeNull();
    expect(screen.queryByText('NOTA:')).toBeNull();
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
