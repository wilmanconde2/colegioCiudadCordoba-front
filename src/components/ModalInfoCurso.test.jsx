import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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
  it('no renderiza el diálogo cuando está cerrado', () => {
    render(<ModalInfoCurso open={false} onClose={() => {}} alumno={alumno} curso='6-1' />);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

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

  it('conserva el contenido general y sus enlaces principales', () => {
    render(<ModalInfoCurso open onClose={() => {}} alumno={alumno} curso='6-1' />);

    expect(screen.getByRole('img', { name: /información general/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /confirmar asistencia aquí/i }).getAttribute('href'))
      .toBe('https://forms.gle/c5ZpYPmrNSTnczn49');
    expect(screen.getByRole('link', { name: /abrir en tamaño completo/i })).toBeTruthy();
  });

  it('muestra el selector y el contenido de horario sin alterar su orden', async () => {
    const user = userEvent.setup();
    render(<ModalInfoCurso open onClose={() => {}} alumno={alumno} curso='6-1' />);

    await user.click(screen.getByRole('button', { name: /ver horarios de atención/i }));
    expect(screen.getByText(/selecciona una opción: primaria o bachillerato/i)).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Horario Primaria' }));

    expect(screen.getByRole('img', { name: 'Horario Primaria' })).toBeTruthy();
  });

  it('muestra el video configurado para el curso', async () => {
    const user = userEvent.setup();
    render(
      <ModalInfoCurso
        open
        onClose={() => {}}
        alumno={alumno}
        curso='01- 1 MAÑANA'
      />,
    );

    await user.click(screen.getByRole('button', { name: /ver video informativo/i }));

    expect(screen.getByTitle(/video informativo del curso/i).getAttribute('src'))
      .toContain('drive.google.com/file/d/');
  });

  it('cierra al activar el backdrop', () => {
    const onClose = vi.fn();
    const { container } = render(
      <ModalInfoCurso open onClose={onClose} alumno={alumno} curso='6-1' />,
    );

    fireEvent.click(container.querySelector('.ModalCursos__backdrop'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('mantiene el foco dentro del modal al recorrerlo con Tab', async () => {
    const user = userEvent.setup();
    render(<ModalInfoCurso open onClose={() => {}} alumno={alumno} curso='6-1' />);

    const closeButton = screen.getByRole('button', { name: /cerrar información del curso/i });
    const lastLink = screen.getByRole('link', { name: /abrir en tamaño completo/i });

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(lastLink);
    await user.tab();
    expect(document.activeElement).toBe(closeButton);
  });
});
