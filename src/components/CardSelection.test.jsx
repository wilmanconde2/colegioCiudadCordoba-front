import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { CardSelection } from './CardSelection';

const option = { label: 'Sample group', value: 'https://example.org/group' };

it('reports the selected destination and opens the supplied link securely', async () => {
  const onChange = vi.fn(event => event.target.value);
  const props = { opciones: [option], onChange, selectLabel: 'Group', linkText: 'Open' };
  const { rerender } = render(<CardSelection {...props} />);
  const select = screen.getByRole('combobox', { name: 'Group' });
  expect(screen.queryByRole('link')).toBeNull();
  await userEvent.setup().selectOptions(select, option.label);
  expect(onChange.mock.results.map(result => result.value)).toEqual([option.value]);
  rerender(<CardSelection {...props} linkHref={option.value} />);
  const link = screen.getByRole('link', { name: 'Open' });
  expect(link.href).toBe(option.value);
  expect(link.target).toBe('_blank');
  expect(link.relList.contains('noopener')).toBe(true);
  expect(link.relList.contains('noreferrer')).toBe(true);
});

it('updates optional headings and choices when the configuration changes', () => {
  const { rerender } = render(<CardSelection titulo='Fixture' opciones={[option]} />);
  expect(screen.getByRole('heading', { name: 'Fixture' })).toBeTruthy();
  expect(screen.getByRole('option', { name: option.label })).toBeTruthy();
  rerender(<CardSelection opciones={[]} />);
  expect(screen.queryByRole('heading')).toBeNull();
  expect(screen.queryByRole('option', { name: option.label })).toBeNull();
  expect(screen.getByRole('combobox').value).toBe('');
});
