import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { NativeLinkDisclosure } from './NativeLinkDisclosure';
import { RECUPERACION_OPCIONES } from '../constants/inicio';

it('opens recovery links by keyboard and restores focus on Escape', async () => {
  const user = userEvent.setup();
  render(<NativeLinkDisclosure label="Grado" options={RECUPERACION_OPCIONES} />);
  const trigger = screen.getByRole('button', { name: 'Grado' });
  await user.tab();
  await user.keyboard('{Enter}');
  const links = screen.getAllByRole('link');
  expect(links.map(link => link.getAttribute('href'))).toEqual(RECUPERACION_OPCIONES.map(option => option.value));
  await user.tab();
  expect(document.activeElement).toBe(links[0]);
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('link')).toBeNull();
  expect(document.activeElement).toBe(trigger);
});
