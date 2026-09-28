import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ModalInfoCurso from './ModalInfoCurso';

const alumno = {
  nombreCompleto: 'Estudiante de prueba',
  profesor: 'Docente de prueba',
};

function ModalHarness() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>Ver información del curso</button>
      <ModalInfoCurso open={open} onClose={() => setOpen(false)} alumno={alumno} curso='6-1' />
    </>
  );
}

describe('ModalInfoCurso', () => {
  it('mueve el foco al modal y lo devuelve al control que lo abrió', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    const trigger = screen.getByRole('button', { name: /ver información del curso/i });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: /estudiante de prueba/i });
    expect(dialog).toBeTruthy();
    const closeButton = screen.getByRole('button', { name: /cerrar información del curso/i });
    expect(document.activeElement).toBe(closeButton);

    await user.click(closeButton);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('cierra con Escape y restaura el foco', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    const trigger = screen.getByRole('button', { name: /ver información del curso/i });
    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
