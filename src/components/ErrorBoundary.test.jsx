import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

function BrokenComponent() {
  throw new Error('Detalle interno que no debe mostrarse');
}

describe('ErrorBoundary', () => {
  it('muestra una recuperación segura ante un error de renderizado', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('heading', { name: /no pudimos mostrar esta página/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /recargar página/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /volver al inicio/i }).getAttribute('href')).toBe('/');
    expect(screen.queryByText(/detalle interno/i)).toBeNull();
  });
});
