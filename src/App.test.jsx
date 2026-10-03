import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./components/Header', () => ({
  default: () => <header>Encabezado institucional</header>,
}));
vi.mock('./components/Footer', () => ({
  default: () => <footer>Pie institucional</footer>,
}));
vi.mock('./components/BotonWhatsapp', () => ({
  default: () => <button type='button'>WhatsApp</button>,
}));
vi.mock('./components/ScrollToTop', () => ({ default: () => null }));
vi.mock('./routes/Rutas', () => ({
  default: () => <section>Contenido de la ruta actual</section>,
}));
vi.mock('./components/Chatbot', () => {
  throw new Error('No se pudo cargar el chunk del chatbot');
});

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    window.requestIdleCallback = (callback) => {
      callback();
      return 1;
    };
    window.cancelIdleCallback = vi.fn();
  });

  it('aísla un fallo del chatbot y mantiene disponible el resto de la aplicación', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /cerrar aviso de receso estudiantil/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });

    expect(screen.getByText('Encabezado institucional')).toBeTruthy();
    expect(screen.getByText('Contenido de la ruta actual')).toBeTruthy();
    expect(screen.getByText('Pie institucional')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'WhatsApp' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /no pudimos mostrar esta página/i })).toBeNull();
  });
});
