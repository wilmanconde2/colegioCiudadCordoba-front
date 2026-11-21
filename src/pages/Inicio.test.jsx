import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';
import { InicioContent } from './Inicio';
import { CARD_IMGS } from '../constants/inicio';

vi.mock('../components/Matricula2027Modal', () => ({ default: () => null }));
vi.mock('../constants/inicio', async importOriginal => ({
  ...await importOriginal(),
  REPORTE_OPCIONES: [{ label: 'Sample report', value: 'https://example.org/report' }],
  RECUPERACION_OPCIONES: [{ label: 'Sample grade', value: 'https://example.org/grade' }],
}));

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

function homepage(flags = {}) {
  return <MemoryRouter><InicioContent {...flags} /></MemoryRouter>;
}

it('wires configured report, recovery and schedule controls independently of live flags', async () => {
  vi.stubEnv('BASE_URL', '/school/');
  const user = userEvent.setup();
  const { rerender } = render(homepage());
  expect(screen.queryByRole('combobox')).toBeNull();
  expect(screen.queryByRole('button', { name: 'Selecciona tu grado' })).toBeNull();
  expect(screen.queryByRole('link', { name: 'Descargar' })).toBeNull();

  rerender(homepage({ mostrarReporte: true }));
  expect(screen.getAllByRole('img').some(image => image.getAttribute('src') === CARD_IMGS.reporte.src)).toBe(true);
  await user.selectOptions(screen.getByRole('combobox'), 'Sample report');
  expect(screen.getByRole('link', { name: /abrir reporte/i }).href).toBe('https://example.org/report');
  rerender(homepage({ mostrarActividades: true }));
  await user.click(screen.getByRole('button', { name: 'Selecciona tu grado' }));
  expect(screen.getByRole('link', { name: /sample grade/i }).href).toBe('https://example.org/grade');
  rerender(homepage({ mostrarHorarios: true }));
  const schedule = screen.getByRole('link', { name: 'Descargar' });
  expect(schedule.getAttribute('href')).toBe('/school/horariosRecuperancion.pdf');
  expect(schedule.download).toBe('horariosRecuperancion.pdf');
});

it('starts the special circular download when its own control is activated', async () => {
  const starts = [];
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
    starts.push([this.getAttribute('href'), this.download]);
  });
  render(homepage({ mostrarCircularEspecial: true }));
  await userEvent.setup().click(screen.getByRole('button', { name: 'Descargar' }));
  expect(starts).toEqual([['/circular.pdf', 'circular.pdf']]);
});
