import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Rutas from './Rutas';

describe('Rutas', () => {
  it('muestra un fallback accesible solo mientras carga una ruta lazy', async () => {
    render(
      <MemoryRouter initialEntries={['/contacto']}>
        <Rutas />
      </MemoryRouter>,
    );

    expect(screen.getByRole('status', { name: /cargando página/i })).toBeTruthy();
    expect(await screen.findByRole('heading', { name: /contáctanos/i })).toBeTruthy();
    expect(screen.queryByRole('status', { name: /cargando página/i })).toBeNull();
  });
});
