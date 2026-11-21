import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import Matricula2027Modal from './Matricula2027Modal';

function renderWithRoot(onClose = vi.fn()) {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
  function Harness() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type='button' onClick={() => setOpen(true)}>Abrir</button>
        {open && <Matricula2027Modal onClose={() => { onClose(); setOpen(false); }} />}
      </>
    );
  }
  const view = render(<Harness />, { container: root });
  return { ...view, root, trigger: root.querySelector('button'), onClose };
}

describe('Matricula2027Modal', () => {
  it('muestra un diálogo accesible con la imagen pública y bloquea el fondo', async () => {
    const user = userEvent.setup();
    const { root } = renderWithRoot();
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    const dialog = screen.getByRole('dialog', { name: 'Matrículas 2027' });
    const image = dialog.querySelector('img');

    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-describedby')).toBeTruthy();
    expect(image.getAttribute('src')).toBe('/matricula2027-v2.png');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /cerrar información de matrículas/i }));
    expect(root.inert).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('button', { name: /cerrar información de matrículas/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(root.inert).toBeUndefined();
    expect(document.body.style.overflow).toBe('');
    expect(document.activeElement).toBe(root.querySelector('button'));
  });

  it('cierra con Escape y devuelve el foco al elemento previo', async () => {
    const user = userEvent.setup();
    const { trigger, onClose } = renderWithRoot();
    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger).toBe(document.activeElement);
  });

  it('mantiene el foco dentro del diálogo al recorrerlo con Tab', async () => {
    const user = userEvent.setup();
    renderWithRoot();
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    const close = screen.getByRole('button', { name: /cerrar información de matrículas/i });

    await user.tab();
    expect(close).toBe(document.activeElement);
    await user.tab({ shift: true });
    expect(close).toBe(document.activeElement);
  });
});
