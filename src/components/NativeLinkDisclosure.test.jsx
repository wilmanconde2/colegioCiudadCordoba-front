import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { NativeLinkDisclosure } from './NativeLinkDisclosure';
const options = [
  { label: 'Alpha', value: 'https://example.org/a' },
  { label: 'Beta', value: 'https://example.org/b' },
];

it('opens recovery links by keyboard and restores focus on Escape', async () => {
  const user = userEvent.setup();
  render(<NativeLinkDisclosure label="Grado" options={options} />);
  const trigger = screen.getByRole('button', { name: 'Grado' });
  await user.tab();
  await user.keyboard('{Enter}');
  const links = screen.getAllByRole('link');
  expect(links.map(link => link.getAttribute('href'))).toEqual(options.map(option => option.value));
  await user.tab();
  expect(document.activeElement).toBe(links[0]);
  for (const link of links) {
    expect(link.getAttribute('rel')?.split(' ')).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
    expect(link.target).toBe('_blank');
    expect(link.getAttribute('tabindex')).toBe('0'); // WebKit restricted Tab traversal
  }
  await user.tab();
  expect(document.activeElement).toBe(links[1]);
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('link')).toBeNull();
  expect(document.activeElement).toBe(trigger);
});

it('toggles with Space and closes on outside pointer interaction', async () => {
  const user = userEvent.setup();
  render(<NativeLinkDisclosure label='Resources' options={options} />);
  const trigger = screen.getByRole('button');
  await user.tab();
  await user.keyboard(' ');
  expect(trigger.getAttribute('aria-expanded')).toBe('true');
  await user.keyboard(' ');
  expect(trigger.getAttribute('aria-expanded')).toBe('false');
  await user.click(trigger);
  await user.click(document.body);
  expect(screen.queryByRole('link')).toBeNull();
});
