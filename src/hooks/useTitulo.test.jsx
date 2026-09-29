import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import useTitulo from './useTitulo';

const MetadataProbe = ({ description, title }) => {
  useTitulo(title, description);
  return null;
};

describe('useTitulo', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('actualiza título, descripción, canonical y metadata social de la ruta', async () => {
    window.history.replaceState({}, '', '/contacto');

    render(<MetadataProbe title='Contáctanos' description='Información de contacto.' />);

    await waitFor(() => {
      expect(document.title).toBe('CCC - Contáctanos');
      expect(document.head.querySelector('meta[name="description"]')?.content)
        .toBe('Información de contacto.');
      expect(document.head.querySelector('meta[property="og:title"]')?.content)
        .toBe('CCC - Contáctanos');
      expect(document.head.querySelector('meta[name="twitter:description"]')?.content)
        .toBe('Información de contacto.');
      expect(document.head.querySelector('link[rel="canonical"]')?.href)
        .toBe('https://colegiociudadcordoba.edu.co/contacto');
    });
  });
});
