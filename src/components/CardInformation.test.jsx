import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CardInformation } from './CardInformation';

describe('CardInformation', () => {
  it('renders download links with the requested filename without opening a new tab', () => {
    render(
      <CardInformation
        link='/school/guide.pdf'
        linkText='Descargar'
        downloadName='guide.pdf'
      />,
    );

    const downloadLink = screen.getByRole('link', { name: 'Descargar' });

    expect(downloadLink.getAttribute('href')).toBe('/school/guide.pdf');
    expect(downloadLink.getAttribute('download')).toBe('guide.pdf');
    expect(downloadLink.hasAttribute('target')).toBe(false);
  });

  it('preserves the existing new-tab behavior for regular links', async () => {
    render(
      <CardInformation
        link='https://example.com/resource'
        linkText='Abrir recurso'
      />,
    );

    const regularLink = screen.getByRole('link', { name: 'Abrir recurso' });

    await userEvent.setup().tab();
    expect(document.activeElement).toBe(regularLink);
    expect(regularLink.getAttribute('href')).toBe('https://example.com/resource');
    expect(regularLink.getAttribute('target')).toBe('_blank');
    expect(regularLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(regularLink.hasAttribute('download')).toBe(false);
  });

  it('preserves the button behavior used by cards with an onClick handler', async () => {
    const onClick = vi.fn();
    render(
      <CardInformation
        linkText='Descargar'
        onClick={onClick}
      />,
    );

    const user = userEvent.setup();
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Descargar' }));
    await user.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('link', { name: 'Descargar' })).toBeNull();
  });
  it('renders optional content only when supplied', () => {
    const { rerender } = render(<CardInformation titulo='Fixture' imagen='/sample.png' imgAlt='Poster' texto='Details' />);
    expect(screen.getByRole('heading', { name: 'Fixture' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Poster' })).toBeTruthy();
    expect(screen.getByText('Details')).toBeTruthy();
    rerender(<CardInformation />);
    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.queryByText('Details')).toBeNull();
  });
});
