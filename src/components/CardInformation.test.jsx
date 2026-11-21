import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CardInformation } from './CardInformation';

describe('CardInformation', () => {
  it('renders download links with the requested filename without opening a new tab', () => {
    render(
      <CardInformation
        className='horarios'
        link='/school/horariosRecuperancion.pdf'
        linkText='Descargar'
        downloadName='horariosRecuperancion.pdf'
      />,
    );

    const downloadLink = screen.getByRole('link', { name: 'Descargar' });

    expect(downloadLink.getAttribute('href')).toBe('/school/horariosRecuperancion.pdf');
    expect(downloadLink.getAttribute('download')).toBe('horariosRecuperancion.pdf');
    expect(downloadLink.hasAttribute('target')).toBe(false);
  });

  it('preserves the existing new-tab behavior for regular links', () => {
    render(
      <CardInformation
        link='https://example.com/resource'
        linkText='Abrir recurso'
      />,
    );

    const regularLink = screen.getByRole('link', { name: 'Abrir recurso' });

    expect(regularLink.getAttribute('href')).toBe('https://example.com/resource');
    expect(regularLink.getAttribute('target')).toBe('_blank');
    expect(regularLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(regularLink.hasAttribute('download')).toBe(false);
  });

  it('preserves the button behavior used by cards with an onClick handler', () => {
    const onClick = vi.fn();
    render(
      <CardInformation
        linkText='Descargar'
        onClick={onClick}
      />,
    );

    screen.getByRole('button', { name: 'Descargar' }).click();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('link', { name: 'Descargar' })).toBeNull();
  });
});
