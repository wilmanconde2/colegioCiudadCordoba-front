import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RecesoEstudiantilModal from './RecesoEstudiantilModal';

function ModalHarness() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>Mostrar aviso</button>
      <RecesoEstudiantilModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

describe('RecesoEstudiantilModal', () => {
  it('muestra el comunicado con atributos accesibles', () => {
    render(<RecesoEstudiantilModal open onClose={() => {}} />);

    expect(
      screen.getByRole('dialog', { name: /receso estudiantil del 5 al 9 de octubre de 2026/i }),
    ).toBeTruthy();
    expect(
      screen
        .getByRole('img', { name: /comunicado institucional: receso estudiantil/i })
        .getAttribute('src'),
    ).toBe('/receso-estudiantil-octubre-2026.png');
    expect(screen.getByRole('button', { name: /cerrar aviso de receso estudiantil/i }))
      .toBe(document.activeElement);
  });

  it('no renderiza el diálogo cuando está cerrado', () => {
    render(<RecesoEstudiantilModal open={false} onClose={() => {}} />);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('cierra con el botón y restaura el foco', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    const trigger = screen.getByRole('button', { name: /mostrar aviso/i });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: /cerrar aviso/i }));

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('cierra con Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<RecesoEstudiantilModal open onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('bloquea y restaura el scroll del documento', () => {
    document.body.style.overflow = 'auto';
    const { rerender } = render(<RecesoEstudiantilModal open onClose={() => {}} />);

    expect(document.body.style.overflow).toBe('hidden');

    rerender(<RecesoEstudiantilModal open={false} onClose={() => {}} />);

    expect(document.body.style.overflow).toBe('auto');
  });

  it('mantiene el foco dentro del diálogo', async () => {
    const user = userEvent.setup();
    render(<RecesoEstudiantilModal open onClose={() => {}} />);

    const closeButton = screen.getByRole('button', { name: /cerrar aviso/i });
    await user.tab();
    expect(document.activeElement).toBe(closeButton);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(closeButton);
  });

  it('no cierra al hacer clic fuera del panel', () => {
    const onClose = vi.fn();
    render(<RecesoEstudiantilModal open onClose={onClose} />);

    fireEvent.click(screen.getByRole('dialog'));

    expect(onClose).not.toHaveBeenCalled();
  });
});
