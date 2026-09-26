import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Tesoreria from './Tesoreria';

vi.mock('../components/Formulario', () => ({
  default: ({ typeSearch }) => <div data-testid='formulario-mode'>{typeSearch}</div>,
}));

describe('Tesoreria', () => {
  it('renderiza el contenido, el pago PSE y el formulario de mensualidad', () => {
    render(<Tesoreria />);

    expect(screen.getByRole('heading', { name: /costos educativos y medios de pago/i })).toBeTruthy();
    expect(screen.getByText(/tesorería de la institución/i)).toBeTruthy();
    expect(screen.getByRole('link', { name: /pagar con pse/i }).getAttribute('href')).toContain('idConv=00024146');
    expect(screen.getByText(/número de 5 dígitos/i)).toBeTruthy();
    expect(screen.getByTestId('formulario-mode').textContent).toBe('mensualidad');
    expect(screen.queryByText(/información pendiente por configurar/i)).toBeNull();
  });
});
