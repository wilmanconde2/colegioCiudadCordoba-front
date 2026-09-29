import { describe, expect, it } from 'vitest';
import { getModalContent, normalizeVideoUrl } from './modalInfoCursoUtils';

describe('modalInfoCursoUtils', () => {
  it('normaliza las variantes existentes de enlaces de Google Drive', () => {
    expect(normalizeVideoUrl('https://drive.google.com/file/d/abc123/view'))
      .toBe('https://drive.google.com/file/d/abc123/preview');
    expect(normalizeVideoUrl('https://drive.google.com/uc?id=abc123'))
      .toBe('https://drive.google.com/file/d/abc123/preview');
    expect(normalizeVideoUrl('https://drive.google.com/open?id=abc123'))
      .toBe('https://drive.google.com/file/d/abc123/preview');
  });

  it('resuelve los estados declarativos de contenido sin cambiar sus mensajes', () => {
    expect(getModalContent({ tab: 'horarios', horarioSel: null, videoUrl: '' }))
      .toEqual({ type: 'pick-horario', title: 'Horarios' });
    expect(getModalContent({ tab: 'video', horarioSel: null, videoUrl: '' }))
      .toEqual({ type: 'empty', msg: 'No hay video configurado para este curso.' });
    expect(getModalContent({ tab: 'otro', horarioSel: null, videoUrl: '' }))
      .toEqual({ type: 'empty', msg: 'Contenido no disponible.' });
  });
});
