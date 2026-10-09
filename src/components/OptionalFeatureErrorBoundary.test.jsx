import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import OptionalFeatureErrorBoundary from './OptionalFeatureErrorBoundary';

function BrokenOptionalFeature() {
  throw new Error('Detalle interno de la funcionalidad opcional');
}

describe('OptionalFeatureErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('aísla un error de render sin activar el fallback global ni exponer detalles', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <h1>Contenido principal disponible</h1>
        <OptionalFeatureErrorBoundary>
          <BrokenOptionalFeature />
        </OptionalFeatureErrorBoundary>
        <footer>Pie de página disponible</footer>
      </ErrorBoundary>,
    );

    expect(screen.getByRole('heading', { name: /contenido principal disponible/i })).toBeTruthy();
    expect(screen.getByText(/pie de página disponible/i)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /no pudimos mostrar esta página/i })).toBeNull();
    expect(screen.queryByText(/detalle interno/i)).toBeNull();
  });
});
